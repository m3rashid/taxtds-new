import axios from "axios";
import { toast } from "react-toastify";

import {
  DELETE_USER_ONE_SUCCESS,
  DELETE_USER_ONE_FAIL,
  DELETE_USER_TWO_FAIL,
  DELETE_USER_TWO_SUCCESS,
  SERVER_ROOT_URL,
} from "../../constants";
import { LoginUserType, DeleteUserTypeTwo } from "../../constants/types";
import { userLoading } from "../auth.action";
import { configContentType } from "../../constants/config";
import { returnErrors } from "../error.action";

export const deleteUserOne =
  ({ email, password }: LoginUserType) =>
  (dispatch: Function) => {
    dispatch(userLoading());
    const body = JSON.stringify({ email, password });
    axios
      .post(`${SERVER_ROOT_URL}/user/delete-one`, body, configContentType)
      .then((res) => {
        dispatch({
          type: DELETE_USER_ONE_SUCCESS,
          payload: res.data,
        });
        toast.success("Email sent with OTP");
      })
      .catch((err: any) => {
        dispatch(
          returnErrors(
            err.resposnse.data,
            err.response.status,
            DELETE_USER_ONE_FAIL
          )
        );
        toast.error("Delete Failed");
      });
  };

export const deleteUserTwo =
  ({ email, password, otp }: DeleteUserTypeTwo) =>
  (dispatch: Function) => {
    dispatch(userLoading());
    const body = JSON.stringify({ email, password, otp });
    axios
      .post(`${SERVER_ROOT_URL}/user/delete-two`, body, configContentType)
      .then((res) => {
        dispatch({
          type: DELETE_USER_TWO_SUCCESS,
          payload: res.data,
        });
        toast.success("Delete Successful");
      })
      .catch((err: any) => {
        dispatch(
          returnErrors(
            err.resposnse.data,
            err.response.status,
            DELETE_USER_TWO_FAIL
          )
        );
        toast.error("Delete Failed");
      });
  };
