import { configContentType } from "../../constants/config";

export const tokenConfig = (getState: Function) => {
  const token = getState().auth.token;
  if (token) {
    configContentType.headers["authorization"] = token;
  }
  return configContentType;
};
