import { useState } from "react";
import {
  ReactGoogleAutocompleteProps,
  usePlacesWidget,
} from "react-google-autocomplete";

interface Props {
  options: ReactGoogleAutocompleteProps["options"];
}

/* Used to connected an input to the google-autocomplete API so that typing 
an address into that input generates google maps auto-suggestions in a dropdown.
Clicking on a suggestion then outputs it's latitude and longitude. */
export const useLocation = ({ options }: Props) => {
  const [location, setLocation] = useState<{ lat: number; long: number }>();

  const onPlaceSelected: ReactGoogleAutocompleteProps["onPlaceSelected"] = (
    places
  ) => {
    const lat = places.geometry.location.lat();
    const long = places.geometry.location.lng();
    setLocation({ lat, long });
  };

  const { ref } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    onPlaceSelected,
    options,
  });

  return { location, ref };
};
