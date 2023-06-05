import { FormEvent, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import superjson from "superjson";

import buttonStyles from "@/_styles/_buttons.module.scss";
import formStyles from "@/_styles/_forms.module.scss";
import { SendMessageModal } from "@/components/modal/SendMessage";
import { Footer } from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";
import { ProfilePicture } from "@/components/profile/ProfilePicture";
import { appRouter } from "@/server/routers/_app";
import { supabase } from "@/services/authentication";
import { player } from "@/types/player";
import { formatLastSignInDate, getInitials } from "@/utils/player";
import { trpc } from "@/utils/trpc";

import styles from "./_index.module.scss";

interface ComponentProps {
  player: Omit<player, "birthday"> & { age: number };
  user: User | null;
}

const ProfilePage = ({ user, player }: ComponentProps) => {
  const router = useRouter();
  const { id } = router.query;
  const formattedLastSignInDate = formatLastSignInDate(player.lastSignIn);
  const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const initials = getInitials(player?.firstName || "", player?.lastName || "");

  const toggleIsSendMessageModalOpen = () =>
    setIsSendMessageModalOpen(!isSendMessageModalOpen);

  const sendEmail = trpc.player.sendEmail.useMutation({
    async onSuccess() {
      alert("Message sent!");
      toggleIsSendMessageModalOpen();
    },

    async onSettled() {
      setIsSendingMessage(false);
    },
  });

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    setIsSendingMessage(true);
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const { message } = formData;
    try {
      if (id && typeof id === "string" && user) {
        await sendEmail.mutateAsync({
          fromSupabaseId: user?.id,
          supabaseId: id,
          fromName: `${player.firstName} ${player.lastName}`,
          message: message as string,
        });
      }
    } catch (error) {
      // @ts-ignore
      alert(`Failed to send message: ${error?.shape?.message}`);
    }
  };

  return (
    <>
      <Head>
        <title>Sportsmates - Player Profile</title>

        <meta name="description" content="Find a sports mate near you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Header page="profile" user={user} />
        <main className={styles.main}>
          {/* <div className={styles.profile_cards_container}> */}
          <div className={styles.profile_card}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "1rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>{`${player.firstName} ${player.lastName}`}</h1>
                <div className={styles.button_container}>
                  <button
                    className={buttonStyles.primary_button}
                    onClick={() => {
                      if (!user) return alert("Please login to send a message");
                      toggleIsSendMessageModalOpen();
                    }}
                  >
                    Message
                  </button>
                </div>
              </div>
              <div className={styles.profile_picture_container}>
                <ProfilePicture
                  initials={initials}
                  url={player?.profilePictureUrl || ""}
                />
              </div>
              {player.lastSignIn && (
                <div>
                  <p className={formStyles.label}>Last Active At</p>
                  <p>{formattedLastSignInDate}</p>
                </div>
              )}
              <div>
                <p className={formStyles.label}>Skill Level</p>
                <p>{player.skillLevel}</p>
              </div>
              <div>
                <p className={formStyles.label}>Gender</p>
                <p>{player.gender}</p>
              </div>
              <div>
                <p className={formStyles.label}>Age</p>
                <p>{player.age}</p>
              </div>
              <div>
                <p className={formStyles.label}>City</p>
                <p>{player.city}</p>
              </div>
              <div>
                <p className={formStyles.label}>Description</p>
                <p>{player.description}</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <SendMessageModal
          open={isSendMessageModalOpen}
          onClose={toggleIsSendMessageModalOpen}
          onSend={sendMessage}
          name="message"
          isSendingMessage={isSendingMessage}
        />
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
