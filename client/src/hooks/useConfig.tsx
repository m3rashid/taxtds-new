import axios from "axios";

import { defaultHeader, SERVER_ROOT_URL } from "./helpers";

const useConfig = () => {
  const getConfig = async () => {
    const body = JSON.stringify({});
    try {
      const res = await axios.post(
        `${SERVER_ROOT_URL}/config`,
        body,
        defaultHeader
      );
      // set the app config here
      console.log(res.data);
    } catch (err: any) {}
  };

  return {
    getConfig,
  };
};
export default useConfig;
