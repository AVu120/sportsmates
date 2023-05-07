import { useState } from "react";
import * as Form from "@radix-ui/react-form";

import buttonStyles from "@/src/_styles/_buttons.module.scss";
import formStyles from "@/src/_styles/_forms.module.scss";
import { PlacesAutoComplete } from "@/src/components/form/PlacesAutoComplete";
import { SelectField } from "@/src/components/form/Select";
import { FilterFields } from "@/src/types/forms";

import styles from "./PlayersFiltersForm.module.scss";

interface ComponentProps {
  onClickSubmitButton: (data: FilterFields) => void;
}

//@ts-ignore
const PlayersFiltersForm = ({ onClickSubmitButton }: ComponentProps) => {
  const [location, setLocation] = useState<{
    lat: number | undefined;
    long: number | undefined;
  }>({
    lat: undefined,
    long: undefined,
  });

  return (
    <div className={`${formStyles.form_border} ${styles.form_border}`}>
      <Form.Root
        className={`${formStyles.form_root} ${styles.form_root}`}
        style={{ marginTop: 10 }}
        // `onSubmit` only triggered if it passes client-side validation
        onSubmit={(event: any) => {
          event.preventDefault();
          /* Not needed yet */
          const formData = Object.fromEntries(
            new FormData(event.currentTarget)
          );

          if (location.lat && location.long) {
            const filterData = { ...location, ...formData };
            console.log("submitted", { filterData });
            // @ts-ignore
            // onClickSubmitButton(data as FilterFields);
          } else alert("Please select your location");
        }}
      >
        <PlacesAutoComplete
          onSelect={setLocation}
          options={{
            types: "(cities)",
            componentRestrictions: { country: "au" },
          }}
          label="Filters"
        />
        <SelectField
          name="searchRadius"
          options={[
            { label: "Any distance from you", value: "Any distance from you" },
            { label: "Within 10km", value: "10" },
            { label: "Within 20km", value: "20" },
            { label: "Within 30km", value: "30" },
            { label: "Within 40km", value: "40" },
            { label: "Within 50km", value: "50" },
          ]}
        />
        <SelectField
          name="gender"
          options={[
            { label: "Any gender", value: "Any gender" },
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
          ]}
        />
        <SelectField
          name="sortBy"
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
