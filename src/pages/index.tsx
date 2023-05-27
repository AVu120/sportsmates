import { useState } from "react";
import Head from "next/head";

import { Footer } from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";
import PlayersFiltersForm from "@/pages/_components/home/PlayersFiltersForm";
import PlayersList from "@/pages/_components/home/PlayersList";
import { FilterFields } from "@/types/forms";
import {
  genderOptions,
  searchRadiusOptions,
  sortByOptions,
} from "@/utils/constants/player";
import usePlayer from "@/utils/hooks/usePlayer";
import useUser from "@/utils/hooks/useUser";
import { trpc } from "@/utils/trpc";

import styles from "./_index.module.scss";

// Home Page
const Players = () => {
  const [queryFilters, setQueryFilters] = useState({
    searchRadius: searchRadiusOptions[0].value,
    longitude: NaN,
    latitude: NaN,
    gender: genderOptions[0].value,
    sortBy: sortByOptions[0].value,
  });
  const { user } = useUser();
  //@ts-ignore
  const onApplyFilters = (data: FilterFields) => {
    const { searchRadius, longitude, latitude, gender, sortBy } = data;
    setQueryFilters({ searchRadius, longitude, latitude, gender, sortBy });
  };

  const { longitude, latitude, ...queryFiltersWithoutLocation } = queryFilters;

  const { player } = usePlayer({ user });
  const listPlayers = trpc.player.list.useQuery(
    isNaN(longitude) ? queryFiltersWithoutLocation : queryFilters
  );

  return (
    <>
      <Head>
        <title>Sportsmates</title>

        <meta name="description" content="Find a sports mate near you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Header
          page="home"
          user={user}
          firstName={player?.data?.firstName || ""}
        />

        <main className={styles.main}>
          <h1 className={styles.title}>Welcome!</h1>
          <div className={styles.filters_players_container}>
            <div className={styles.filters_container}>
              <PlayersFiltersForm onClickApplyButton={onApplyFilters} />
            </div>
            <div className={styles.players_container}>
              {/* @ts-ignore */}
              <PlayersList players={listPlayers?.data || []} />
              {/* <PlayersList players={[]} isLoading={false} /> */}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Players;
