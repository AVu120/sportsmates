import Head from "next/head";

import { Header } from "@/src/components/navigation/Header";
import useUser from "@/src/utils/hooks/useUser";

import styles from "./_index.module.scss";

const Players = () => {
  const { isLoggedIn } = useUser();
  return (
    <>
      <Head>
        <title>Cricket Buddy - Player</title>

        <meta name="description" content="Find a cricket buddy near you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Header page="home" isLoggedIn={isLoggedIn} />
        <main>Players Page</main>
        <footer>
          <a
            href="https://www.flaticon.com/free-icons/cricket"
            title="cricket icons"
          >
            Cricket icons created by Freepik - Flaticon
          </a>
        </footer>
      </div>
    </>
  );
};

export default Players;
