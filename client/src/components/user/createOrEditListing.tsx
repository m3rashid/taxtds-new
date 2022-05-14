import React from "react";
import {
  MdBrandingWatermark,
  MdLocationOn,
  MdHomeRepairService,
  MdUpdate,
  MdFormatQuote,
  MdPerson,
  MdPlace,
  MdPhoneCallback,
  MdOutlineAlternateEmail,
  MdOutlineAddChart,
} from "react-icons/md";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { toast } from "react-toastify";

import InputEl from "../atoms/Input";
import FileInput from "../atoms/fileInput";
import { ReactSelect } from "../atoms/reactSelect";
import StateUt from "../../data/state";
import ButtonEl from "../atoms/Button";
import { services as servicesAtom } from "../../store/data";
import { Loader } from "../atoms/loader";
import { formatResponseMessage, SERVER_ROOT_URL } from "../../hooks/helpers";
import { tokenHeader } from "../../hooks/helpers";
import { IListingDetail } from "../../store/interfaces";

interface IProps {
  listing?: IListingDetail;
  isEdit?: boolean;
}

const CreateOrEditListing: React.FC<IProps> = ({ listing, isEdit = false }) => {
  const initialState = React.useMemo(
    () => ({
      brandName: listing ? listing.brandName : "",
      tagline: listing ? listing.tagline : "",
      owner: listing ? listing.owner : "",
      phone: listing ? listing.phone : "",
      email: listing ? listing.email : "",
      established: listing ? listing.established : "",
      addressLineOne: listing ? listing.addressLineOne : "",
      addressLineTwo: listing ? listing.addressLineTwo : "",
      state: listing ? listing.state : "",
      avatar: "",
      services: listing ? listing.services : [],
      galleryImgOne: "",
      galleryImgTwo: "",
      galleryImgThree: "",
    }),
    []
  );

  const [loading, setLoading] = React.useState(false);
  const services = useRecoilValue(servicesAtom);
  const [data, setData] = React.useState(initialState);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeServices = (values: any) => {
    setData((prev) => ({
      ...prev,
      services: values.map((value: any) => value.value),
    }));
  };

  const handleAddListing = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    const addToast = toast.loading("Adding your listing ...");
    try {
      e.preventDefault();
      [
        data.avatar,
        data.galleryImgOne,
        data.galleryImgTwo,
        data.galleryImgThree,
      ].forEach((file: any) => {
        if (!file) {
          throw new Error("Please upload all images");
        }
      });

      let form = new FormData();
      form.append("brandName", data.brandName);
      form.append("tagline", data.tagline as string);
      form.append("owner", data.owner);
      form.append("phone", data.phone as string);
      form.append("email", data.email);
      form.append("established", data.established);
      form.append("addressLineOne", data.addressLineOne);
      form.append("addressLineTwo", data.addressLineTwo);
      form.append("state", data.state);
      form.append("services", JSON.stringify(data.services));
      if (!isEdit) {
        form.append("avatar", data.avatar);
        form.append("galleryImgOne", data.galleryImgOne);
        form.append("galleryImgTwo", data.galleryImgTwo);
        form.append("galleryImgThree", data.galleryImgThree);
      }

      const res = await axios({
        method: "POST",
        url: `${SERVER_ROOT_URL}/listings/${isEdit ? "edit" : "add"}`,
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: tokenHeader.headers!.Authorization,
        },
      });
      setLoading(false);
      toast.update(addToast, {
        render:
          formatResponseMessage(res.data.message) ||
          "Successfully listed your service",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      setData(initialState);
    } catch (err: any) {
      setLoading(false);
      toast.update(addToast, {
        render:
          formatResponseMessage(err.response?.data?.message) ||
          "Error listing your service",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <form
      encType="multipart/form-data"
      onSubmit={handleAddListing}
      className="flex flex-col md:flex-row gap-4 p-4 sm:p-0 w-full max-w-[1600px] mb-4"
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full min-w-[280px] max-w-[400px]">
            <InputEl
              Icon={<MdBrandingWatermark />}
              name="brandName"
              onChange={handleChange}
              type="text"
              value={data.brandName}
              placeholder="Enter Brandname"
            />
            <InputEl
              Icon={<MdFormatQuote />}
              name="tagline"
              onChange={handleChange}
              type="text"
              value={data.tagline as string}
              placeholder="Service Tagline"
            />
            <InputEl
              Icon={<MdPerson />}
              name="owner"
              onChange={handleChange}
              type="text"
              value={data.owner}
              placeholder="Owner Name"
            />
            <InputEl
              Icon={<MdPhoneCallback />}
              name="phone"
              onChange={handleChange}
              type="text"
              value={data.phone as string}
              placeholder="Contact Number"
            />
            <InputEl
              Icon={<MdOutlineAlternateEmail />}
              name="email"
              onChange={handleChange}
              type="text"
              value={data.email}
              placeholder="Email Address"
            />
            <InputEl
              Icon={<MdUpdate />}
              name="established"
              onChange={handleChange}
              type="text"
              value={data.established}
              placeholder="Established (year)"
            />
            <InputEl
              Icon={<MdLocationOn />}
              name="addressLineOne"
              onChange={handleChange}
              type="text"
              value={data.addressLineOne}
              placeholder="Address line one"
            />
            <InputEl
              Icon={<MdLocationOn />}
              name="addressLineTwo"
              onChange={handleChange}
              type="text"
              value={data.addressLineTwo}
              placeholder="Address line two"
            />
            <ReactSelect
              name="state"
              setData={setData}
              Icon={<MdPlace />}
              placeholder="Select State"
              options={StateUt}
              value={data.state}
            />
            {!isEdit && (
              <FileInput setData={setData} name="avatar" title="Avatar" />
            )}
          </div>
          <div className="w-full min-w-[280px] max-w-[400px]">
            <ReactSelect
              name="services"
              handleChange={handleChangeServices}
              Icon={<MdHomeRepairService />}
              placeholder="Select Services"
              customOptions={services}
              value={data.services}
              useDefaultFilter={false}
              isMulti={true}
            />
            {!isEdit && (
              <>
                <FileInput
                  setData={setData}
                  name="galleryImgOne"
                  title="Gallery Image one"
                />
                <FileInput
                  setData={setData}
                  name="galleryImgTwo"
                  title="Gallery Image two"
                />
                <FileInput
                  setData={setData}
                  name="galleryImgThree"
                  title="Gallery Image three"
                />
              </>
            )}
            <div className="flex flex-col w-full items-end">
              <ButtonEl label="Add Listing" Icon={<MdOutlineAddChart />} />
            </div>
          </div>
        </>
      )}
    </form>
  );
};

export default CreateOrEditListing;
