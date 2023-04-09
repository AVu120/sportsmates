import { z } from "zod";

import { procedure, router } from "../trpc";

import { meetupRouter } from "./meetup";
import { meetupAttendeeRouter } from "./meetupAttendee";
import { netRouter } from "./net";
import { playerRouter } from "./player";

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
  meetup: meetupRouter,
  meetupAttendee: meetupAttendeeRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
