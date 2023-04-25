import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";

import buttonStyles from "@/src/_styles/_buttons.module.scss";
import formStyles from "@/src/_styles/_forms.module.scss";
import { SelectField } from "@/src/components/form/Select";
import { FilterFields } from "@/src/types/forms";

import styles from "./FiltersForm.module.scss";

interface ComponentProps {
  onClickSubmitButton: (data: FilterFields) => void;
}

export const Filters = ({ onClickSubmitButton }: ComponentProps) => {
  const [searchRadius, setSearchRadius] = useState<string | undefined>();
  const [gender, setGender] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<string | undefined>();
  return (
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
              Find players nearby
            </Form.Label>
          </div>
          <Form.Control asChild>
            <input
              className={formStyles.input}
              type="text"
              placeholder="Enter your location"
            />
          </Form.Control>
        </Form.Field>
        {/* Search Radius Dropdown */}
        <SelectField
          setValue={setSearchRadius}
          value={searchRadius}
          options={[
            { label: "Within 10km", value: "10" },
            { label: "Within 20km", value: "20" },
            { label: "Within 30km", value: "30" },
            { label: "Within 40km", value: "40" },
            { label: "Within 50km", value: "50" },
          ]}
          placeholderText="Select a search radius"
        />
        {/* Gender Dropdown */}
        <SelectField
          setValue={setGender}
          value={gender}
          options={[
            { label: "", value: "" },
            { label: "male", value: "male" },
            { label: "female", value: "female" },
          ]}
          placeholderText="Select a gender"
        />
        {/* SortBy Dropdown */}
        <SelectField
          setValue={setSortBy}
          value={sortBy}
          options={[
            { label: "Most recently active", value: "Most recently active" },
            { label: "Oldest to youngest", value: "Oldest to youngest" },
            { label: "Youngest to oldest", value: "Youngest to oldest" },
            { label: "Closest to me", value: "Closest to me" },
          ]}
          placeholderText="Sort by"
        />

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
};
