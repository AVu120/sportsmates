import { useEffect, useState } from "react";
import Head from "next/head";

import buttonStyles from "@/_styles/_buttons.module.scss";
import { Footer } from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";
import PlayersFiltersForm from "@/pages/_components/home/PlayersFiltersForm";
import PlayersList from "@/pages/_components/home/PlayersList";
import { FilterFields } from "@/types/forms";
import { player } from "@/types/player";
import {
  genderOptions,
  searchRadiusOptions,
  sortByOptions,
  sportOptions,
} from "@/utils/constants/player";
import usePlayer from "@/utils/hooks/usePlayer";
import useUser from "@/utils/hooks/useUser";
import { useViewport } from "@/utils/hooks/useViewport";
import { trpc } from "@/utils/trpc";

import styles from "./_index.module.scss";
const LIMIT = 10;

// Home Page
const Players = () => {
  const [offset, setOffset] = useState(0);
  const [players, setPlayers] = useState<player[]>([]);
  const [queryFilters, setQueryFilters] = useState({
    searchRadius: searchRadiusOptions[0].value,
    longitude: NaN,
    latitude: NaN,
    gender: genderOptions[0].value,
    sortBy: sortByOptions[0].value,
    sport: sportOptions[0].value,
  });
  const { user } = useUser();
  //@ts-ignore
  const onApplyFilters = (data: FilterFields) => {
    const { searchRadius, longitude, latitude, gender, sortBy, sport } = data;
    setQueryFilters({
      searchRadius,
      longitude,
      latitude,
      gender,
      sortBy,
      sport,
    });
    setOffset(0);
  };

  const loadMorePlayers = async () => {
    const { searchRadius, longitude, latitude, gender, sortBy, sport } =
      queryFilters;
    const updatedOffset = offset + 10;
    const response = await fetch(
      `/api/players?searchRadius=${searchRadius}&longitude=${longitude}&latitude=${latitude}&gender=${gender}&sortBy=${sortBy}&sport=${sport}&limit=${LIMIT}&offset=${updatedOffset}`
    );
    const data = await response.json();
    if (data.length === 0) return alert("No more players");

    setPlayers((prev) => [...prev, ...data]);
    setOffset(updatedOffset);
  };

  const { longitude, latitude, ...queryFiltersWithoutLocation } = queryFilters;

  const { player } = usePlayer({ user });
  const listPlayers = trpc.player.list.useQuery(
    isNaN(longitude) ? queryFiltersWithoutLocation : queryFilters
  );

  useEffect(() => {
    // @ts-ignore
    setPlayers(listPlayers.data);
  }, [listPlayers?.data]);

  const hasMorePlayers =
    !listPlayers.isLoading &&
    players?.length !== 0 &&
    players?.length % 10 === 0;

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
              <PlayersList
                players={players}
                isLoading={listPlayers.isLoading}
              />
              {hasMorePlayers && (
                <button
                  className={`${buttonStyles.primary_button} ${styles.load_more_players_button}`}
                  onClick={loadMorePlayers}
                >
                  Load More Players
                </button>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Players;
