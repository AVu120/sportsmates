import { z } from "zod";

import { procedure, router } from "../trpc";

import { playerRouter } from "./player";

export const appRouter = router({
  player: playerRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
