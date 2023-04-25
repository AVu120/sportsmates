import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { Footer } from "@/src/components/navigation/Footer";
import { Header } from "@/src/components/navigation/Header";
import { PlayersFiltersForm } from "@/src/pages/_components/home/PlayersFiltersForm";
import { FilterFields } from "@/src/types/forms";
import useUser from "@/src/utils/hooks/useUser";

import { SelectField } from "../components/form/Select";

import styles from "./_index.module.scss";

const Players = () => {
  const { isLoggedIn } = useUser();

  //@ts-ignore
  const onClickSubmitButton = async ({ location }: FilterFields) => {
    // const { data, error } = await supabase.auth.signUp({
    //   email,
    //   password,
    // });

    console.log({ location });
  };

  return (
    <>
      <Head>
        <title>Cricket Buddy</title>

        <meta name="description" content="Find a cricket buddy near you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Header page="home" isLoggedIn={isLoggedIn} />

        <main className={styles.main}>
          <h1 className={styles.title}>Welcome!</h1>
          <div className={styles.filters_players_container}>
            <div className={styles.filters_container}>
              <PlayersFiltersForm onClickSubmitButton={onClickSubmitButton} />
            </div>
            <div className={styles.players_container}>
              Placeholder for list of player cards
            </div>
          </div>
        </main>
        <Footer />
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
