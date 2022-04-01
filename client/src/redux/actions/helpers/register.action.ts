import axios from "axios";
import { toast } from "react-toastify";

import {
  REGISTER_ONE_SUCCESS,
  REGISTER_ONE_FAIL,
  REGISTER_TWO_SUCCESS,
  REGISTER_TWO_FAIL,
  SERVER_ROOT_URL,
  CLEAR_ERRORS,
} from "../../constants";
import {
  RegisterUserTypeOne,
  RegisterUserTypeTwo,
} from "../../constants/types";
import { configContentType } from "../../constants/config";
import { userLoading } from "../auth.action";
import { returnErrors } from "../error.action";

export const registerOneAlreadyDone =
  (success: boolean) => (dispatch: Function) => {
    if (success) {
      dispatch({
        type: REGISTER_ONE_SUCCESS,
        payload: {},
      });
    } else {
      dispatch({
        type: REGISTER_ONE_FAIL,
        payload: {},
      });
    }
  };

export const registerOne =
  ({ email }: RegisterUserTypeOne) =>
  (dispatch: Function) => {
    dispatch(userLoading());
    const body = JSON.stringify({ email });
    axios
      .post(`${SERVER_ROOT_URL}/user/register-one`, body, configContentType)
      .then((res) => {
        dispatch({
          type: REGISTER_ONE_SUCCESS,
          payload: { email },
        });
        dispatch({
          type: CLEAR_ERRORS,
        });
        toast.success("Email sent with OTP");
      })
      .catch((err: any) => {
        returnErrors(err.response.data, err.response.status, REGISTER_ONE_FAIL);
        dispatch({
          type: REGISTER_ONE_FAIL,
        });
        toast.error(err.response.data.message);
      });
  };

export const registerTwo =
  ({
    name,
    email,
    phone,
    experience,
    addressLineOne,
    addressLineTwo,
    state,
    password,
    confirmPassword,
    otp,
  }: RegisterUserTypeTwo) =>
  (dispatch: Function) => {
    dispatch(userLoading());
    const body = JSON.stringify({
      name,
      email,
      phone,
      experience,
      addressLineOne,
      addressLineTwo,
      state,
      password,
      confirmPassword,
      otp,
    });

    axios
      .post(`${SERVER_ROOT_URL}/user/register-two`, body, configContentType)
      .then((res) => {
        dispatch({
          type: REGISTER_TWO_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: CLEAR_ERRORS,
        });
        toast.success("Register Successful");
      })
      .catch((err: any) => {
        returnErrors(err.response.data, err.response.status, REGISTER_TWO_FAIL);
        dispatch({
          type: REGISTER_TWO_FAIL,
        });
        toast.error("Register Failed");
      });
  };
