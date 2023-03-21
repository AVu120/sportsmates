import React from "react";
import * as Form from "@radix-ui/react-form";
import styles from "./SignupForm.module.scss";

const FormDemo = () => (
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
    <Form.Field className={styles.form_field} name="question">
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <Form.Label className={styles.form_label}>Question</Form.Label>
        <Form.Message className={styles.form_message} match="valueMissing">
          Please enter a question
        </Form.Message>
      </div>
      <Form.Control asChild>
        <textarea className={styles.text_area} required />
      </Form.Control>
    </Form.Field>
    <Form.Submit asChild>
      <button className={styles.button} style={{ marginTop: 10 }}>
        Post question
      </button>
    </Form.Submit>
  </Form.Root>
);

export default FormDemo;
