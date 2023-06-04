import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

import { supabase } from "@/services/authentication";

/** Fetches the current logged in user's auth session data.
 */
const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  const updateAuthState = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      setLoading(false);
      return alert(
        "Error fetching auth session: " +
          error.message +
          ". Please log in again to continue using the app."
      );
    }
    if (session?.user?.id) {
      setUser(session.user);
      setToken(session.access_token);
    }
    setLoading(false);

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || event === "USER_DELETED") {
        // delete cookies on sign out
        const expires = new Date(0).toUTCString();
        document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
        document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
        setUser(null);
        setToken(null);
        window.localStorage.removeItem("userFirstName");
      } else if (
        (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") &&
        session?.access_token
      ) {
        const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
        document.cookie = `my-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
        document.cookie = `my-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
        setUser(session.user);
        setToken(session.access_token);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    updateAuthState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  return {
    user,
    isLoading,
    token,
    isLoggedIn: !!user,
  };
};
export default useUser;
