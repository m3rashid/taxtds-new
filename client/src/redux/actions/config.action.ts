import axios from "axios";

import {
  GET_CONFIG_SUCCESS,
  GET_CONFIG_FAIL,
  SERVER_ROOT_URL,
} from "../constants";
import { userLoading } from "./auth.action";

export const getConfig = () => (dispatch: Function) => {
  dispatch(userLoading());
  axios
    .get(`${SERVER_ROOT_URL}/config`)
    .then((res) => {
      dispatch({
        type: GET_CONFIG_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_CONFIG_FAIL,
      });
    });
};
