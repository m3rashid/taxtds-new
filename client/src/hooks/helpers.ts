import { AxiosRequestConfig } from "axios";

export const defaultHeader: AxiosRequestConfig<string> = {
  headers: {
    "Content-type": "application/json",
  },
};

export const tokenHeader: AxiosRequestConfig<string> = {
  headers: {
    ...defaultHeader.headers,
    Authorization: localStorage.getItem("token") || false,
  },
};

export interface IActions {
  endpoint: string;
  pendingMessage?: string;
  successMessage?: string;
  failureMessage?: string;
}

export const hasToken = () => {
  const token = localStorage.getItem("token");
  return token ? true : false;
};

export const SERVER_ROOT_URL = "http://localhost:5000";
