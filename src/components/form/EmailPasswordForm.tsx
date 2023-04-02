import React from "react";
import * as Form from "@radix-ui/react-form";
import formStyles from "@/src/_styles/_forms.module.scss";
import buttonStyles from "@/src/_styles/_buttons.module.scss";
import fontStyles from "@/src/_styles/_fonts.module.scss";
import Link from "next/link";
import { Fields } from "@/src/types/forms";

interface EmailPasswordFormProps {
  title: string;
  onClickSubmitButton: (data: Fields) => void;
  page: "signup" | "login";
}

const EmailPasswordForm = ({
  title,
  onClickSubmitButton,
  page,
}: EmailPasswordFormProps) => (
  <>
    <h1>{title}</h1>
    <Form.Root
      className={formStyles.form_root}
      style={{ marginTop: 10 }}
      // `onSubmit` only triggered if it passes client-side validation
      onSubmit={(event: any) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.currentTarget));
        // @ts-ignore
        onClickSubmitButton(data as Fields);
      }}
    >
      <Form.Field className={formStyles.form_field} name="email">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className={formStyles.form_label}>Email</Form.Label>
          <Form.Message
            className={formStyles.form_message}
            match="valueMissing"
          >
            Please enter your email
          </Form.Message>
          <Form.Message
            className={formStyles.form_message}
            match="typeMismatch"
          >
            Please provide a valid email
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className={formStyles.input} type="email" required />
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
          <Form.Label className={formStyles.form_label}>Password</Form.Label>
          <Form.Message
            className={formStyles.form_message}
            match="valueMissing"
          >
            Please enter your password
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className={formStyles.input} type="password" required />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button
          className={buttonStyles.primary_button}
          style={{ marginTop: 10 }}
        >
          {page === "signup" ? "Sign up" : " Log in"}
        </button>
      </Form.Submit>
    </Form.Root>
    {page === "signup" ? (
      <p style={{ marginTop: 10, textAlign: "start" }}>
        Already have an account?{" "}
        <Link href="/login" className={fontStyles.hyperlink_text}>
          Log in
        </Link>
      </p>
    ) : (
      <p style={{ marginTop: 10, textAlign: "start" }}>
        Don&apos;t have an account?{" "}
        <Link href="/signup" className={fontStyles.hyperlink_text}>
          Sign up
        </Link>
      </p>
    )}
  </>
);

export default EmailPasswordForm;
