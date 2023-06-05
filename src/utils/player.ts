import { months } from "@/utils/constants/dates";

export const formatLastSignInDate = (date: Date | null) => {
  let formattedLastSignInDate: Date | string = date
    ? new Date(date)
    : "Unknown";

  if (
    formattedLastSignInDate !== "Unknown" &&
    typeof formattedLastSignInDate !== "string"
  ) {
    formattedLastSignInDate = `${formattedLastSignInDate.getDate()} ${
      months[formattedLastSignInDate.getMonth()]
    } ${formattedLastSignInDate.getFullYear()}`;
  }

  return formattedLastSignInDate;
};

export const getInitials = (firstName: string, lastName: string) =>
  `${firstName?.[0]}${lastName?.[0]}`.toUpperCase();
