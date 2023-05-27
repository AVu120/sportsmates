import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { supabase } from "@/services/authentication";
import { EmailPasswordFields } from "@/types/forms";
import useUser from "@/utils/hooks/useUser";
import { trpc } from "@/utils/trpc";

import { EmailPasswordForm } from "../../components/form/EmailPasswordForm";
import { Header } from "../../components/navigation/Header";

import styles from "./_index.module.scss";

const LogIn = () => {
  const router = useRouter();
  // Keep this here to enable adding of auth cookies after logging in.
  const user = useUser();

  const updateLastSign = trpc.player.updateLastSignIn.useMutation({});

  const onClickSubmitButton = async ({
    email,
    password,
  }: EmailPasswordFields) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    //@ts-ignore
    if (error) {
      if (error.message.includes("Invalid login credentials"))
        alert("Wrong username and/or password.");
      if (error.message.includes("Email not confirmed"))
        alert(
          "Please confirm your email first to log in. You can do this by clicking the link in the email we sent you."
        );
    } else {
      alert("Successfully logged in!");
      updateLastSign
        .mutateAsync({ email, lastSignIn: new Date() })
        .catch((e) => console.log({ e }));
      router.push("/");
    }
  };

  return (
    <>
      <Head>
        <title>Log in - Sportsmates</title>

        <meta name="description" content="Find a sports mate near you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Header page="login" />
        <main className={styles.main}>
          <EmailPasswordForm
            title="Log in to Sportsmates"
            onClickSubmitButton={onClickSubmitButton}
            page="login"
          />
        </main>
        <footer />
      </div>
    </>
  );
};

export default LogIn;
