import Head from "next/head";
import styles from "./_index.module.scss";
import { Header } from "@/src/components/navigation/Header";

const Profile = () => {
  return (
    <>
      <Head>
        <title>Cricket Buddy - Player</title>

        <meta name="description" content="Find a cricket buddy near you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Header page="home" />
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

export default Profile;
