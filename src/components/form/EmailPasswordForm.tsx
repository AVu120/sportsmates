import React from "react";
import * as Form from "@radix-ui/react-form";
import Link from "next/link";

import buttonStyles from "@/src/_styles/_buttons.module.scss";
import fontStyles from "@/src/_styles/_fonts.module.scss";
import formStyles from "@/src/_styles/_forms.module.scss";
import { EmailPasswordFields } from "@/src/types/forms";

interface ComponentProps {
  title: string;
  onClickSubmitButton: (data: EmailPasswordFields) => void;
  page: "signup" | "login";
}

export const EmailPasswordForm = ({
  title,
  onClickSubmitButton,
  page,
}: ComponentProps) => (
  <div className={formStyles.form_border}>
    <h1>{title}</h1>
    <Form.Root
      className={formStyles.form_root}
      style={{ marginTop: 10 }}
      // `onSubmit` only triggered if it passes client-side validation
      onSubmit={(event: any) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.currentTarget));
        // @ts-ignore
        onClickSubmitButton(data as EmailPasswordFields);
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
  </div>
);
