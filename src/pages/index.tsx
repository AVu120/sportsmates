import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { Header } from "@/src/components/navigation/Header";
import { supabase } from "@/src/services/authentication";
import useUser from "@/src/utils/hooks/useUser";

import styles from "./_index.module.scss";

const Home = () => {
  const router = useRouter();
  const user = useUser();
  if (user.user) router.push("/players");
  return (
    <>
      <Head>
        <title>Cricket Buddy</title>

        <meta name="description" content="Find a cricket buddy near you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Header page="home" />
        <main>Find a cricket buddy near you</main>
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

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  const refreshToken = req.cookies["my-refresh-token"];
  const accessToken = req.cookies["my-access-token"];

  if (refreshToken && accessToken) {
    const {
      data: { user },
    } = await supabase.auth.setSession({
      refresh_token: refreshToken,
      access_token: accessToken,
    });
    if (user)
      return {
        redirect: {
          destination: "/players",
          permanent: false,
        },
      };
  }

  return {
    props: {},
  };
};
