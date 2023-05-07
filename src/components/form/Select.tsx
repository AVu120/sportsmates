import React, { Dispatch, SetStateAction, useState } from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";

import formStyles from "@/_styles/_forms.module.scss";

import styles from "./Select.module.scss";

interface ComponentProps {
  options: { value: string; label: string }[];
  label?: string;
  name: string;
}

export const SelectField = ({ options, label, name }: ComponentProps) => {
  return (
    <Select.Root name={name} defaultValue={options[0].value}>
      {label && <p className={formStyles.form_label}>{label}</p>}
      <Select.Trigger
        className={styles.SelectTrigger}
        aria-label="select-field-trigger"
      >
        <Select.Value />
        <Select.Icon className={styles.SelectIcon}>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={styles.SelectContent}>
          <Select.ScrollUpButton className={styles.SelectScrollButton}>
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className={styles.SelectViewport}>
            <Select.Group>
              {options?.map(({ value, label }) => (
                //@ts-ignore
                <SelectItem
                  value={value}
                  className={styles.SelectItem}
                  key={value}
                >
                  {label}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className={styles.SelectScrollButton}>
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

// eslint-disable-next-line react/display-name
const SelectItem = React.forwardRef(
  //@ts-ignore
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classnames("SelectItem", className)}
        {...props}
        //@ts-ignore
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className={styles.SelectItemIndicator}>
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);
