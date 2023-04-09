import React from "react";
import Head from "next/head";
import { Header } from "../components/navigation/Header";
import styles from "./_login.module.scss";
import EmailPasswordForm from "../components/form/EmailPasswordForm";
import { Fields } from "@/src/types/forms";

const login = () => {
  const onClickSubmitButton = (data: Fields) => {
    console.log({ ...data, page: "login" });
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

export default login;
