import Head from "next/head";
import styles from "@/styles/Home.module.scss";

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
        Website is under maintainance. This usually does not take long. This
        site should be back up in a few minutes!
      </main>
    </>
  );
}
