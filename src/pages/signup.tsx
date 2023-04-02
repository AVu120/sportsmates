import Head from "next/head";
import React from "react";
import SignupForm from "../components/form/SignupForm";
import { Header } from "../components/navigation/Header";
import styles from "./_styles/signup.module.scss";

const signup = () => {
  return (
    <>
      <Head>
        <title>Sign up - Cricket Buddy</title>

        <meta name="description" content="Find a cricket buddy near you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Header page="signup" />
        <main>
          <SignupForm />
        </main>
        <footer />
      </div>
    </>
  );
};

export default signup;
