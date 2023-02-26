import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import { trpc } from "../utils/trpc";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const addPlayer = trpc.player.add.useMutation();

  const latestPlayer = trpc.player.getLatestPlayer.useQuery();

  useEffect(() => {
    console.log({ latestPlayerData: latestPlayer.data });
  }, [latestPlayer.data]);

  return (
    <>
      <Head>
        <title>Create Next App</title>

        <meta name="description" content="G enerated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={styles.main}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        Home
        <div>
          <h1>Latest Player</h1>
          <button
            onClick={() => {
              latestPlayer.refetch();
            }}
          >
            Refetch latest player
          </button>
          {typeof latestPlayer.data === "string" ? (
            <p>{latestPlayer.data}</p>
          ) : (
            <>
              <p>{latestPlayer?.data?.id}</p>
              <p>{latestPlayer?.data?.supabaseId}</p>
              {latestPlayer?.data?.createdAt && (
                <p>{new Date(latestPlayer.data.createdAt).toString()}</p>
              )}
            </>
          )}
        </div>
        <button
          onClick={async () => {
            console.log("ADD PLAYER");
            const addedPlayer = await addPlayer.mutateAsync({
              supabaseId: uuidv4(),
              createdAt: new Date(),
            });
            console.log({ addedPlayer });
          }}
        >
          Add Playerr
        </button>
      </main>
    </>
  );
}
