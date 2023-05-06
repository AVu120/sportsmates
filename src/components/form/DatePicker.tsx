import { ChangeEventHandler } from "react";

import formStyles from "@/src/_styles/_forms.module.scss";

import styles from "./DatePicker.module.scss";

interface ComponentProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  name: string;
  label?: string;
}

export const DatePicker = ({
  onChange,
  value,
  name,
  label,
}: ComponentProps) => {
  return (
    <>
      {label && (
        <label
          className={`${formStyles.form_label} ${styles.label}`}
          htmlFor={name}
        >
          {label}
        </label>
      )}

      <input
        className={styles.input}
        type="date"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      ></input>
    </>
  );
};
