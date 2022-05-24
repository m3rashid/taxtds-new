import { atom } from "recoil";
import { IAuthState, IUserData } from "./interfaces";
import { JWT_AUTH, LAST_LOGIN } from "../hooks/helpers";

export const authState = atom<IAuthState>({
  key: "authState",
  default: {
    isAuthenticated: false,
    token: window.localStorage.getItem(JWT_AUTH) || "",
    role:
      (window.localStorage.getItem(LAST_LOGIN) as "ADMIN" | "USER") || "USER",
    user: {},
  },
});

export const userData = atom<IUserData>({
  key: "userData",
  default: {
    user: {},
  },
});
