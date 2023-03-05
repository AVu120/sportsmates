/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, procedure } from "../trpc";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export const sessionRouter = router({
  list: procedure.query(async () => {
    /**
     * For pagination docs you can have a look here
     * @see https://trpc.io/docs/useInfiniteQuery
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
     */

    const nets = await prisma.session.findMany({
      orderBy: {
        name: "asc",
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
      const session = await prisma.session.create({ data: input });
      return session;
    }),
});
