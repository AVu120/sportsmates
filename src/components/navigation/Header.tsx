import { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import buttonStyles from "@/_styles/_buttons.module.scss";
import logoStyles from "@/_styles/_logos.module.scss";
import { DropDownMenu } from "@/components/menu/DropDownMenu";
import { supabase } from "@/services/authentication";
import { Page } from "@/types/pages";

import { NavBar } from "./NavBar";

import styles from "./Header.module.scss";

interface ComponentProps {
  page?: Page;
  user?: User | null;
  firstName?: string;
}
/** Common Header that displays on the top of every page. */
export const Header = ({ page, user, firstName }: ComponentProps) => {
  const isRunningOnClient = typeof window !== "undefined";
  const displayedFirstName =
    firstName ||
    (isRunningOnClient ? window.localStorage.getItem("userFirstName") : "");
  const router = useRouter();

  const dropdownOptions = [
    { label: "Edit profile", link: `/players/${user?.id}/edit` },
    {
      label: "Log out",
      onClick: () => {
        window.localStorage.removeItem("userFirstName");

        if (page === "home")
          supabase.auth.signOut().then(() => {
            alert("Logged out successfully");
          });
        else router.push("/").then(() => supabase.auth.signOut());
      },
    },
  ];
  return (
    <header className={styles.header}>
      <div className={styles.logo_button}>
        <Link href="/">
          <div className={`${logoStyles.logo} ${buttonStyles.link_button}`}>
            <Image src="/logo.png" width={25} height={25} alt="" />{" "}
            <div>
              <p>Cricket </p>
              <p>Buddy</p>
            </div>
          </div>
        </Link>
      </div>
      <div className={`${styles.move_buttons_down} ${styles.navbar}`}>
        <NavBar page={page} />
      </div>
      <div
        className={`${buttonStyles.button_group} ${styles.move_buttons_down}`}
      >
        {!user && page !== "login" && (
          <Link href="/login">
            <button className={buttonStyles.link_button}>Log in</button>
          </Link>
        )}
        {!user && page !== "signup" && (
          <Link href="/signup">
            <button className={buttonStyles.link_button}>Sign up</button>
          </Link>
        )}
        {user && (
          <>
            <span>Hello {displayedFirstName || user?.email}!</span>
            <div style={{ position: "relative", top: "2px" }}>
              <DropDownMenu options={dropdownOptions} />
            </div>
          </>
        )}
      </div>
    </header>
  );
};
