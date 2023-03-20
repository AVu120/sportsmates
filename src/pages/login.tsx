import React from "react";
import Head from "next/head";
import { Header } from "../components/common/Header";
import styles from "./_styles/login.module.scss";

const login = () => {
  return (
    <>
      <Head>
        <title>Log in - Cricket Buddy</title>

        <meta name="description" content="Find a cricket buddy near you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Header />
        <main>Login</main>
        <footer />
      </div>
    </>
  );
};

export default login;
