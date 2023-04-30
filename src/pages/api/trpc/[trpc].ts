import * as trpcNext from "@trpc/server/adapters/next";

import { createContext } from "@/src/server/context";
import { appRouter } from "@/src/server/routers/_app";
// export API handler
// @see https://trpc.io/docs/api-handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
