import * as trpcNext from "@trpc/server/adapters/next";

import { createContext } from "@/server/context";
import { appRouter } from "@/server/routers/_app";
// export API handler
// @see https://trpc.io/docs/api-handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb", // Set desired value here
    },
  },
};
