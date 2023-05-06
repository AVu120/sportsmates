import Head from "next/head";
import { useRouter } from "next/router";

import { Footer } from "@/src/components/navigation/Footer";
import { Header } from "@/src/components/navigation/Header";
import useUser from "@/src/utils/hooks/useUser";

import styles from "./_index.module.scss";

const Meetups = () => {
  const router = useRouter();
  const { isLoggedIn, user } = useUser();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Cricket Buddy - Meetups</title>

        <meta name="description" content="Find a cricket buddy near you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Header page="meetups" isLoggedIn={isLoggedIn} user={user} />
        <main className={styles.main}>Meetups Page</main>
        <Footer />
      </div>
    </>
  );
};

export default Meetups;
