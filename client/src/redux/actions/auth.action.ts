import { toast } from "react-toastify";

import { USER_LOADING, LOGOUT_SUCCESS } from "../constants";
import { loadUser } from "./helpers/loadUser.action";
import {
  registerOne,
  registerTwo,
  registerOneAlreadyDone,
} from "./helpers/register.action";
import { login } from "./helpers/login.action";
import { deleteUserOne, deleteUserTwo } from "./helpers/deleteUser.action";
import { forgotPassword, resetPassword } from "./helpers/password.action";

const logout = () => {
  toast.success("Successfully logged out");
  return {
    type: LOGOUT_SUCCESS,
  };
};
const userLoading = () => ({ type: USER_LOADING });

export {
  userLoading,
  login,
  logout,
  loadUser,
  registerOne,
  registerTwo,
  deleteUserOne,
  deleteUserTwo,
  forgotPassword,
  resetPassword,
  registerOneAlreadyDone,
};
