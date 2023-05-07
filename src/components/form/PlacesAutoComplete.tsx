import {
  ReactGoogleAutocompleteProps,
  usePlacesWidget,
} from "react-google-autocomplete";
import * as Form from "@radix-ui/react-form";

import formStyles from "@/_styles/_forms.module.scss";

interface ComponentProps {
  onSelect: (location: { lat: number; long: number }) => void;
  options: ReactGoogleAutocompleteProps["options"];
  label?: string;
  placeholderText?: string;
}

export const PlacesAutoComplete = ({
  onSelect,
  options,
  label,
  placeholderText,
}: ComponentProps) => {
  const onPlaceSelected: ReactGoogleAutocompleteProps["onPlaceSelected"] = (
    places
  ) => {
    const lat = places.geometry.location.lat();
    const long = places.geometry.location.lng();
    onSelect({ lat, long });
  };

  const { ref } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    onPlaceSelected,
    options,
  });

  return (
    <Form.Field className={formStyles.form_field} name="location">
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
