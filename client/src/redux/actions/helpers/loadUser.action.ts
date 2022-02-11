import axios from "axios";

import { SERVER_ROOT_URL, USER_LOADED, AUTH_ERROR } from "../../constants";
import { userLoading } from "../auth.action";
import { tokenConfig } from "./token.config";

export const loadUser = () => (dispatch: Function, getState: Function) => {
  dispatch(userLoading());
  axios
    .get(`${SERVER_ROOT_URL}/user`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
      });
    });
};
