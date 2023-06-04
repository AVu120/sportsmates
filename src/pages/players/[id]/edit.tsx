import { ChangeEvent, useState } from "react";
import * as Form from "@radix-ui/react-form";
import { User } from "@supabase/supabase-js";
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
  user: User | null;
}

// Server only accepts this interface, no nulls allowed for these fields.
interface FormFields {
  firstName: string;
  lastName: string;
  skillLevel: string;
  birthday: string;
  city: string;
  description: string;
  gender: "Male" | "Female";
  longitude?: number;
  latitude?: number;
}

// Every field is required.
const EditProfilePage = ({ player, user }: ComponentProps) => {
  // Save local state of player data so that if first name changes,
  // we can immediately display the new name in the header without having to
  // reload the entire page.
  const [hasNotSetUpProfile, setHasNotSetUpProfile] = useState(
    !player?.description
  );
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
  const isAllowedToEdit = user?.id && user?.id === id;
  const [hasMadeChanges, setHasMadeChanges] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [profilePicturePublicId, setProfilePicturePublicId] = useState({
    public_id: "",
    version: NaN,
  });

  const updatePlayer = trpc.player.update.useMutation({
    async onSuccess() {
      // Reset location state so that the user can select a new location
      setLocation((state) => ({
        ...state,
        longitude: NaN,
        latitude: NaN,
      }));
      if (setHasNotSetUpProfile) setHasNotSetUpProfile(false);
      alert("Profile updated successfully");
      setHasMadeChanges(false);
    },
  });

  const uploadProfilePicture = trpc.player.uploadProfilePicture.useMutation({});

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
  };

  const onUploadProfilePicture = (e: ChangeEvent<HTMLInputElement>) => {
    // const formData = new FormData();
    if (e?.target?.files?.[0] === undefined) return alert("No file selected");
    const fileSize = e.target.files[0].size;
    const fileSizeInMB = (fileSize / 4000000).toFixed(2);
    if (fileSize > 4000000)
      return alert(
        `This image is roughly ${fileSizeInMB} MB. You can only upload an image < 4 MB.`
      );
    setIsUploading(true);
    let reader = new FileReader();
    console.log({ "File size": e.target.files[0].size });
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = async () => {
      try {
        if (user?.id) {
          const { public_id, version } = await uploadProfilePicture.mutateAsync(
            {
              supabaseId: user?.id,
              //@ts-ignore
              file: reader.result,
            }
          );
          setProfilePicturePublicId({ public_id, version });
        }
      } catch (error) {
        alert(error);
        console.error(error);
      } finally {
        setIsUploading(false);
      }
    };

    reader.onerror = (error) => {
      setIsUploading(false);
      console.error(error);
    };
  };

  if (!isAllowedToEdit)
    return (
      <>
        <Head>
          <title>Sportsmates - Meetups</title>

          <meta name="description" content="Find a sports mate near you" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.page}>
          <Header page="edit" user={user} />
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
        <title>Sportsmates - Edit Player</title>

        <meta name="description" content="Find a sports mate near you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Header page="edit" user={user} />
        <main className={styles.main}>
          <h1 className={styles.title}>Edit your profile</h1>
          {hasNotSetUpProfile && (
            <p className={styles.not_set_up_profile_message}>
              You must set up your profile below before you can message other
              players or attend meetups.
            </p>
          )}

          <ProfilePicture
            canUpload
            onChange={onUploadProfilePicture}
            isUploading={isUploading}
            // publicId={profilePicturePublicId.public_id}
            // version={profilePicturePublicId.version}
            publicId={
              "dev/b780ea0e-4c34-450e-8f41-8b0761786d90-profile-picture"
            }
            version={1685916182}
            height={200}
          />
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
                  value: "Advanced",
                },
                { label: "Intermediate", value: "Intermediate" },
                { label: "Beginner", value: "Beginner" },
              ]}
              defaultValue={player?.skillLevel || ""}
            />
            <SelectField
              name="gender"
              label="Gender"
              options={[
                {
                  label: "Male",
                  value: "Male",
                },
                { label: "Female", value: "Female" },
              ]}
              defaultValue={player?.gender || ""}
            />
            <DatePicker
              label="Birthday (write below or click on the calendar)"
              name="birthday"
              isRequired
              //@ts-ignore
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

  try {
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
        const player = await helpers.player.getPrivateData.fetch({
          supabaseId,
        });

        const serializedPlayer = superjson.serialize(player);

        return {
          props: { player: serializedPlayer.json, user },
        };
      }
    }
  } catch (error) {
    console.log({ error });
    return { props: {} };
  }

  return {
    props: {},
  };
};
