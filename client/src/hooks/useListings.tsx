import React from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import {defaultHeader, formatResponseMessage, SERVER_ROOT_URL, tokenHeader} from "./helpers";
import { listings } from "../store/data";
import { toast } from "react-toastify";
import { IListing } from "../store/interfaces"

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

  const getOneListing = async (listingId: string) => {
    try {
      const res = await axios.post(
        `${SERVER_ROOT_URL}/listings/one`,
        JSON.stringify({ listingId }),
        defaultHeader
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const addReview = async (data: any) => {
    const reviewToast = toast.loading("Adding your review");
    const body = JSON.stringify(data);
    try {
      const res = await axios.post(
        `${SERVER_ROOT_URL}/review/add`,
        body,
        defaultHeader
      );
      toast.update(reviewToast, {
        render: formatResponseMessage(res.data.message)
          || "Thanks for your review...",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    //  update in the store
    } catch (err: any) {
      toast.update(reviewToast, {
        render:
          formatResponseMessage(err.response?.data?.message)
            || "Error in adding review, pleasy try again",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return { getListings, getOneListing, addReview };
};

export default useListings;
