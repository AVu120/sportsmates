import { useEffect } from "react";
import { User } from "@supabase/supabase-js";
import router from "next/router";

import { trpc } from "@/utils/trpc";

interface HookProps {
  user: User | null;
}

/** Fetches the current player's data and redirects to the edit profile page
 * if the player has not yet set their profile.
 */
const usePlayer = ({ user }: HookProps) => {
  const player = trpc.player.getPublicData.useQuery(
    {
      supabaseId: user?.id || "",
    },
    { enabled: !!user?.id }
  );

  // If user is logged in and has not set their profile, redirect them to the edit page.
  useEffect(() => {
    if (user && player.isFetched) {
      if (!player.data?.description) router.push(`/players/${user?.id}/edit`);
      else
        window.localStorage.setItem(
          "userFirstName",
          player.data.firstName || ""
        );
    }
  }, [player.isFetched, player.data, user]);

  return { player };
};

export default usePlayer;
