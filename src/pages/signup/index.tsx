import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
// import { useUser } from "@supabase/auth-helpers-react";
// import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
// import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { supabase } from "@/src/services/authentication";
import { EmailPasswordFields } from "@/src/types/forms";
import useUser from "@/src/utils/hooks/useUser";

import EmailPasswordForm from "../../components/form/EmailPasswordForm";
import { Header } from "../../components/navigation/Header";

import styles from "./_index.module.scss";

const SignUp = () => {
  const [hasSignedUp, setHasSignedUp] = useState(false);
  // const user = useUser();
  // const isLoggedIn = !!user.user;

  const onClickSubmitButton = async ({
    email,
    password,
  }: EmailPasswordFields) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log({ data, error });
    if (error) alert("Error creating account, please try again later.");
    else {
      setHasSignedUp(true);
      alert("account created!");
    }
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
        <main>
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
        <footer />
      </div>
    </>
  );
};

export default SignUp;

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
          destination: "/players",
          permanent: false,
        },
      };
  }

  return {
    props: {},
  };
};
