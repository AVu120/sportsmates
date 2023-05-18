import { ChangeEventHandler } from "react";
import * as Form from "@radix-ui/react-form";

import formStyles from "@/_styles/_forms.module.scss";

import styles from "./DatePicker.module.scss";

interface ComponentProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  name: string;
  label?: string;
  isRequired?: boolean;
  valueMissingText?: string;
  customValidation?: any;
  invalidValueText?: string;
  defaultValue?: string;
}

export const DatePicker = ({
  onChange,
  value,
  defaultValue,
  name,
  label,
  isRequired,
  valueMissingText,
  customValidation,
  invalidValueText,
}: ComponentProps) => {
  return (
    <Form.Field className={formStyles.form_field} name={name}>
      <div className={formStyles.form_field_label_container}>
        <Form.Label htmlFor={name} className={formStyles.form_label}>
          {label}
        </Form.Label>
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
        <input
          className={styles.input}
          type="date"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={isRequired}
          defaultValue={defaultValue}
        />
      </Form.Control>
    </Form.Field>
  );
};
