import { useState } from "react";
import { Player } from "@prisma/client";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { GetServerSideProps } from "next";
import Head from "next/head";
import superjson from "superjson";
import { set } from "zod";

import { Footer } from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";
import PlayersFiltersForm from "@/pages/_components/home/PlayersFiltersForm";
import PlayersList from "@/pages/_components/home/PlayersList";
import { appRouter } from "@/server/routers/_app";
import { supabase } from "@/services/authentication";
import { FilterFields } from "@/types/forms";
import { player } from "@/types/player";
import useUser from "@/utils/hooks/useUser";
import { trpc } from "@/utils/trpc";

import styles from "./_index.module.scss";

interface ComponentProps {
  player: player;
}

export const searchRadiusOptions = [
  { label: "Any distance from you", value: "Any distance from you" },
  { label: "Within 10km", value: "10" },
  { label: "Within 20km", value: "20" },
  { label: "Within 30km", value: "30" },
  { label: "Within 40km", value: "40" },
  { label: "Within 50km", value: "50" },
];

export const genderOptions = [
  { label: "Any gender", value: "Any gender" },
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];

export const sortByOptions = [
  { label: "Most recently active", value: "Most recently active" },
  { label: "Oldest to youngest", value: "Oldest to youngest" },
  { label: "Youngest to oldest", value: "Youngest to oldest" },
  { label: "Closest to me", value: "Closest to me" },
];

// Home Page
const Players = ({ player }: ComponentProps) => {
  const [queryFilters, setQueryFilters] = useState({
    gender: genderOptions[0].value,
  });
  const { isLoggedIn, user } = useUser();
  //@ts-ignore
  const onApplyFilters = (data: FilterFields) => {
    console.log({ data });
    setQueryFilters({ gender: data.gender });
  };
  const listPlayers = trpc.player.list.useQuery(queryFilters);

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
              <PlayersFiltersForm onClickApplyButton={onApplyFilters} />
            </div>
            <div className={styles.players_container}>
              {/* @ts-ignore */}
              <PlayersList players={listPlayers.data || []} />
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
      return {
        props: { player },
      };
    }
  }

  // Query players regardless of whether user is logged in or not.

  // If user is logged in.
  // if (player)
  //   return {
  //     props: { player, players },
  //   };

  // If user isn't logged in.
  return {
    props: {},
  };
};
