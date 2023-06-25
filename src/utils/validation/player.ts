import { z } from "zod";

import {
  genderOptions,
  searchRadiusOptions,
  sortByOptions,
  sportOptions,
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
});

export const listPlayersBodyAPIValidation = z.object({
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
});
