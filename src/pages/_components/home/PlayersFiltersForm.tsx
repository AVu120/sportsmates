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
  const [typedAddress, setTypedAddress] = useState("");
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    address: string | null;
  }>({
    latitude: NaN,
    longitude: NaN,
    address: null,
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

          if (
            typedAddress !== location.address &&
            !(location.latitude && location.longitude)
          ) {
            return alert("Please select your location from the dropdown menu");
          }
          const data = { ...formData, ...location };
          console.log({ data });
          // @ts-ignore
          onClickApplyButton(data as FilterFields);
        }}
      >
        <PlacesAutoComplete
          name="location"
          onSelect={({ latitude, longitude, address }) => {
            setLocation({ latitude, longitude, address });
            setTypedAddress(address);
          }}
          options={{
            types: "(cities)",
            componentRestrictions: { country: "au" },
          }}
          label="Filters"
          onChange={(e) => {
            setTypedAddress(e.target.value);
            if (!isNaN(location.longitude)) {
              setLocation((state) => ({
                ...state,
                longitude: NaN,
                latitude: NaN,
              }));
            }
          }}
        />
        <SelectField name="searchRadius" options={searchRadiusOptions} />
        <SelectField name="gender" options={genderOptions} />
        <SelectField
          name="sortBy"
          label="Sort by"
          options={sortByOptions}
          labelStyle={{ position: "relative", top: 10 }}
        />

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
