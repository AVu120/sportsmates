import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { Header } from "@/src/components/navigation/Header";
import useUser from "@/src/utils/hooks/useUser";

import styles from "./_index.module.scss";

const Players = () => {
  const { isLoggedIn } = useUser();

  return (
    <>
      <Head>
        <title>Cricket Buddy</title>

        <meta name="description" content="Find a cricket buddy near you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <div className={styles.header_container}>
          <Header page="home" isLoggedIn={isLoggedIn} />
        </div>
        <div className={styles.title_container}>
          <main className={styles.main}>
            <h1 className={styles.title}>Welcome!</h1>
          </main>
        </div>
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

export default Players;

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { req } = ctx;
//   const refreshToken = req.cookies["my-refresh-token"];
//   const accessToken = req.cookies["my-access-token"];

//   if (refreshToken && accessToken) {
//     const {
//       data: { user },
//     } = await supabase.auth.setSession({
//       refresh_token: refreshToken,
//       access_token: accessToken,
//     });
//     if (user)
//       return {
//         redirect: {
//           destination: "/players",
//           permanent: false,
//         },
//       };
//   }

//   return {
//     props: {},
//   };
// };
