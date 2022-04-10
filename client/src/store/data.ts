import { atom } from "recoil";

import { IProfession, IService } from "./interfaces";

export const services = atom<IService[]>({
  key: "services",
  default: [],
});

export const professions = atom<IProfession[]>({
  key: "professions",
  default: [],
});

export const listings = atom({
  key: "listings",
  default: [],
});

export const users = atom({
  key: "users",
  default: [],
});
