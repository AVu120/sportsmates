/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, procedure } from "../trpc";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { createId as createCuid } from "@paralleldrive/cuid2";

export const netRouter = router({
  list: procedure.query(async () => {
    /**
     * For pagination docs you can have a look here
     * @see https://trpc.io/docs/useInfiniteQuery
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
     */

    const nets = await prisma.net.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return nets;
  }),
  add: procedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        longitude: z.number().min(-180).max(180),
        latitude: z.number().min(-180).max(180),
        address: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { name, description, longitude, latitude, address } = input;
      await prisma.$queryRaw`
      INSERT INTO "Net"(id, name, description, address, coordinates)
      VALUES (${createCuid()}, ${name}, ${description}, ${address}, ST_Point(${longitude}, ${latitude}));`;
      return `net: ${name} added`;
    }),
});
