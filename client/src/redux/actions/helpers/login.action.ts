import axios from "axios";

import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_ERRORS,
  SERVER_ROOT_URL,
} from "../../constants";
import { userLoading } from "../auth.action";
import { LoginUserType } from "../../constants/types";
import { configContentType } from "../../constants/config";
import { returnErrors } from "../error.action";

export const login =
  ({ email, password }: LoginUserType) =>
  (dispatch: Function) => {
    dispatch(userLoading());
    const body = JSON.stringify({ email, password });
    axios
      .post(`${SERVER_ROOT_URL}/user/login`, body, configContentType)
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: CLEAR_ERRORS,
        });
      })
      .catch((err: any) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, LOGIN_FAIL)
        );
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };
