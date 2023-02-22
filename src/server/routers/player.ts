/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, procedure } from "../trpc";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
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
  // byId: procedure
  //   .input(
  //     z.object({
  //       id: z.string(),
  //     })
  //   )
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
        id: z.string().uuid(),
        supabaseId: z.string().uuid(),
        createdAt: z.coerce.date(),
      })
    )
    .mutation(async ({ input }) => {
      const post = await prisma.player.create({
        data: input,
      });
      return post;
    }),
});
