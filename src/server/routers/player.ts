/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, procedure } from "../trpc";
import { z } from "zod";
import { prisma } from "../lib/prisma";

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
  // byId: procedure
  // .input(
  //   z.object({
  //     id: z.string(),
  //   })
  // )
  //   .query(async ({ input }) => {
  //     const { id } = input;
  //     const post = await prisma.post.findUnique({
  //       where: { id },
  //       select: defaultPostSelect,
  //     });
  //     if (!post) {
  //       throw new TRPCError({
  //         code: "NOT_FOUND",
  //         message: `No post with id '${id}'`,
  //       });
  //     }
  //     return post;
  //   }),
  add: procedure
    .input(
      z.object({
        supabaseId: z.string().uuid(),
        // Pass in Javascript Date object here containing user's local timezone info.
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
        data: z.object({
          firstName: z.string().optional(),
          lastName: z.string().optional(),
          skillLevel: z.string().optional(),
          birthday: z.coerce.date().optional(),
          lastActiveAt: z.coerce.date().optional(),
          city: z.string().optional(),
          description: z.string().optional(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      const player = await prisma.player.update({
        where: { supabaseId: input.supabaseId },
        data: input.data,
      });
      return player;
    }),
  updateLocation: procedure
    .input(
      z.object({
        supabaseId: z.string().uuid(),
        data: z.object({
          longitude: z.number().min(-180).max(180),
          latitude: z.number().min(-180).max(180),
        }),
      })
    )
    .mutation(async ({ input }) => {
      const { longitude, latitude } = input.data;
      const { supabaseId } = input;

      await prisma.$queryRaw`
      UPDATE "Player"
      SET coordinates = st_point(${longitude}, ${latitude})
      WHERE "supabaseId" = '${supabaseId}';
      `;
      return `player location set to longitude: ${longitude}°, latitude: ${latitude}°`;
    }),
});
