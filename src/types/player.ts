import { Prisma } from "@prisma/client";

export type player = Prisma.PlayerGetPayload<{}> & { birthday: string | null };
