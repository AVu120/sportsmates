import { HTMLInputTypeAttribute } from "react";
import * as Form from "@radix-ui/react-form";

import formStyles from "@/src/_styles/_forms.module.scss";

interface ComponentProps {
  label: string;
  type: HTMLInputTypeAttribute;
  name: string;
  isRequired: boolean;
  valueMissingText?: string;
  customValidation?: any;
  invalidValueText?: string;
}
export const Input = ({
  label,
  name,
  isRequired,
  valueMissingText,
  customValidation,
  invalidValueText,
  type,
}: ComponentProps) => (
  <Form.Field className={formStyles.form_field} name={name}>
    <div className={formStyles.form_field_label_container}>
      <Form.Label className={formStyles.form_label}>{label}</Form.Label>
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
          className={formStyles.form_message}
          match={customValidation}
        >
          {invalidValueText || "Please enter a valid value"}
        </Form.Message>
      )}
    </div>
    <Form.Control asChild>
      <input className={formStyles.input} type={type} required={isRequired} />
    </Form.Control>
  </Form.Field>
);
