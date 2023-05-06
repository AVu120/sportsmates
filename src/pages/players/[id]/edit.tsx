import * as Form from "@radix-ui/react-form";
import Head from "next/head";
import { useRouter } from "next/router";

import buttonStyles from "@/src/_styles/_buttons.module.scss";
import formStyles from "@/src/_styles/_forms.module.scss";
import { Header } from "@/src/components/navigation/Header";
import { ProfilePicture } from "@/src/components/profile/Avatar";
import useUser from "@/src/utils/hooks/useUser";

import styles from "./_edit.module.scss";

const EditPlayer = () => {
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
                console.log({ data });
              }}
            >
              <Form.Field className={formStyles.form_field} name="email">
                <div className={formStyles.form_field_label_container}>
                  <Form.Label className={formStyles.form_label}>
                    Email
                  </Form.Label>
                  <Form.Message
                    className={formStyles.form_message}
                    match="valueMissing"
                  >
                    Please enter your email
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input className={formStyles.input} type="" required />
                </Form.Control>
              </Form.Field>
              <Form.Field className={formStyles.form_field} name="password">
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Label className={formStyles.form_label}>
                    Password
                  </Form.Label>
                  <Form.Message
                    className={formStyles.form_message}
                    match="valueMissing"
                  >
                    Please enter your password
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    className={formStyles.input}
                    type="password"
                    required
                  />
                </Form.Control>
              </Form.Field>
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

export default EditPlayer;
