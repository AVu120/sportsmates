import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.scss";

interface HeaderProps {
  page: "login" | "signup" | "home";
}
/** Common Header that displays on the top of every page. */
export const Header = ({ page }: HeaderProps) => (
  <header className={styles.header}>
    <Link href="/">
      <div className={styles.logo}>
        <Image src="/logo.png" width={25} height={25} alt="" />{" "}
        <div className={styles.logo_text}>
          <p>Cricket </p>
          <p>Buddy</p>
        </div>
      </div>
    </Link>
    <div className={styles.button_group}>
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
