import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SetterOrUpdater } from "recoil";

import {
  defaultHeader,
  formatResponseMessage,
  IActions,
  JWT_AUTH,
  LAST_LOGIN,
  SERVER_ROOT_URL,
  tokenHeader,
} from "./helpers";
import { IAuthState } from "../store/interfaces";

const useAuth = () => {
  const handleAuth = async (
    values: any,
    actions: IActions,
    setRecoilState: SetterOrUpdater<IAuthState>
  ) => {
    const authToast = toast.loading(actions.pendingMessage);
    const body = JSON.stringify(values);

    try {
      const res = await axios.post(
        SERVER_ROOT_URL + actions.endpoint,
        body,
        defaultHeader
      );
      window.localStorage.setItem(JWT_AUTH, res.data.token);
      window.localStorage.setItem(
        LAST_LOGIN,
        actions.role || res.data.user.role || "USER"
      );
      toast.update(authToast, {
        render:
          formatResponseMessage(res.data.message)
          || formatResponseMessage(actions.successMessage)
          || "Success",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      setRecoilState((prev) => ({
        ...prev,
        isAuthenticated: true,
        token: res.data.token,
        user: res.data.user,
        role: actions.role || res.data.user.role || "USER",
      }));
    } catch (err: any) {
      window.localStorage.removeItem(JWT_AUTH);
      window.localStorage.removeItem(LAST_LOGIN);
      toast.update(authToast, {
        render:
          formatResponseMessage(err.response?.data?.message)
          || formatResponseMessage(actions.failureMessage)
          || "Error",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      setRecoilState((prev) => ({
        ...prev,
        isAuthenticated: false,
        token: "",
        role: "USER",
        user: {},
      }));
    }
  };

  const handleRegister = async (values: any, actions: IActions) => {
    const authToast = toast.loading(actions.pendingMessage);
    const body = JSON.stringify(values);
    try {
      const res = await axios.post(
        SERVER_ROOT_URL + actions.endpoint,
        body,
        defaultHeader
      );
      toast.update(authToast, {
        render:
          formatResponseMessage(res.data.message)
          ||  formatResponseMessage(actions.successMessage)
          || "Success",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (err: any) {
      toast.update(authToast, {
        render:
          formatResponseMessage(err.response?.data?.message)
          ||  formatResponseMessage(actions.failureMessage)
          || "Error",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const handleLogout = (setRecoilState: SetterOrUpdater<IAuthState>) => {
    window.localStorage.removeItem(JWT_AUTH);
    window.localStorage.removeItem(LAST_LOGIN);
    setRecoilState((prev) => ({
      ...prev,
      isAuthenticated: false,
      token: "",
      role: "USER",
      user: {},
    }));
    toast.success("Logged out successfully");
  };

  const getUser = async (setRecoilState: SetterOrUpdater<IAuthState>) => {
    const body = JSON.stringify({});
    try {
      const res = await axios.post(`${SERVER_ROOT_URL}/user`, body, {
        headers: tokenHeader.headers,
      });
      setRecoilState((prev) => ({
        ...prev,
        isAuthenticated: true,
        token: res.data.token,
        user: res.data.user,
        role: res.data.user.role || "USER",
      }));
    } catch (err: any) {
      setRecoilState((prev) => ({
        ...prev,
        isAuthenticated: false,
        token: "",
        role: "USER",
        user: {},
      }));
    }
  };

  return {
    handleAuth,
    handleRegister,
    handleLogout,
    getUser,
  };
};

export default useAuth;
