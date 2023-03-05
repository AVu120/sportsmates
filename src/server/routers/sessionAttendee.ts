/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, procedure } from "../trpc";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export const sessionAttendeeRouter = router({
  list: procedure.query(async () => {
    /**
     * For pagination docs you can have a look here
     * @see https://trpc.io/docs/useInfiniteQuery
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
     */

    const nets = await prisma.sessionAttendee.findMany();

    return nets;
  }),
  add: procedure
    .input(
      z.object({
        playerId: z.string().cuid2(),
        sessionId: z.string().cuid2(),
      })
    )
    .mutation(async ({ input }) => {
      const session = await prisma.sessionAttendee.create({ data: input });
      return session;
    }),
  delete: procedure
    .input(
      z.object({
        id: z.string().cuid2(),
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      await prisma.sessionAttendee.delete({
        where: {
          id,
        },
      });
      return `session attendee ${id} deleted`;
    }),
});
