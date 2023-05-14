/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { z } from "zod";

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
        gender: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { gender } = input;
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */

      const players = await prisma.player.findMany({
        orderBy: {
          lastSignIn: "desc",
        },
        where: {
          isApproved: true,
          ...(gender !== "Any gender" && { gender }),
        },
        take: 10,
      });

      return players;
    }),
  listByLocation: procedure
    .input(
      z.object({
        longitude: z.number().min(-180).max(180),
        latitude: z.number().min(-180).max(180),
        // Search range in meters.
        range: z.number().min(0),
      })
    )
    .query(async ({ input }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */

      const { longitude, latitude, range } = input;

      const players = await prisma.$queryRaw`
      SELECT id, "supabaseId", "firstName", "lastName", "skillLevel", birthday, "lastActiveAt", city, description
      FROM "Player"
      WHERE ST_DWithin(coordinates, ST_Point(${longitude}, ${latitude}), ${range})
      ORDER BY coordinates <-> ST_Point(${longitude}, ${latitude}) ASC;`;
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
