import Head from "next/head";
import styles from "./_edit.module.scss";
import { Header } from "@/src/components/navigation/Header";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Cricket Buddy - Edit Profile</title>

        <meta name="description" content="Find a cricket buddy near you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Header page="home" />
        <main>Edit Profile Page of player {id}</main>
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
