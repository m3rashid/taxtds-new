import { GET_ERRORS, CLEAR_ERRORS } from "../constants";

export const returnErrors = (
  msg: string | any,
  status: number,
  id: any = null
) => ({
  type: GET_ERRORS,
  payload: { msg, status, id },
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});
