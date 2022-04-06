import axios from "axios";
import { toast } from "react-toastify";

import { defaultHeader, IActions, SERVER_ROOT_URL } from "./helpers";

// TODO use recoil state
const useAuth = () => {
  const handleAuth = async (values: any, actions: IActions) => {
    const body = JSON.stringify(values);
    try {
      // use pending state in notification
      const res = await axios.post(
        `${SERVER_ROOT_URL}/${actions.endpoint}`,
        body,
        defaultHeader
      );
      toast.success(res.data.message || actions.successMessage || "Success");
    } catch (err: any) {
      toast.error(
        err.response.data.message || actions.failureMessage || "Error"
      );
    }
  };

  return handleAuth;
};

export default useAuth;
