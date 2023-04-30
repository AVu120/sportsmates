import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

import { supabase } from "@/src/services/authentication";
// The app's context - is generated for each incoming request
export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers

  const accessToken = opts?.req.cookies["my-access-token"];
  const refreshToken = opts?.req.cookies["my-refresh-token"];

  if (accessToken && refreshToken) {
    const {
      data: { user },
      error,
    } = await supabase?.auth.setSession({
      //@ts-ignore
      refresh_token: refreshToken,
      //@ts-ignore
      access_token: accessToken,
    });

    return { user, error };
  }
  return { user: null, error: null };
}
type Context = trpc.inferAsyncReturnType<typeof createContext>;

export function createRouter() {
  return trpc.router<Context>();
}
