import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import { trpc } from "../utils/trpc";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
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
        Website is under maintainance. This usually doesn't take long. This site
        should be back up in a few minutes!
      </main>
    </>
  );
}
