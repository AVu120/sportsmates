import Image from "next/image";
import Link from "next/link";

import buttonStyles from "@/src/_styles/_buttons.module.scss";
import logoStyles from "@/src/_styles/_logos.module.scss";
import { supabase } from "@/src/services/authentication";
import { Page } from "@/src/types/pages";

import { NavBar } from "./NavBar";

import styles from "./Header.module.scss";

interface ComponentProps {
  page: Page;
  isLoggedIn?: boolean;
}
/** Common Header that displays on the top of every page. */
export const Header = ({ page, isLoggedIn }: ComponentProps) => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={`${logoStyles.logo} ${buttonStyles.link_button}`}>
          <Image src="/logo.png" width={25} height={25} alt="" />{" "}
          <div>
            <p>Cricket </p>
            <p>Buddy</p>
          </div>
        </div>
      </Link>

      <NavBar page={page} />
      <div className={buttonStyles.button_group}>
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
          <button
            type="button"
            className={buttonStyles.link_button}
            onClick={() => supabase.auth.signOut()}
          >
            Log out
          </button>
        )}
      </div>
    </header>
  );
};
