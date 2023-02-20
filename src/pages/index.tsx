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
              id: "f05335ca-ccf9-4e93-971d-568993121c44",
              supabaseId: "35ecf683-f701-4e8a-b2be-4932ef371863",
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
