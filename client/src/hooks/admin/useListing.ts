import axios from "axios";
import { toast } from "react-toastify";
import { SERVER_ROOT_URL, tokenHeader } from "../helpers";

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
      console.log(err);
      toast.error("Error occured while updating listing");
    }
  };

  const deleteListing = async (listingId: string) => {
    try {
      await axios.post(
        `${SERVER_ROOT_URL}/admin/listing/delete`,
        JSON.stringify({ listingId }),
        tokenHeader
      );
      toast.success("Listing deleted successfully");
    } catch (err) {
      console.log(err);
      toast.error("Error occured while deleting listing");
    }
  };

  return { featureUnfeature, sendEmail, deleteListing };
};

export default useListing;
