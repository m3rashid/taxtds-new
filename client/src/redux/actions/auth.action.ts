import { USER_LOADING, LOGOUT_SUCCESS } from "../constants";
import { deleteUserOne, deleteUserTwo } from "./helpers/deleteUser.action";
import { login } from "./helpers/login.action";
import { registerOne, registerTwo } from "./helpers/register.action";
import { forgotPassword, resetPassword } from "./helpers/password.action";

const logout = () => ({ type: LOGOUT_SUCCESS });
const userLoading = () => ({ type: USER_LOADING });

export {
  userLoading,
  login,
  logout,
  registerOne,
  registerTwo,
  deleteUserOne,
  deleteUserTwo,
  forgotPassword,
  resetPassword,
};
