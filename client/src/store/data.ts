import { atom } from "recoil";

import { IListing, IPagination, IProfession, IService } from "./interfaces";

export const services = atom<IService[]>({
  key: "services",
  default: [],
});

export const professions = atom<IProfession[]>({
  key: "professions",
  default: [],
});

export const listings = atom<IListing[]>({
  key: "listings",
  default: [],
});

export const listingPagination = atom<IPagination>({
  key: "listingPagination",
  default: {} as any,
});

export const userListings = atom<IListing[]>({
  key: "userListings",
  default: [],
});

export const users = atom({
  key: "users",
  default: [],
});
