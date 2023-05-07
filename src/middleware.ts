import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { supabase } from "@/services/authentication";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("my-refresh-token")?.value;
  const accessToken = request.cookies.get("my-access-token")?.value;

  if (refreshToken && accessToken) {
    const {
      data: { user },
      error,
    } = await supabase?.auth.setSession({
      //@ts-ignore
      refresh_token: refreshToken,
      //@ts-ignore
      access_token: accessToken,
    });

    if (error) {
      console.log({ error });
      return NextResponse.next();
    }

    if (user) return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/signup"],
};
