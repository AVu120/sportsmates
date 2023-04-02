import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.scss";
import buttonStyles from "@/src/_styles/_buttons.module.scss";
import logoStyles from "@/src/_styles/_logos.module.scss";
import { Page } from "@/src/types/pages";

interface HeaderProps {
  page: Page;
}
/** Common Header that displays on the top of every page. */
export const Header = ({ page }: HeaderProps) => (
  <header className={styles.header}>
    <Link href="/">
      <div className={logoStyles.logo}>
        <Image src="/logo.png" width={25} height={25} alt="" />{" "}
        <div className={logoStyles.logo_text}>
          <p>Cricket </p>
          <p>Buddy</p>
        </div>
      </div>
    </Link>
    <div className={buttonStyles.button_group}>
      {page !== "login" && (
        <Link href="/login">
          <button>Log in</button>
        </Link>
      )}
      {page !== "signup" && (
        <Link href="/signup">
          <button>Sign up</button>
        </Link>
      )}
    </div>
  </header>
);
