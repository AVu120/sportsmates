import Head from "next/head";
import { useRouter } from "next/router";

import { Header } from "@/src/components/navigation/Header";
import { ProfilePicture } from "@/src/components/profile/Avatar";
import useUser from "@/src/utils/hooks/useUser";

import styles from "./_edit.module.scss";

const EditPlayer = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user, isLoggedIn } = useUser();

  const isAllowedToEdit = isLoggedIn && user?.id === id;

  return (
    <>
      <Head>
        <title>Cricket Buddy - Edit Player</title>

        <meta name="description" content="Find a cricket buddy near you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Header page="home" isLoggedIn={isLoggedIn} user={user} />
        {isAllowedToEdit ? (
          <main className={styles.main}>
            <h1 className={styles.title}>Edit your profile</h1>
            <ProfilePicture />
          </main>
        ) : (
          <main>You are not allowed to edit this profile.</main>
        )}
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

export default EditPlayer;
