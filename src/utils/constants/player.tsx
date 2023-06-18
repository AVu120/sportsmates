// Filtering constants
export const MOST_RECENTLY_ACTIVE = "Most recently active";
export const OLDEST_TO_YOUNGEST = "Oldest to youngest";
export const YOUNGEST_TO_OLDEST = "Youngest to oldest";
export const CLOSEST_TO_ME = "Closest to me";
export const ANY_DISTANCE_FROM_YOU = "Any distance from you";
export const ANY_GENDER = "Any gender";
export const TEN = "10";
export const TWENTY = "20";
export const THIRTY = "30";
export const FORTY = "40";
export const FIFTY = "50";

export const searchRadiusOptions = [
  { label: "Any distance from you", value: ANY_DISTANCE_FROM_YOU },
  { label: "Within 10km", value: TEN },
  { label: "Within 20km", value: TWENTY },
  { label: "Within 30km", value: THIRTY },
  { label: "Within 40km", value: FORTY },
  { label: "Within 50km", value: FIFTY },
];

export const genderOptions = [
  { label: "Any gender", value: ANY_GENDER },
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];

export const sortByOptions = [
  { label: MOST_RECENTLY_ACTIVE, value: MOST_RECENTLY_ACTIVE },
  { label: OLDEST_TO_YOUNGEST, value: OLDEST_TO_YOUNGEST },
  { label: YOUNGEST_TO_OLDEST, value: YOUNGEST_TO_OLDEST },
  { label: CLOSEST_TO_ME, value: CLOSEST_TO_ME },
];

export const SPORT_OPTIONS = [
  { title: "Cricket" },
  { title: "Tennis" },
  { title: "Basketball" },
  { title: "Soccer" },
  { title: "Volleyball" },
  { title: "Cycling" },
  { title: "Running" },
];
