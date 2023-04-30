/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { z } from "zod";

import { prisma } from "../lib/prisma";
import { procedure, router } from "../trpc";

export const playerRouter = router({
  getLatestPlayer: procedure.query(async () => {
    const latestPlayer = await prisma.player.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });
    return latestPlayer || "No players yet";
  }),
  list: procedure.query(async () => {
    /**
     * For pagination docs you can have a look here
     * @see https://trpc.io/docs/useInfiniteQuery
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
     */

    const players = await prisma.player.findMany({
      orderBy: {
        createdAt: "asc",
      },
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
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        skillLevel: z.string().optional(),
        birthday: z.coerce.date().optional(),
        lastActiveAt: z.coerce.date().optional(),
        city: z.string().optional(),
        description: z.string().optional(),
        longitude: z.number().min(-180).max(180),
        latitude: z.number().min(-180).max(180),
      })
    )
    .mutation(async ({ input }) => {
      const {
        supabaseId,
        firstName,
        lastName,
        skillLevel,
        birthday,
        lastActiveAt,
        city,
        description,
        longitude,
        latitude,
      } = input;
      await prisma.$queryRaw`
      UPDATE "Player"
      SET "firstName" = ${firstName}, 
          "lastName" = ${lastName}, 
          "skillLevel" = ${skillLevel}, 
          birthday = ${birthday},
          "lastActiveAt" = ${lastActiveAt},
          city = ${city},
          description = ${description},
          coordinates = ST_Point(${longitude}, ${latitude})
      WHERE "supabaseId" = ${supabaseId};`;
      return input;
    }),
});
