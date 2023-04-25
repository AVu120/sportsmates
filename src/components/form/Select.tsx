import React, { Dispatch, SetStateAction, useState } from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";

import styles from "./Select.module.scss";

interface ComponentProps {
  value: string | undefined;
  setValue: (value: string | undefined) => void;
  options: { value: string; label: string }[];
  placeholderText: string;
}

export const SelectField = ({
  value,
  setValue,
  options,
  placeholderText,
}: ComponentProps) => {
  return (
    <Select.Root onValueChange={setValue} value={value || ""}>
      <Select.Trigger className={styles.SelectTrigger} aria-label="Food">
        <Select.Value
          placeholder={placeholderText}
          style={{ fontSize: "1rem" }}
        >
          {options.find((option) => option.value === value)?.label}
        </Select.Value>
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
                  key={label}
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
          {/* <CheckIcon /> */}
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);
