import React, { useEffect } from "react";
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
  const user = useUser();
  const router = useRouter();

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
    else alert("account created!");
  };

  useEffect(() => {
    if (user.user) router.push("/players");
  }, [router, user]);

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

export default SignUp;

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   console.log({ ctx });
//   // Create authenticated Supabase Client
//   const supabase = createServerSupabaseClient(ctx);
//   // Check if we have a session
//   const data = await supabase.auth.getSession();

//   console.log({ data });

//   if (data.data.session)
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };

//   return {
//     props: {},
//   };
// };
