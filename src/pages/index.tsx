import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { GetServerSideProps } from "next";
import Head from "next/head";
import superjson from "superjson";

import { Footer } from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";
import PlayersFiltersForm from "@/pages/_components/home/PlayersFiltersForm";
import { appRouter } from "@/server/routers/_app";
import { supabase } from "@/services/authentication";
import { FilterFields } from "@/types/forms";
import useUser from "@/utils/hooks/useUser";
import { trpc } from "@/utils/trpc";

import styles from "./_index.module.scss";

// Home Page
const Players = () => {
  const { isLoggedIn, user } = useUser();
  //@ts-ignore
  const onClickSubmitButton = async ({ location }: FilterFields) => {
    // const { data, error } = await supabase.auth.signUp({
    //   email,
    //   password,
    // });
  };

  return (
    <>
      <Head>
        <title>Cricket Buddy</title>

        <meta name="description" content="Find a cricket buddy near you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Header page="home" isLoggedIn={isLoggedIn} user={user} />

        <main className={styles.main}>
          <h1 className={styles.title}>Welcome!</h1>
          <div className={styles.filters_players_container}>
            <div className={styles.filters_container}>
              <PlayersFiltersForm onClickSubmitButton={onClickSubmitButton} />
            </div>
            <div className={styles.players_container}>
              Placeholder for list of player cards
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Players;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  const refreshToken = req.cookies["my-refresh-token"];
  const accessToken = req.cookies["my-access-token"];

  const helpers = createProxySSGHelpers({
    router: appRouter,
    ctx,
    transformer: superjson,
  });

  if (refreshToken && accessToken) {
    const {
      data: { user },
    } = await supabase.auth.setSession({
      refresh_token: refreshToken,
      access_token: accessToken,
    });

    // Check to see if user has set their profile yet.
    // If not, redirect to edit profile page.
    if (user) {
      const supabaseId = user.id;
      const userData = await helpers.player.get.fetch({ supabaseId });
      if (!userData?.description) {
        return {
          redirect: {
            destination: `/players/${supabaseId}/edit`,
            permanent: false,
          },
        };
      }
    }
  }

  return {
    props: {},
  };
};
