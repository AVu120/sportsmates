import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { supabase } from "@/src/services/authentication";
import { EmailPasswordFields } from "@/src/types/forms";
import useUser from "@/src/utils/hooks/useUser";

import { EmailPasswordForm } from "../../components/form/EmailPasswordForm";
import { Header } from "../../components/navigation/Header";

import styles from "./_index.module.scss";

const LogIn = () => {
  const router = useRouter();
  // Keep this here to enable adding of auth cookies after logging in.
  const user = useUser();

  const onClickSubmitButton = async ({
    email,
    password,
  }: EmailPasswordFields) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    //@ts-ignore
    console.log({ error });
    if (error) {
      if (error.message.includes("Invalid login credentials"))
        alert("Wrong username and/or password.");
      if (error.message.includes("Email not confirmed"))
        alert(
          "Please confirm your email first to log in. You can do this by clicking the link in the email we sent you."
        );
    } else {
      alert("Successfully logged in!");
      router.push("/");
    }
  };

  return (
    <>
      <Head>
        <title>Log in - Cricket Buddy</title>

        <meta name="description" content="Find a cricket buddy near you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Header page="login" />
        <main>
          <EmailPasswordForm
            title="Log in to Cricket Buddy"
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
