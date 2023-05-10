import {
  ReactGoogleAutocompleteProps,
  usePlacesWidget,
} from "react-google-autocomplete";
import * as Form from "@radix-ui/react-form";

import formStyles from "@/_styles/_forms.module.scss";

interface ComponentProps {
  onSelect: (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  options: ReactGoogleAutocompleteProps["options"];
  label?: string;
  placeholderText?: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PlacesAutoComplete = ({
  onSelect,
  options,
  label,
  placeholderText,
  name,
  value,
  onChange,
}: ComponentProps) => {
  const onPlaceSelected: ReactGoogleAutocompleteProps["onPlaceSelected"] = (
    places
  ) => {
    console.log({ places });
    const latitude = places?.geometry?.location?.lat();
    const longitude = places?.geometry?.location?.lng();
    onSelect({ latitude, longitude, address: places?.formatted_address });
  };

  const { ref } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    onPlaceSelected,
    options,
  });

  return (
    <Form.Field className={formStyles.form_field} name={name}>
      {label && (
        <div className={formStyles.form_field_label_container}>
          <Form.Label className={formStyles.form_label}>{label}</Form.Label>
        </div>
      )}
      <Form.Control asChild>
        <input
          className={formStyles.input}
          type="text"
          placeholder={placeholderText || "Enter your location"}
          //@ts-ignore
          ref={ref}
          value={value}
          onChange={onChange}
          onKeyDown={(e) => {
            // console.log({ e });
            if (e.keyCode === 13) {
              // e.stopPropagation();
              e.preventDefault();
              // console.log("FIRE");
            }
          }}
        />
      </Form.Control>
    </Form.Field>
  );
};
