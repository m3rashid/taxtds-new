import { atom } from "recoil";

import { IAuthState, IUserData } from "./interfaces";

export const authState = atom<IAuthState>({
  key: "authState",
  default: {
    isAuthenticated: false,
    authType: "",
    token: "",
    user: {},
  },
});

export const userData = atom<IUserData>({
  key: "userData",
  default: {
    user: {},
  },
});
