import Head from "next/head";
import React from "react";
import EmailPasswordForm from "../../components/form/EmailPasswordForm";
import { Header } from "../../components/navigation/Header";
import styles from "./_index.module.scss";
import { Fields } from "@/src/types/forms";

const signup = () => {
  const onClickSubmitButton = (data: Fields) => {
    console.log({ ...data, page: "signup" });
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
        <Header page="signup" />
        <main>
          <EmailPasswordForm
            title="Sign up to Cricket Buddy"
            onClickSubmitButton={onClickSubmitButton}
            page="signup"
          />
        </main>
        <footer />
      </div>
    </>
  );
};

export default signup;
