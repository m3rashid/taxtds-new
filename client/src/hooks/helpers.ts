import { AxiosRequestConfig } from "axios";

export interface IActions {
  endpoint: string;
  pendingMessage?: string;
  successMessage?: string;
  failureMessage?: string;
  role?: "USER" | "ADMIN";
}

export const SERVER_ROOT_URL = "http://localhost:5000";
export const JWT_AUTH = "jwtAuth";
export const LAST_LOGIN = "lastLogin";

export const defaultHeader: AxiosRequestConfig<string> = {
  headers: {
    "Content-type": "application/json",
  },
};

export const tokenHeader: AxiosRequestConfig<string> = {
  headers: {
    ...defaultHeader.headers,
    Authorization: localStorage.getItem(JWT_AUTH) || "",
  },
};

export const cloudinaryInitial =
  "https://res.cloudinary.com/drdo5t5sl/image/upload/";
