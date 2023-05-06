import { useState } from "react";
import Head from "next/head";

import { supabase } from "@/src/services/authentication";
import { EmailPasswordFields } from "@/src/types/forms";
import { trpc } from "@/src/utils/trpc";

import { EmailPasswordForm } from "../../components/form/EmailPasswordForm";
import { Header } from "../../components/navigation/Header";

import styles from "./_index.module.scss";

const SignUp = () => {
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const addPlayer = trpc.player.add.useMutation();

  const onClickSubmitButton = async ({
    email,
    password,
  }: EmailPasswordFields) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      if (data?.user) {
        const { id, created_at } = data.user;
        await addPlayer.mutateAsync({
          supabaseId: id,
          email,
          createdAt: new Date(created_at),
        });
      }
    } catch (error) {
      console.log({ error });
      if (
        //@ts-ignore
        error?.shape?.message
          ?.toLowerCase()
          .includes("unique constraint failed")
      )
        return alert(
          "Account already exists. Please log in. If you have not verified your email, another verification email has been sent to you."
        );
      return alert("Error creating account, please try again later.");
    }

    setHasSignedUp(true);
    alert("account created!");
  };

  return (
    <>
      <Head>
        <title>Sign up - Cricket Buddy</title>

        <meta name="description" content="Find a cricket buddy near you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        {/* <Header page="signup" isLoggedIn={isLoggedIn} /> */}
        <Header page="signup" />
        <main className={styles.main}>
          {hasSignedUp ? (
            <p style={{ wordWrap: "break-word", width: "360px" }}>
              We are happy you signed up for Cricket Buddy! To start finding
              other players and meetups, please verify your email by clicking
              the link in the email we just sent to you!
            </p>
          ) : (
            <EmailPasswordForm
              title="Sign up to Cricket Buddy"
              onClickSubmitButton={onClickSubmitButton}
              page="signup"
            />
          )}
        </main>
      </div>
    </>
  );
};

export default SignUp;
