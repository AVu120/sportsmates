import React from "react";
import * as Form from "@radix-ui/react-form";
import Link from "next/link";

import buttonStyles from "@/_styles/_buttons.module.scss";
import fontStyles from "@/_styles/_fonts.module.scss";
import formStyles from "@/_styles/_forms.module.scss";
import { Input } from "@/components/form/Input";
import { EmailPasswordFields } from "@/types/forms";

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
      <Input
        label="Email"
        type="email"
        name="email"
        isRequired
        customValidation="typeMismatch"
        valueMissingText="Please enter your email"
        invalidValueText="Please enter a valid email"
      />
      <Input
        label="Password"
        type="password"
        name="password"
        valueMissingText="Please enter your password"
        isRequired
      />
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
