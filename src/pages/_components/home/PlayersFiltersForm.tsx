import { useState } from "react";
import * as Form from "@radix-ui/react-form";

import buttonStyles from "@/_styles/_buttons.module.scss";
import formStyles from "@/_styles/_forms.module.scss";
import { PlacesAutoComplete } from "@/components/form/PlacesAutoComplete";
import { SelectField } from "@/components/form/Select";
import { genderOptions, searchRadiusOptions, sortByOptions } from "@/pages";
import { FilterFields } from "@/types/forms";

import styles from "./PlayersFiltersForm.module.scss";

interface ComponentProps {
  onClickApplyButton: (data: FilterFields) => void;
}

//@ts-ignore
const PlayersFiltersForm = ({ onClickApplyButton }: ComponentProps) => {
  const [location, setLocation] = useState<{
    latitude: number | undefined;
    longitude: number | undefined;
  }>({
    latitude: undefined,
    longitude: undefined,
  });

  return (
    <div className={`${formStyles.form_border} ${styles.form_border}`}>
      <Form.Root
        className={`${formStyles.form_root} ${styles.form_root}`}
        style={{ marginTop: 10 }}
        onSubmit={(event: any) => {
          event.preventDefault();
          const formData = Object.fromEntries(
            new FormData(event.currentTarget)
          );

          if (location.latitude && location.longitude) {
            const { longitude, latitude } = location;
            const data = { ...formData, longitude, latitude };
            // @ts-ignore
            onClickApplyButton(data as FilterFields);
          } else alert("Please select your location");
        }}
      >
        <PlacesAutoComplete
          name="location"
          onSelect={setLocation}
          options={{
            types: "(cities)",
            componentRestrictions: { country: "au" },
          }}
          label="Filters"
        />
        <SelectField name="searchRadius" options={searchRadiusOptions} />
        <SelectField name="gender" options={genderOptions} />
        <SelectField name="sortBy" label="Sort by" options={sortByOptions} />

        <Form.Submit asChild>
          <button
            className={buttonStyles.primary_button}
            style={{ marginTop: 10 }}
          >
            Apply
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
};

export default PlayersFiltersForm;
