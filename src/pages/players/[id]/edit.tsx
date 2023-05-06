import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import Head from "next/head";
import { useRouter } from "next/router";

import buttonStyles from "@/src/_styles/_buttons.module.scss";
import formStyles from "@/src/_styles/_forms.module.scss";
import { DatePicker } from "@/src/components/form/DatePicker";
import { Input } from "@/src/components/form/Input";
import { SelectField } from "@/src/components/form/Select";
import { Header } from "@/src/components/navigation/Header";
import { ProfilePicture } from "@/src/components/profile/Avatar";
import useUser from "@/src/utils/hooks/useUser";

import styles from "./_edit.module.scss";

const EditProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user, isLoggedIn } = useUser();
  // const [gender, setGender] = useState("male");
  // const [skillLevel, setSkillLevel] = useState("beginner");
  // const todaysDate = `${new Date().getFullYear()}-${
  //   new Date().getMonth() + 1 < 10 ? "0" : ""
  // }${new Date().getMonth() + 1}-${
  //   new Date().getDate() < 10 ? "0" : ""
  // }${new Date().getDate()}`;
  // const [birthday, setBirthday] = useState(todaysDate);

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
        <Header page="home" isLoggedIn={isLoggedIn} user={user} />
        {isAllowedToEdit ? (
          <main className={styles.main}>
            <h1 className={styles.title}>Edit your profile</h1>
            <ProfilePicture />
            <Form.Root
              className={`${formStyles.form_root} ${styles.form_root}`}
              onSubmit={(event: any) => {
                event.preventDefault();
                const data = Object.fromEntries(
                  new FormData(event.currentTarget)
                );
                console.log({ ...data });
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
              <Input
                label="City"
                type="text"
                name="city"
                isRequired
                valueMissingText="Please enter your city"
              />
              <Input
                label="Profile Description (what other players will see)"
                type="text"
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
          <main>You are not allowed to edit this profile.</main>
        )}
        <footer>
          <a
            href="https://www.flaticon.com/free-icons/cricket"
            title="cricket icons"
          >
            Cricket icons created by Freepik - Flaticon
          </a>
        </footer>
      </div>
    </>
  );
};

export default EditProfilePage;
