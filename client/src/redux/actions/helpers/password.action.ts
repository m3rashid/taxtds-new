import axios from "axios";
import { toast } from "react-toastify";

import {
  ResetPasswordTypeOne,
  ResetPasswordTypeTwo,
} from "../../constants/types";
import { userLoading } from "../auth.action";
import { configContentType } from "../../constants/config";
import {
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  SERVER_ROOT_URL,
} from "../../constants";
import { returnErrors } from "../error.action";

export const forgotPassword =
  ({ email, password }: ResetPasswordTypeOne) =>
  (dispatch: Function) => {
    dispatch(userLoading());
    const body = JSON.stringify({ email, password });
    axios
      .post(`${SERVER_ROOT_URL}/user/forgot-password`, body, configContentType)
      .then((res) => {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
        });
        toast.success("Email sent with OTP");
      })
      .catch((err: any) => {
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            FORGOT_PASSWORD_FAIL
          )
        );
        toast.error("Forgot Password Failed");
      });
  };

export const resetPassword =
  ({ email, password, otp, confirmPassword }: ResetPasswordTypeTwo) =>
  (dispatch: Function) => {
    dispatch(userLoading());
    const body = JSON.stringify({ email, password, otp, confirmPassword });
    axios
      .post(`${SERVER_ROOT_URL}/user/reset-password`, body, configContentType)
      .then((res) => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
        toast.success("Password Reset Successful");
      })
      .catch((err: any) => {
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            RESET_PASSWORD_FAIL
          )
        );
        toast.error("Reset Password Failed");
      });
  };
