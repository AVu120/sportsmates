import React, { useState } from "react";
import AutoComplete, { usePlacesWidget } from "react-google-autocomplete";
import * as Form from "@radix-ui/react-form";

import buttonStyles from "@/src/_styles/_buttons.module.scss";
import formStyles from "@/src/_styles/_forms.module.scss";
import { SelectField } from "@/src/components/form/Select";
import { FilterFields } from "@/src/types/forms";

import styles from "./PlayersFiltersForm.module.scss";

interface ComponentProps {
  onClickSubmitButton: (data: FilterFields) => void;
}

//@ts-ignore
const PlayersFiltersForm = ({ onClickSubmitButton }: ComponentProps) => {
  const [searchRadius, setSearchRadius] = useState<string>(
    "Any distance from you"
  );
  const [gender, setGender] = useState<string>("Any gender");
  const [sortBy, setSortBy] = useState<string>("Most recently active");

  const { ref } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: (place) => console.log(place),
  });

  return (
    <div className={`${formStyles.form_border} ${styles.form_border}`}>
      <Form.Root
        className={`${formStyles.form_root} ${styles.form_root}`}
        style={{ marginTop: 10 }}
        // `onSubmit` only triggered if it passes client-side validation
        onSubmit={(event: any) => {
          event.preventDefault();
          const locationData = Object.fromEntries(
            new FormData(event.currentTarget)
          );
          const formData = { ...locationData, searchRadius, gender, sortBy };
          console.log("submitted", { formData });
          // @ts-ignore
          // onClickSubmitButton(data as FilterFields);
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
            <Form.Label className={formStyles.form_label}>Filters</Form.Label>
          </div>
          <Form.Control asChild>
            <input
              className={formStyles.input}
              type="text"
              placeholder="Enter your location"
              //@ts-ignore
              ref={ref}
            />
          </Form.Control>
        </Form.Field>
        {/* Search Radius Dropdown */}
        {/* <AutoComplete
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
          onPlaceSelected={(place) => console.log(place)}
        /> */}
        <SelectField
          setValue={setSearchRadius}
          value={searchRadius}
          options={[
            { label: "Any distance from you", value: "Any distance from you" },
            { label: "Within 10km", value: "10" },
            { label: "Within 10km", value: "10" },
            { label: "Within 20km", value: "20" },
            { label: "Within 30km", value: "30" },
            { label: "Within 40km", value: "40" },
            { label: "Within 50km", value: "50" },
          ]}
        />
        {/* Gender Dropdown */}
        <SelectField
          setValue={setGender}
          value={gender}
          options={[
            { label: "Any gender", value: "Any gender" },
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
          ]}
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
        />

        <Form.Submit asChild>
          <button
            className={buttonStyles.primary_button}
            style={{ marginTop: 10 }}
          >
            Apply filters
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
};

export default PlayersFiltersForm;
