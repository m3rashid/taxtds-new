import { atom } from "recoil";

export const authState = atom({
  key: "authState",
  default: {
    isAuthenticated: false,
    authType: "",
    loading: false,
    error: null,
  },
});

export const user = atom({
  key: "user",
  default: {},
});
