import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.scss";
import { trpc } from "../utils/trpc";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const hello = trpc.hello.useQuery({ text: "client" });
  console.log({ greeting: hello.data?.greeting });
  return (
    <>
      <Head>
        <title>Create Next App</title>

        <meta name="description" content="G enerated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>Home</main>
    </>
  );
}
