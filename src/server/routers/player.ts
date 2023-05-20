/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { Prisma } from "@prisma/client";
import { z } from "zod";

import {
  ANY_DISTANCE_FROM_YOU,
  ANY_GENDER,
  CLOSEST_TO_ME,
  genderOptions,
  MOST_RECENTLY_ACTIVE,
  OLDEST_TO_YOUNGEST,
  searchRadiusOptions,
  sortByOptions,
  YOUNGEST_TO_OLDEST,
} from "@/utils/constants/player";

import { prisma } from "../lib/prisma";
import { procedure, router } from "../trpc";

export const playerRouter = router({
  get: procedure
    .input(
      z.object({
        supabaseId: z.string().uuid(),
      })
    )
    .query(async ({ input }) => {
      const { supabaseId } = input;
      const latestPlayer = await prisma.player.findFirst({
        where: {
          supabaseId,
        },
      });
      return latestPlayer;
    }),
  getLatest: procedure.query(async ({}) => {
    const latestPlayer = await prisma.player.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });
    return latestPlayer || "No players yet";
  }),
  list: procedure
    .input(
      z.object({
        longitude: z.number().min(-180).max(180).optional(),
        latitude: z.number().min(-180).max(180).optional(),
        // Search range in meters.
        searchRadius: z
          .string()
          .refine(
            (data) =>
              searchRadiusOptions.map(({ value }) => value).includes(data),
            "Not a valid value"
          ),
        gender: z
          .string()
          .refine(
            (data) => genderOptions.map(({ value }) => value).includes(data),
            "Not a valid value"
          ),
        sortBy: z
          .string()
          .refine(
            (data) => sortByOptions.map(({ value }) => value).includes(data),
            "Not a valid value"
          ),
      })
    )
    .query(async ({ input }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */

      const { longitude, latitude, searchRadius, gender, sortBy } = input;

      const sortByClauseOptions: { [index: string]: string } = {
        [MOST_RECENTLY_ACTIVE]: `ORDER BY "lastSignIn" DESC`,
        [OLDEST_TO_YOUNGEST]: "ORDER BY birthday ASC",
        [YOUNGEST_TO_OLDEST]: "ORDER BY birthday DESC",
        [CLOSEST_TO_ME]: `ORDER BY coordinates <-> ST_Point(${longitude}, ${latitude}) ASC`,
      };

      let whereClause = "";
      // If search radius is not set.
      if (searchRadius === ANY_DISTANCE_FROM_YOU) {
        // If gender is set.
        if (gender !== ANY_GENDER) {
          whereClause += `WHERE gender = '${gender}' AND "isApproved" = true`;
        } else whereClause += `WHERE "isApproved" = true`;
      } else {
        whereClause += `WHERE ST_DWithin(coordinates, ST_Point(${longitude}, ${latitude}), ${searchRadius}000)`;

        if (gender !== ANY_GENDER) {
          whereClause += ` AND gender = '${gender}' AND "isApproved" = true`;
        } else whereClause += ` AND "isApproved" = true`;
      }

      let players = await prisma.$queryRaw`
      SELECT "supabaseId" as id, "firstName", "lastName", "skillLevel", birthday, "lastSignIn", city, description, gender
      FROM "Player"
      ${Prisma.raw(whereClause)}
      ${Prisma.raw(sortByClauseOptions[sortBy])}
      LIMIT 10;`;

      // Birthday is redacted and only age is returned to prevent leakage of PII to the client.
      // @ts-ignore
      players = players.map((player) => {
        const age = Math.floor(
          // @ts-ignore
          (new Date().getTime() - new Date(player.birthday).getTime()) /
            3.15576e10
        );
        const { birthday, ...playerWithoutBirthday } = player;

        return { ...playerWithoutBirthday, age };
      });

      return players;
    }),
  add: procedure
    .input(
      z.object({
        supabaseId: z.string().uuid(),
        // Pass in Javascript Date object here containing user's local timezone info (aka new Date() in browser).
        email: z.string().email(),
        createdAt: z.coerce.date(),
      })
    )
    .mutation(async ({ input }) => {
      const player = await prisma.player.create({
        data: input,
      });
      return player;
    }),
  update: procedure
    .input(
      z.object({
        supabaseId: z.string().uuid(),
        firstName: z.string(),
        lastName: z.string(),
        skillLevel: z
          .string()
          .refine(
            (data) => ["Beginner", "Intermediate", "Advanced"].includes(data),
            "Not a valid value"
          ),
        birthday: z.coerce.date(),
        city: z.string(),
        description: z.string(),
        longitude: z.number().min(-180).max(180).optional(),
        latitude: z.number().min(-180).max(180).optional(),
        gender: z
          .string()
          .refine(
            (data) => ["Male", "Female"].includes(data),
            "Not a valid value"
          ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // @ts-ignore
      // if (ctx?.user?.id !== input.supabaseId) {
      //   throw new Error(
      //     "You are not authorized to update this player. You can only update your own profile"
      //   );
      // }

      const {
        supabaseId,
        firstName,
        lastName,
        skillLevel,
        birthday,
        city,
        description,
        longitude,
        latitude,
        gender,
      } = input;

      const isUpdatingCoordinates =
        typeof longitude === "number" && typeof latitude === "number";

      if (isUpdatingCoordinates)
        await prisma.$queryRaw`
          UPDATE "Player"
          SET "firstName" = ${firstName}, 
              "lastName" = ${lastName}, 
              "skillLevel" = ${skillLevel}, 
              birthday = ${birthday},
              city = ${city},
              description = ${description},
              coordinates = ST_Point(${longitude}, ${latitude}),
              gender = ${gender}
          WHERE "supabaseId" = ${supabaseId};`;
      else
        await prisma.$queryRaw`
          UPDATE "Player"
          SET "firstName" = ${firstName}, 
              "lastName" = ${lastName}, 
              "skillLevel" = ${skillLevel}, 
              birthday = ${birthday},
              city = ${city},
              description = ${description},
              gender = ${gender}
          WHERE "supabaseId" = ${supabaseId};`;
      return input;
    }),
  updateLastSignIn: procedure
    .input(
      z.object({
        email: z.string().email(),
        lastSignIn: z.coerce.date(),
      })
    )
    .mutation(async ({ input }) => {
      const { email, lastSignIn } = input;
      await prisma.$queryRaw`
      UPDATE "Player"
      SET "lastSignIn" = ${lastSignIn}
      WHERE "email" = ${email};`;
      return input;
    }),
});
