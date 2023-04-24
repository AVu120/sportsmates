import React from "react";
import * as Form from "@radix-ui/react-form";

import buttonStyles from "@/src/_styles/_buttons.module.scss";
import formStyles from "@/src/_styles/_forms.module.scss";
import { FilterFields } from "@/src/types/forms";

import styles from "./Filters.module.scss";

interface ComponentProps {
  onClickSubmitButton: (data: FilterFields) => void;
}

export const Filters = ({ onClickSubmitButton }: ComponentProps) => (
  <div className={`${formStyles.form_border} ${styles.form_border}`}>
    <Form.Root
      className={`${formStyles.form_root} ${styles.form_root}`}
      style={{ marginTop: 10 }}
      // `onSubmit` only triggered if it passes client-side validation
      onSubmit={(event: any) => {
        console.log("HI");
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.currentTarget));
        console.log({ data });
        // @ts-ignore
        onClickSubmitButton(data as FilterFields);
      }}
    >
      <Form.Field className={formStyles.form_field} name="location">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className={formStyles.form_label}>
            Enter your location
          </Form.Label>
        </div>
        <Form.Control asChild>
          <input className={formStyles.input} type="text" />
        </Form.Control>
      </Form.Field>

      <Form.Submit asChild>
        <button
          className={buttonStyles.primary_button}
          style={{ marginTop: 10 }}
        >
          Search
        </button>
      </Form.Submit>
    </Form.Root>
  </div>
);
