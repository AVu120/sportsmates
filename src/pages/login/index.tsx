import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { supabase } from "@/src/services/authentication";
import { EmailPasswordFields } from "@/src/types/forms";

import EmailPasswordForm from "../../components/form/EmailPasswordForm";
import { Header } from "../../components/navigation/Header";

import styles from "./_index.module.scss";

const LogIn = () => {
  const router = useRouter();

  const onClickSubmitButton = async ({
    email,
    password,
  }: EmailPasswordFields) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log({ data, error });
    if (error) alert("Error logging in, please try again later.");
    else {
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  const refreshToken = req.cookies["my-refresh-token"];
  const accessToken = req.cookies["my-access-token"];

  if (refreshToken && accessToken) {
    const {
      data: { user },
    } = await supabase.auth.setSession({
      refresh_token: refreshToken,
      access_token: accessToken,
    });

    if (user)
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
  }

  return {
    props: {},
  };
};
