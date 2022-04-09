import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SetterOrUpdater } from "recoil";

import {
  defaultHeader,
  IActions,
  JWT_AUTH,
  LAST_LOGIN,
  SERVER_ROOT_URL,
  tokenHeader,
} from "./helpers";
import { IAuthState } from "../store/interfaces";

const useAuth = () => {
  const controller = new AbortController();

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const handleAuth = async (
    values: any,
    actions: IActions,
    setRecoilState: SetterOrUpdater<IAuthState>
  ) => {
    const authToast = toast.loading(actions.pendingMessage);
    const body = JSON.stringify(values);

    try {
      setTimeout(() => {
        controller.abort();
      }, 5000);

      const res = await axios.post(
        `${SERVER_ROOT_URL}${actions.endpoint}`,
        body,
        {
          headers: defaultHeader.headers,
          signal: controller.signal,
          cancelToken: source.token,
        }
      );
      window.localStorage.setItem(JWT_AUTH, res.data.token);
      window.localStorage.setItem(LAST_LOGIN, actions.who || "user");
      toast.update(authToast, {
        render: res.data.message || actions.successMessage || "Success",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      setRecoilState((prev) => ({
        ...prev,
        isAuthenticated: true,
        authType: "user",
        token: res.data.token,
        user: res.data.user,
        who: actions.who || "user",
      }));
    } catch (err: any) {
      window.localStorage.removeItem(JWT_AUTH);
      window.localStorage.removeItem(LAST_LOGIN);
      toast.update(authToast, {
        render:
          err.response?.data?.message || actions.failureMessage || "Error",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      setRecoilState((prev) => ({
        ...prev,
        isAuthenticated: false,
        authType: "",
        token: "",
        who: "user",
        user: {},
      }));
    }
  };

  const handleLogout = (setRecoilState: SetterOrUpdater<IAuthState>) => {
    window.localStorage.removeItem(JWT_AUTH);
    window.localStorage.removeItem(LAST_LOGIN);
    setRecoilState((prev) => ({
      ...prev,
      isAuthenticated: false,
      authType: "",
      token: "",
      who: "user",
      user: {},
    }));
    toast.success("Logged out successfully");
  };

  const getUser = async (setRecoilState: SetterOrUpdater<IAuthState>) => {
    const body = JSON.stringify({});
    try {
      setTimeout(() => {
        controller.abort();
      }, 5000);

      const res = await axios.post(`${SERVER_ROOT_URL}/user`, body, {
        headers: tokenHeader.headers,
        signal: controller.signal,
        cancelToken: source.token,
      });
      setRecoilState((prev) => ({
        ...prev,
        isAuthenticated: true,
        authType: "user",
        token: res.data.token,
        user: res.data.user,
        who: "user",
      }));
    } catch (err: any) {
      setRecoilState((prev) => ({
        ...prev,
        isAuthenticated: false,
        authType: "",
        token: "",
        who: "user",
        user: {},
      }));
    }
  };

  return { handleAuth, handleLogout, getUser };
};

export default useAuth;
