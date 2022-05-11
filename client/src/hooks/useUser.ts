import axios from "axios";
import { toast } from "react-toastify";

import {tokenHeader, SERVER_ROOT_URL, IActions, formatResponseMessage} from "./helpers";

const useUser = () => {
  const action = async (actions: IActions, values?: any) => {
    const body = JSON.stringify((values = {}));
    try {
      const res = await axios.post(
        `${SERVER_ROOT_URL}/${actions.endpoint}`,
        body,
        tokenHeader
      );
      toast.success(
        formatResponseMessage(res.data.message)
          || formatResponseMessage(actions.successMessage)
          || "Success");
      return res.data;
    } catch (err: any) {
      toast.error(
        formatResponseMessage(err.response.data.message)
          || formatResponseMessage(actions.failureMessage)
          || "Error"
      );
    }
  };

  return { action };
};

export default useUser;
