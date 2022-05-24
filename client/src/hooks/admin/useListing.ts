import axios from "axios";
import { toast } from "react-toastify";
import {
  formatResponseMessage,
  SERVER_ROOT_URL,
  tokenHeader,
} from "../helpers";

const useListing = () => {
  const sendEmail = async (email: string) => {};

  const featureUnfeature = async (listingId: string, toFeature: boolean) => {
    try {
      await axios.post(
        `${SERVER_ROOT_URL}/admin/listing/feature-unfeature`,
        JSON.stringify({ listingId, toFeature }),
        tokenHeader
      );
      toast.success("Listing updated successfully");
    } catch (err) {
      toast.error("Error occured while updating listing");
    }
  };

  const deleteListing = async (listingId: string) => {
    const t = toast.loading("Starting to delete listing");
    try {
      const res = await axios.post(
        `${SERVER_ROOT_URL}/admin/listing/delete`,
        JSON.stringify({ listingId }),
        tokenHeader
      );
      toast.update(t, {
        render:
          formatResponseMessage(res.data.message) || "Deletion successful",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (err: any) {
      toast.update(t, {
        render: formatResponseMessage(err.message) || "Error in deletion",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return { featureUnfeature, sendEmail, deleteListing };
};

export default useListing;
