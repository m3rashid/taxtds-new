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
import { useRecoilState } from "recoil";

import UserWrapper from "../../components/user/wrapper";
import InputEl from "../../components/atoms/Input";
import FileInput from "../../components/atoms/fileInput";
import { ReactSelect } from "../../components/atoms/reactSelect";
import StateUt from "../../data/state";
import ButtonEl from "../../components/atoms/Button";
import { services as servicesAtom } from "../../store/data";
import useData from "../../hooks/useData";

const CreateService = () => {
  const { getServices } = useData();
  const [services, setServices] = useRecoilState(servicesAtom);

  React.useEffect(() => {
    getServices(setServices);
  }, []);

  // console.log(services);

  const [data, setData] = React.useState({
    brandName: "",
    avatar: "",
    galleryImgOne: "",
    galleryImgTwo: "",
    galleryImgThree: "",
    services: [],
    established: "",
    tagline: "",
    owner: "",
    addressLineOne: "",
    addressLineTwo: "",
    state: "",
    phone: "",
    email: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeServices = (values: any) => {
    setData((prev) => ({
      ...prev,
      services: values.map((value: any) => value.value),
    }));
  };

  const handleAddListing = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values: any = {
      ...data,
      gallery: [],
    };
    data.galleryImgOne !== "" && values.gallery.push(data.galleryImgOne);
    data.galleryImgTwo !== "" && values.gallery.push(data.galleryImgTwo);
    data.galleryImgThree !== "" && values.gallery.push(data.galleryImgThree);

    delete values["galleryImgOne"];
    delete values["galleryImgTwo"];
    delete values["galleryImgThree"];

    console.log(values);
    // send this values with post request
  };

  return (
    <UserWrapper>
      <form
        encType="multipart/form-data"
        onSubmit={handleAddListing}
        className="flex flex-col md:flex-row gap-4 p-4 sm:p-0 w-full max-w-[1600px] mb-4"
      >
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
            value={data.tagline}
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
            value={data.phone}
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
          <FileInput setData={setData} name="avatar" title="Avatar" />
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
          <div className="flex flex-col w-full items-end">
            <ButtonEl label="Add Listing" Icon={<MdOutlineAddChart />} />
          </div>
        </div>
      </form>
    </UserWrapper>
  );
};

export default CreateService;
