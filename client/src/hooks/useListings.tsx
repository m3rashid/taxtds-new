import React from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { SERVER_ROOT_URL, tokenHeader } from "./helpers";
import { listings } from "../store/data";
import { toast } from "react-toastify";

const useListings = () => {
  const setRecoilState = useSetRecoilState(listings);
  const getListings = async () => {
    try {
      const body = JSON.stringify({});
      const res = await axios.post(
        `${SERVER_ROOT_URL}/listings/all`,
        body,
        tokenHeader
      );
      setRecoilState(res.data.listings);
    } catch (err) {
      toast.error("Error getting listings ...");
    }
  };

  return { getListings };
};

export default useListings;
