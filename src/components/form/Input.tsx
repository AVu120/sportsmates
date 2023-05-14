import { HTMLInputTypeAttribute } from "react";
import * as Form from "@radix-ui/react-form";

import formStyles from "@/_styles/_forms.module.scss";

interface ComponentProps {
  label: string;
  type: HTMLInputTypeAttribute | "textarea";
  name: string;
  isRequired: boolean;
  valueMissingText?: string;
  customValidation?: any;
  invalidValueText?: string;
  value?: string;
}
export const Input = ({
  label,
  name,
  isRequired,
  valueMissingText,
  customValidation,
  invalidValueText,
  type,
  value,
}: ComponentProps) => (
  <Form.Field className={formStyles.form_field} name={name}>
    <div className={formStyles.form_field_label_container}>
      {label && (
        <Form.Label className={formStyles.form_label}>{label}</Form.Label>
      )}
      {isRequired && (
        <Form.Message
          className={`${formStyles.form_label} ${formStyles.form_message}`}
          match="valueMissing"
        >
          {valueMissingText || "Please enter a value"}
        </Form.Message>
      )}
      {customValidation && (
        <Form.Message
          className={`${formStyles.form_label} ${formStyles.form_message}`}
          match={customValidation}
        >
          {invalidValueText || "Please enter a valid value"}
        </Form.Message>
      )}
    </div>
    <Form.Control asChild>
      {type === "textarea" ? (
        <textarea
          className={formStyles.text_area}
          required={isRequired}
          defaultValue={value}
        />
      ) : (
        <input
          className={formStyles.input}
          type={type}
          required={isRequired}
          defaultValue={value}
        />
      )}
    </Form.Control>
  </Form.Field>
);
