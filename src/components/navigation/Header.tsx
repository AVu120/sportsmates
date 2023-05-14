import { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import buttonStyles from "@/_styles/_buttons.module.scss";
import logoStyles from "@/_styles/_logos.module.scss";
import { DropDownMenu } from "@/components/menu/DropDownMenu";
import { supabase } from "@/services/authentication";
import { Page } from "@/types/pages";
import { player } from "@/types/player";

import { NavBar } from "./NavBar";

import styles from "./Header.module.scss";

interface ComponentProps {
  page?: Page;
  isLoggedIn?: boolean;
  user?: User | null;
  hasNotSetUpProfile?: boolean;
  redirectOnLogout?: boolean;
  player?: player;
}
/** Common Header that displays on the top of every page. */
export const Header = ({
  page,
  isLoggedIn,
  user,
  hasNotSetUpProfile,
  redirectOnLogout,
  player,
}: ComponentProps) => {
  const router = useRouter();
  return (
    <header className={styles.header}>
      {/* Only show dropdown menu in mobile screen width */}
      {/* <div className={`${styles.dropdown_menu} ${buttonStyles.link_button}`}>
        {!hasNotSetUpProfile && <DropDownMenu />}
      </div> */}
      {/* Only show this when screen width is more than mobile width */}
      <div className={styles.logo_button}>
        {!hasNotSetUpProfile && (
          <Link href="/">
            <div className={`${logoStyles.logo} ${buttonStyles.link_button}`}>
              <Image src="/logo.png" width={25} height={25} alt="" />{" "}
              <div>
                <p>Cricket </p>
                <p>Buddy</p>
              </div>
            </div>
          </Link>
        )}
      </div>
      {/* Only show this when screen width is more than mobile width */}
      <div className={`${styles.move_buttons_down} ${styles.navbar}`}>
        {!hasNotSetUpProfile && <NavBar page={page} />}
      </div>
      <div
        className={`${buttonStyles.button_group} ${styles.move_buttons_down}`}
      >
        {!isLoggedIn && page !== "login" && (
          <Link href="/login">
            <button className={buttonStyles.link_button}>Log in</button>
          </Link>
        )}
        {!isLoggedIn && page !== "signup" && (
          <Link href="/signup">
            <button className={buttonStyles.link_button}>Sign up</button>
          </Link>
        )}
        {isLoggedIn && (
          <>
            <span>Hello {player?.firstName || user?.email}!</span>
            <div style={{ position: "relative", top: "2px" }}>
              <DropDownMenu
                options={[
                  { label: "Edit profile", link: `/players/${user?.id}/edit` },
                  {
                    label: "Log out",
                    onClick: () => {
                      if (page === "home")
                        supabase.auth
                          .signOut()
                          .then(() => alert("Logged out successfully"));
                      // if (redirectOnLogout) {
                      else router.push("/").then(() => supabase.auth.signOut());
                      // }

                      //   if (redirectOnLogout) router.push("/").then( () =>  supabase.auth.signOut()
                      //   );
                      //   else supabase.auth.signOut();
                      // };
                    },
                  },
                ]}
              />
            </div>
          </>
        )}
      </div>
    </header>
  );
};
