import React from "react";
import * as Form from "@radix-ui/react-form";
import styles from "./SignupForm.module.scss";
import fontStyles from "../_styles/_fonts.module.scss";
import Link from "next/link";

const FormDemo = () => (
  <>
    <h1>Create an account</h1>
    <Form.Root className={styles.form_root}>
      <Form.Field className={styles.form_field} name="email">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className={styles.form_label}>Email</Form.Label>
          <Form.Message className={styles.form_message} match="valueMissing">
            Please enter your email
          </Form.Message>
          <Form.Message className={styles.form_message} match="typeMismatch">
            Please provide a valid email
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className={styles.input} type="email" required />
        </Form.Control>
      </Form.Field>
      <Form.Field className={styles.form_field} name="password">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className={styles.form_label}>Password</Form.Label>
          <Form.Message className={styles.form_message} match="valueMissing">
            Please enter your password
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className={styles.input} type="password" required />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button className={styles.button} style={{ marginTop: 10 }}>
          Sign Up
        </button>
      </Form.Submit>
    </Form.Root>
    <p style={{ marginTop: 10, textAlign: "start" }}>
      Already have an account?{" "}
      <Link href="/login" className={fontStyles.hyperlink_text}>
        Log in
      </Link>
    </p>
  </>
);

export default FormDemo;
