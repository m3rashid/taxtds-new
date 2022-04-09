import { atom } from "recoil";
import { JWT_AUTH, LAST_LOGIN } from "../hooks/helpers";

import { IAuthState, IUserData } from "./interfaces";

export const authState = atom<IAuthState>({
  key: "authState",
  default: {
    isAuthenticated: false,
    authType: "",
    token: window.localStorage.getItem(JWT_AUTH) || "",
    who:
      (window.localStorage.getItem(LAST_LOGIN) as "admin" | "user") || "user",
    user: {},
  },
});

export const userData = atom<IUserData>({
  key: "userData",
  default: {
    user: {},
  },
});
