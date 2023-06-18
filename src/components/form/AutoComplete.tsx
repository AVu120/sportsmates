import * as React from "react";
import { SyntheticEvent } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import styles from "./AutoComplete.module.scss";

export interface Option {
  title: string;
}

export type OnChangeType = (
  event: SyntheticEvent<Element, Event>,
  newValue: Option | null
) => void;
interface ComponentProps {
  options: Option[];
  label: string;
  onChange: OnChangeType;
  value: Option | null;
}

const AutoCompleteComponent = ({
  options,
  label,
  onChange,
  value,
}: ComponentProps) => {
  return (
    <Autocomplete
      className={styles.input}
      fullWidth
      id="tags-outlined"
      options={options}
      getOptionLabel={(option) => option.title}
      filterSelectedOptions
      onChange={onChange}
      value={value}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default AutoCompleteComponent;
