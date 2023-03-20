import Head from "next/head";
import styles from "./_styles/index.module.scss";
import { Header } from "../components/common/Header";

const Home = () => {
  return (
    <>
      <Head>
        <title>Cricket Buddy</title>

        <meta name="description" content="Find a cricket buddy near you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Header />
        <main>Find a cricket buddy near you</main>
        <footer>
          <a
            href="https://www.flaticon.com/free-icons/cricket"
            title="cricket icons"
          >
            Cricket icons created by Freepik - Flaticon
          </a>
        </footer>
      </div>
    </>
  );
};

export default Home;
