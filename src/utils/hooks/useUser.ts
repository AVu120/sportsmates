import { useEffect, useState } from "react";

import { supabase } from "@/src/services/authentication";

const useUser = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<any>(null);

  const updateAuthState = async () => {
    const response = await supabase.auth.getSession();
    const {
      data: { session },
      error,
    } = response;

    if (error) {
      setLoading(false);
      return alert("Error fetching auth session: " + error.message);
    }
    if (session?.user?.id) {
      setUser(session.user);
      setToken(session.access_token);
    }
    setLoading(false);
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("RUN");
      if (session?.user?.id) {
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
  };
};
export default useUser;
