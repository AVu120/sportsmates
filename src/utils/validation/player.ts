import { z } from "zod";

import {
  ANY_DISTANCE_FROM_YOU,
  ANY_GENDER,
  ANY_SPORT,
  CLOSEST_TO_ME,
  genderOptions,
  MOST_RECENTLY_ACTIVE,
  OLDEST_TO_YOUNGEST,
  searchRadiusOptions,
  sortByOptions,
  sportOptions,
  YOUNGEST_TO_OLDEST,
} from "@/utils/constants/player";

export const listPlayersBodyValidation = z.object({
  longitude: z.number().min(-180).max(180).optional(),
  latitude: z.number().min(-180).max(180).optional(),
  // Search range in meters.
  searchRadius: z
    .string()
    .refine(
      (data) => searchRadiusOptions.map(({ value }) => value).includes(data),
      "Not a valid value"
    ),
  gender: z
    .string()
    .refine(
      (data) => genderOptions.map(({ value }) => value).includes(data),
      "Not a valid value"
    ),
  sortBy: z
    .string()
    .refine(
      (data) => sortByOptions.map(({ value }) => value).includes(data),
      "Not a valid value"
    ),
  sport: z
    .string()
    .refine(
      (data) => sportOptions.map(({ value }) => value).includes(data),
      "Not a valid value"
    ),
  offset: z.number().min(0).optional(),
  limit: z.number().min(10).optional(),
});

export const listPlayersBodyAPIValidation = z.object({
  // longitude: z.custom((data) => {
  //   if (isNaN(data as any)) return false;
  //   const num = Number(data);
  //   return num >= -180 && num <= 180;
  // }),
  // latitude: z.custom((data) => {
  //   if (isNaN(data as any)) return false;
  //   const num = Number(data);
  //   return num >= -180 && num <= 180;
  // }),
  // Search range in meters.
  searchRadius: z
    .string()
    .refine(
      (data) => searchRadiusOptions.map(({ value }) => value).includes(data),
      "Not a valid value"
    ),
  gender: z
    .string()
    .refine(
      (data) => genderOptions.map(({ value }) => value).includes(data),
      "Not a valid value"
    ),
  sortBy: z
    .string()
    .refine(
      (data) => sortByOptions.map(({ value }) => value).includes(data),
      "Not a valid value"
    ),
  sport: z
    .string()
    .refine(
      (data) => sportOptions.map(({ value }) => value).includes(data),
      "Not a valid value"
    ),
  // offset: z
  //   .custom((data) => {
  //     console.log({ data });
  //     const num = Number(data);
  //     return num > 0;
  //   })
  //   .optional(),
  // limit: z
  //   .custom((data) => {
  //     console.log({ data });
  //     const num = Number(data);
  //     return num > 0;
  //   })
  //   .optional(),
});
