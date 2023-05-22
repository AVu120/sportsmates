import {} from "@radix-ui/react-icons";
import { User } from "@supabase/supabase-js";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import superjson from "superjson";

import formStyles from "@/_styles/_forms.module.scss";
import { Footer } from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";
import { appRouter } from "@/server/routers/_app";
import { supabase } from "@/services/authentication";
import { player } from "@/types/player";
import useUser from "@/utils/hooks/useUser";

import styles from "./_index.module.scss";
// const router = useRouter();
// const { id } = router.query;

interface ComponentProps {
  player: player;
  user: User | null;
}

const ProfilePage = ({ user, player }: ComponentProps) => {
  console.log({ user, player });
  return (
    <>
      <Head>
        <title>Cricket Buddy - Player Profile</title>

        <meta name="description" content="Find a cricket buddy near you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Header page="profile" user={user} />
        <main className={styles.main}>
          <h1>{`${player.firstName} ${player.lastName}`}</h1>
          <p className={formStyles.label}>Skill Level</p>
          <p>{player.skillLevel}</p>
          <p className={formStyles.label}>Gender</p>
          <p>{player.gender}</p>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, query } = ctx;
  const refreshToken = req.cookies["my-refresh-token"];
  const accessToken = req.cookies["my-access-token"];

  const helpers = createProxySSGHelpers({
    router: appRouter,
    ctx,
    transformer: superjson,
  });

  // There shouldn't be an array of IDs, if there is just convert to string and query nothing.
  const supabaseId = (!Array.isArray(query?.id) ? query?.id : "") || "";
  const player = await helpers.player.getPublicData.fetch({
    supabaseId: supabaseId,
  });
  const serializedPlayer = superjson.serialize(player).json;

  if (refreshToken && accessToken) {
    const {
      data: { user },
    } = await supabase.auth.setSession({
      refresh_token: refreshToken,
      access_token: accessToken,
    });

    // Check to see if user has set their profile yet.
    // If not, hide navigation links in navbar and display message that they
    // need to set their profile in order to use the app.
    if (user) {
      return {
        props: { player: serializedPlayer, user },
      };
    }
  }

  return {
    props: { player: serializedPlayer },
  };
};
