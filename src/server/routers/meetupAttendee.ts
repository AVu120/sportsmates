/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { z } from "zod";

import { prisma } from "../lib/prisma";
import { procedure, router } from "../trpc";

export const meetupAttendeeRouter = router({
  listAll: procedure.query(async () => {
    /**
     * For pagination docs you can have a look here
     * @see https://trpc.io/docs/useInfiniteQuery
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
     */

    const nets = await prisma.meetupAttendee.findMany();

    return nets;
  }),
  add: procedure
    .input(
      z.object({
        playerId: z.string().cuid2(),
        meetupId: z.string().cuid2(),
      })
    )
    .mutation(async ({ input }) => {
      const meetupAttendee = await prisma.meetupAttendee.create({
        data: input,
      });
      return meetupAttendee;
    }),
  delete: procedure
    .input(
      z.object({
        id: z.string().cuid2(),
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      await prisma.meetupAttendee.delete({
        where: {
          id,
        },
      });
      return `meetup attendee ${id} deleted`;
    }),
});
