import { NumberLiteralType } from "typescript";

export interface EmailPasswordFields {
  email: string;
  password: string;
}

export interface FilterFields {
  longitude: number;
  latitude: number;
  // Range in meters
  searchRadius: number;
  gender: string;
  sortBy: string;
}
