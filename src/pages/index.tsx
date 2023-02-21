import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import { trpc } from "../utils/trpc";

export default function Home() {
  const addPlayer = trpc.player.add.useMutation();
  const latestPlayer = trpc.player.list.useQuery();
  console.log({ latestPlayer: latestPlayer.data });

  return (
    <>
      <Head>
        <title>Create Next App</title>

        <meta name="description" content="G enerated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        Home
        <button
          onClick={async () => {
            console.log("ADD PLAYER");
            const addedPlayer = await addPlayer.mutateAsync({
              // temporary UUIDs used for testing, won't be stored permanently anywhere in prod db.
              id: "8563cc01-b80b-4027-b420-4056cdb299ec",
              supabaseId: "24fb84df-9d45-4663-bb7f-000a74a4f04c",
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
