/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, procedure } from "../trpc";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export const meetupRouter = router({
  listAll: procedure.query(async () => {
    /**
     * For pagination docs you can have a look here
     * @see https://trpc.io/docs/useInfiniteQuery
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
     */

    const meetups = await prisma.meetup.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return meetups;
  }),
  listByDateRange: procedure
    .input(
      z.object({
        startDatetime: z.coerce.date(),
        endDatetime: z.coerce.date(),
      })
    )
    .query(async ({ input }) => {
      const { startDatetime, endDatetime } = input;
      const nets = await prisma.meetup.findMany({
        where: {
          startDatetime: {
            gte: startDatetime.toISOString(),
          },
          endDatetime: {
            lte: endDatetime.toISOString(),
          },
        },
      });

      return nets;
    }),
  add: procedure
    .input(
      z.object({
        hostId: z.string().cuid2(),
        netId: z.string().cuid2(),
        startDatetime: z.coerce.date(),
        endDatetime: z.coerce.date(),
        name: z.string(),
        description: z.string().optional(),
        maxNumberOfAttendees: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const meetup = await prisma.meetup.create({ data: input });
      return meetup;
    }),
  delete: procedure
    .input(
      z.object({
        id: z.string().cuid2(),
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      await prisma.meetup.delete({
        where: {
          id,
        },
      });
      return `meetup ${id} deleted`;
    }),
});
