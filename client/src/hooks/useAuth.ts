import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SetterOrUpdater } from "recoil";

import { defaultHeader, IActions, SERVER_ROOT_URL } from "./helpers";
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
        `${SERVER_ROOT_URL}${actions.endpoint}`,
        body,
        defaultHeader
      );
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
      }));
    } catch (err: any) {
      toast.update(authToast, {
        render: err.response.data.message || actions.failureMessage || "Error",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      setRecoilState((prev) => ({
        ...prev,
        isAuthenticated: false,
        authType: "",
        token: "",
        user: {},
      }));
    }
  };

  return { handleAuth };
};

export default useAuth;
