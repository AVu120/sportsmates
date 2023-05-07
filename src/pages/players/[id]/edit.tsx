import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import superjson from "superjson";

import buttonStyles from "@/_styles/_buttons.module.scss";
import formStyles from "@/_styles/_forms.module.scss";
import { DatePicker } from "@/components/form/DatePicker";
import { Input } from "@/components/form/Input";
import { PlacesAutoComplete } from "@/components/form/PlacesAutoComplete";
import { SelectField } from "@/components/form/Select";
import { Footer } from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";
import { ProfilePicture } from "@/components/profile/Avatar";
import { appRouter } from "@/server/routers/_app";
import { supabase } from "@/services/authentication";
import useUser from "@/utils/hooks/useUser";

import styles from "./_edit.module.scss";

interface ComponentProps {
  hasNotSetUpProfile: boolean;
}

// Every field is required.
const EditProfilePage = ({ hasNotSetUpProfile }: ComponentProps) => {
  const [location, setLocation] = useState<{
    lat: number | undefined;
    long: number | undefined;
  }>({
    lat: undefined,
    long: undefined,
  });
  const router = useRouter();
  const { id } = router.query;
  const { user, isLoggedIn } = useUser();

  const isAllowedToEdit = isLoggedIn && user?.id === id;

  return (
    <>
      <Head>
        <title>Cricket Buddy - Edit Player</title>

        <meta name="description" content="Find a cricket buddy near you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Header
          page="home"
          isLoggedIn={isLoggedIn}
          user={user}
          hasNotSetUpProfile={hasNotSetUpProfile}
          redirectOnLogout
        />
        {isAllowedToEdit ? (
          <main className={styles.main}>
            <h1 className={styles.title}>Edit your profile</h1>
            {hasNotSetUpProfile && (
              <p className={styles.not_set_up_profile_message}>
                You must set up your profile below before you can message other
                players or attend meetups.
              </p>
            )}
            <ProfilePicture />
            <Form.Root
              className={`${formStyles.form_root} ${styles.form_root}`}
              onSubmit={(event: any) => {
                event.preventDefault();
                const data = Object.fromEntries(
                  new FormData(event.currentTarget)
                );
                if (location.lat && location.long) {
                  console.log({ ...location, ...data });
                } else alert("Please select your location");
              }}
            >
              <Input
                label="First name"
                type="text"
                name="firstName"
                isRequired
                valueMissingText="Please enter your first name"
              />
              <Input
                label="Last name"
                type="text"
                name="lastName"
                isRequired
                valueMissingText="Please enter your last name"
              />
              <SelectField
                name="skillLevel"
                label="Skill level"
                options={[
                  {
                    label: "Advanced",
                    value: "advanced",
                  },
                  { label: "Intermediate", value: "intermediate" },
                  { label: "Beginner", value: "beginner" },
                ]}
              />
              <SelectField
                name="gender"
                label="Gender"
                options={[
                  {
                    label: "Male",
                    value: "male",
                  },
                  { label: "Female", value: "female" },
                ]}
              />
              <DatePicker
                label="Birthday (write below or click on the calendar)"
                name="birthday"
                isRequired
              />
              <PlacesAutoComplete
                onSelect={setLocation}
                options={{
                  types: ["locality"],
                  componentRestrictions: { country: "au" },
                }}
                label="City"
              />
              <Input
                label="Profile Description (what other players will see)"
                type="textarea"
                name="description"
                isRequired
                valueMissingText="Please enter your profile description"
              />
              <Form.Submit asChild>
                <button
                  className={buttonStyles.primary_button}
                  style={{ marginTop: 10 }}
                >
                  Save changes
                </button>
              </Form.Submit>
            </Form.Root>
          </main>
        ) : (
          <main className={styles.main}>
            You are not allowed to edit this profile.
          </main>
        )}
        <Footer />
      </div>
    </>
  );
};

export default EditProfilePage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  const refreshToken = req.cookies["my-refresh-token"];
  const accessToken = req.cookies["my-access-token"];

  const helpers = createProxySSGHelpers({
    router: appRouter,
    ctx,
    transformer: superjson,
  });

  let hasNotSetUpProfile = false;

  if (refreshToken && accessToken) {
    const {
      data: { user },
    } = await supabase.auth.setSession({
      refresh_token: refreshToken,
      access_token: accessToken,
    });

    // Check to see if user has set their profile yet.
    // If not, hide navigation links in navbar and display message.

    if (user) {
      const supabaseId = user.id;
      const userData = await helpers.player.get.fetch({ supabaseId });
      hasNotSetUpProfile = !userData?.description;
    }
  }

  return {
    props: { hasNotSetUpProfile },
  };
};
