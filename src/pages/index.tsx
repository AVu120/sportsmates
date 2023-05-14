import { Player } from "@prisma/client";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { GetServerSideProps } from "next";
import Head from "next/head";
import superjson from "superjson";

import { Footer } from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";
import PlayersFiltersForm from "@/pages/_components/home/PlayersFiltersForm";
import { PlayersList } from "@/pages/_components/home/PlayersList";
import { appRouter } from "@/server/routers/_app";
import { supabase } from "@/services/authentication";
import { FilterFields } from "@/types/forms";
import { player } from "@/types/player";
import useUser from "@/utils/hooks/useUser";

import styles from "./_index.module.scss";

interface ComponentProps {
  player: player;
  players: player[];
}

// Home Page
const Players = ({ player, players }: ComponentProps) => {
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
        <Header
          page="home"
          isLoggedIn={isLoggedIn}
          user={user}
          player={player}
        />

        <main className={styles.main}>
          <h1 className={styles.title}>Welcome!</h1>
          <div className={styles.filters_players_container}>
            <div className={styles.filters_container}>
              <PlayersFiltersForm onClickSubmitButton={onClickSubmitButton} />
            </div>
            <div className={styles.players_container}>
              <PlayersList players={players} />
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

  let player;

  // If user is logged in.
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
      // @ts-ignore
      const getPlayerResponse = await helpers.player.get.fetch({ supabaseId });
      if (!getPlayerResponse?.description) {
        return {
          redirect: {
            destination: `/players/${supabaseId}/edit`,
            permanent: false,
          },
        };
      }

      player = superjson.serialize(getPlayerResponse).json;
    }
  }

  // Query players regardless of whether user is logged in or not.
  const listPlayersResponse = await helpers.player.list.fetch();
  const players = superjson.serialize(listPlayersResponse).json;

  // If user is logged in.
  if (player)
    return {
      props: { player, players },
    };

  // If user isn't logged in.
  return {
    props: { players },
  };
};
