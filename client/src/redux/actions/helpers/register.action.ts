import axios from "axios";

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

export const registerOne =
  ({ email, password }: RegisterUserTypeOne) =>
  (dispatch: Function) => {
    dispatch(userLoading());
    const body = JSON.stringify({ email, password });
    axios
      .post(`${SERVER_ROOT_URL}/user/register-one`, body, configContentType)
      .then((res) => {
        dispatch({
          type: REGISTER_ONE_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: CLEAR_ERRORS,
        });
      })
      .catch((err: any) => {
        returnErrors(err.response.data, err.response.status, REGISTER_ONE_FAIL);
        dispatch({
          type: REGISTER_ONE_FAIL,
        });
      });
  };

export const registerTwo =
  ({ email, password, name, confirmPassword, otp }: RegisterUserTypeTwo) =>
  (dispatch: Function) => {
    dispatch(userLoading());
    const body = JSON.stringify({
      email,
      password,
      name,
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
      })
      .catch((err: any) => {
        returnErrors(err.response.data, err.response.status, REGISTER_TWO_FAIL);
        dispatch({
          type: REGISTER_TWO_FAIL,
        });
      });
  };
