import axios from "axios";
import { toast } from "react-toastify";

import { tokenHeader, SERVER_ROOT_URL, hasToken, IActions } from "./helpers";

const useuser = (values: any, actions: IActions) => {
  const action = async () => {
    const body = JSON.stringify(values);
    if (!hasToken) return;
    try {
      const res = await axios.post(
        `${SERVER_ROOT_URL}/${actions.endpoint}`,
        body,
        tokenHeader
      );
      toast.success(res.data.message || actions.successMessage || "Success");
    } catch (err: any) {
      toast.error(
        err.response.data.message || actions.failureMessage || "Error"
      );
    }
  };

  return action;
};

export default useuser;
