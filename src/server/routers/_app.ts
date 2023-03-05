import { z } from "zod";
import { playerRouter } from "./player";
import { netRouter } from "./net";
import { sessionRouter } from "./session";
import { sessionAttendeeRouter } from "./sessionAttendee";

import { procedure, router } from "../trpc";

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      };
    }),
  player: playerRouter,
  net: netRouter,
  session: sessionRouter,
  sessionAttendee: sessionAttendeeRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
