import {
  ReactGoogleAutocompleteProps,
  usePlacesWidget,
} from "react-google-autocomplete";
import * as Form from "@radix-ui/react-form";

import formStyles from "@/_styles/_forms.module.scss";

interface ComponentProps {
  onSelect: (location: { latitude: number; longitude: number }) => void;
  options: ReactGoogleAutocompleteProps["options"];
  label?: string;
  placeholderText?: string;
  name: string;
}

export const PlacesAutoComplete = ({
  onSelect,
  options,
  label,
  placeholderText,
  name,
}: ComponentProps) => {
  const onPlaceSelected: ReactGoogleAutocompleteProps["onPlaceSelected"] = (
    places
  ) => {
    const latitude = places.geometry.location.latitude();
    const longitude = places.geometry.location.lng();
    onSelect({ latitude, longitude });
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
        />
      </Form.Control>
    </Form.Field>
  );
};
