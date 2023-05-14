import { ChangeEvent, useState } from "react";
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
import { ProfilePicture } from "@/components/profile/ProfilePicture";
import { appRouter } from "@/server/routers/_app";
import { supabase } from "@/services/authentication";
import { player } from "@/types/player";
import useUser from "@/utils/hooks/useUser";
import { trpc } from "@/utils/trpc";

import styles from "./_edit.module.scss";

interface ComponentProps {
  player: player;
}

// Server only accepts this interface, no nulls allowed for these fields.
interface FormFields {
  firstName: string;
  lastName: string;
  skillLevel: string;
  birthday: string;
  city: string;
  description: string;
  gender: "male" | "female";
  longitude?: number;
  latitude?: number;
}

// Every field is required.
const EditProfilePage = ({ player }: ComponentProps) => {
  // Save local state of player data so that if first name changes,
  // we can immediately display the new name in the header without having to
  // reload the entire page.
  const [playerState, setPlayerState] = useState<player>(player);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    address: string | null;
  }>({
    latitude: NaN,
    longitude: NaN,
    address: player?.city,
  });
  const [city, setCity] = useState<string>(player?.city || "");
  const router = useRouter();
  const { id } = router.query;
  const { user, isLoggedIn } = useUser();
  const isAllowedToEdit = isLoggedIn && user?.id && user?.id === id;
  const hasNotSetUpProfile = !player?.description;
  const [hasMadeChanges, setHasMadeChanges] = useState(false);

  const updatePlayer = trpc.player.update.useMutation({
    async onSuccess() {
      // Reset location state so that the user can select a new location
      setLocation((state) => ({
        ...state,
        longitude: NaN,
        latitude: NaN,
      }));
      alert("Profile updated successfully");
      // Redirect user to home page after they have set their profile for the first time.
      if (hasNotSetUpProfile) router.push("/");
      setHasMadeChanges(false);
    },
  });

  const isSaveButtonDisabled = !hasMadeChanges || updatePlayer.isLoading;
  const toggleHasMadeChanges = () => {
    if (!hasMadeChanges) {
      setHasMadeChanges(true);
    }
  };

  const onSubmitForm = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    //@ts-ignore
    const formData = Object.fromEntries(
      new FormData(event.currentTarget)
    ) as FormFields;
    const { latitude, longitude } = location;
    let input = {
      ...formData,
      supabaseId: user?.id as string,
      birthday: new Date(formData.birthday),
      latitude,
      longitude,
    };

    // If player has changed city field value from last saved value.
    if (input.city !== location.address) {
      // Player needs to select an address from the dropdown menu first
      // to save the coordinates of the new location in the db.
      if (!(location.latitude && location.longitude))
        return alert(
          input.city.length === 0
            ? "Please enter your city"
            : "Please select your city from the dropdown menu"
        );
    }

    // Don't send latitude and longitude to server if they are NaN.
    // This happens when the user updates the form without updating
    // their city field.
    if (isNaN(latitude) || isNaN(longitude)) {
      const { longitude, latitude, ...inputWithoutLocation } = input;
      await updatePlayer.mutateAsync(inputWithoutLocation);
    } else {
      await updatePlayer.mutateAsync(input);
    }

    setPlayerState((state) => ({ ...state, firstName: input.firstName }));
  };

  if (!isAllowedToEdit)
    return (
      <>
        <Head>
          <title>Cricket Buddy - Meetups</title>

          <meta name="description" content="Find a cricket buddy near you" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.page}>
          <Header
            page="edit"
            isLoggedIn={isLoggedIn}
            user={user}
            player={playerState}
          />
          <main className={styles.main}>
            You are not allowed to edit this page.
          </main>
          <Footer />
        </div>
      </>
    );

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
          page="edit"
          isLoggedIn={isLoggedIn}
          user={user}
          hasNotSetUpProfile={hasNotSetUpProfile}
          player={playerState}
        />
        <main className={styles.main}>
          <h1 className={styles.title}>Edit your profile</h1>
          {hasNotSetUpProfile && (
            <p className={styles.not_set_up_profile_message}>
              You must set up your profile below before you can message other
              players or attend meetups.
            </p>
          )}
          <ProfilePicture height="200px" />
          <Form.Root
            onChange={toggleHasMadeChanges}
            className={`${formStyles.form_root} ${styles.form_root}`}
            onSubmit={onSubmitForm}
          >
            <Input
              label="First name"
              type="text"
              name="firstName"
              isRequired
              valueMissingText="Please enter your first name"
              value={player?.firstName || ""}
            />
            <Input
              label="Last name"
              type="text"
              name="lastName"
              isRequired
              valueMissingText="Please enter your last name"
              value={player?.lastName || ""}
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
              defaultValue={player?.skillLevel || ""}
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
              defaultValue={player?.gender || ""}
            />
            <DatePicker
              label="Birthday (write below or click on the calendar)"
              name="birthday"
              isRequired
              defaultValue={player?.birthday?.split("T")[0] || ""}
            />
            <PlacesAutoComplete
              name="city"
              onSelect={({ latitude, longitude, address }) => {
                setLocation({ latitude, longitude, address });
                setCity(address);
              }}
              options={{
                types: ["locality"],
                componentRestrictions: { country: "au" },
              }}
              label="City"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                if (!isNaN(location.longitude)) {
                  setLocation((state) => ({
                    ...state,
                    longitude: NaN,
                    latitude: NaN,
                  }));
                }
              }}
            />
            <Input
              label="Profile Description (what other players will see)"
              type="textarea"
              name="description"
              isRequired
              valueMissingText="Please enter your profile description"
              value={player?.description || ""}
            />
            <Form.Submit asChild>
              <button
                className={buttonStyles.primary_button}
                style={{ marginTop: 10 }}
                disabled={isSaveButtonDisabled}
              >
                {updatePlayer.isLoading ? "Saving changes..." : "Save changes"}
              </button>
            </Form.Submit>
          </Form.Root>
        </main>
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

  if (refreshToken && accessToken) {
    const {
      data: { user },
    } = await supabase.auth.setSession({
      refresh_token: refreshToken,
      access_token: accessToken,
    });

    // Check to see if user has set their profile yet.
    // If not, hide navigation links in navbar and display message that they
    // need to set their profile in order to use the app.
    if (user) {
      const supabaseId = user.id;
      const player = await helpers.player.get.fetch({ supabaseId });

      const serializedPlayer = superjson.serialize(player);

      return {
        props: { player: serializedPlayer.json },
      };
    }
  }

  return {
    props: {},
  };
};
