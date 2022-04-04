import React from "react";
import { MdBrandingWatermark, MdHomeWork, MdLocationOn } from "react-icons/md";
import UserWrapper from "../../components/user/wrapper";
import InputEl from "../../components/atoms/Input";
import FileInput from "../../components/atoms/fileInput";
import { ReactSelect } from "../../components/atoms/reactSelect";
import StateUt from "../../data/state";

const CreateService = () => {
  const [data, setData] = React.useState({
    brandName: "",
    avatar: "", // single file
    gallery: [], // list of files min=1, max=3
    services: [],
    addedBy: "",
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

  return (
    <UserWrapper name="Demo User" username="demouser">
      <div className="flex flex-col md:flex-row gap-4 p-4 sm:p-0 w-full max-w-[1600px] mb-4">
        <div className="w-full min-w-[280px]">
          <InputEl
            Icon={<MdBrandingWatermark />}
            name="brandName"
            onChange={handleChange}
            type="text"
            value={data.brandName}
            placeholder="Enter Brandname"
          />
          <FileInput />
        </div>
        <div className="w-full min-w-[280px]">
          <ReactSelect
            setData={setData}
            Icon={<MdHomeWork />}
            placeholder="Select Service"
            options={[]}
            value={data.services}
          />

          {/* File input for gallery */}
          <InputEl
            Icon={<MdBrandingWatermark />}
            name="established"
            onChange={handleChange}
            type="text"
            value={data.established}
            placeholder="Established (year)"
          />
          <InputEl
            Icon={<MdBrandingWatermark />}
            name="tagline"
            onChange={handleChange}
            type="text"
            value={data.tagline}
            placeholder="Service Tagline"
          />
          <InputEl
            Icon={<MdBrandingWatermark />}
            name="owner"
            onChange={handleChange}
            type="text"
            value={data.owner}
            placeholder="Owner Name"
          />
          <InputEl
            Icon={<MdBrandingWatermark />}
            name="addressLineOne"
            onChange={handleChange}
            type="text"
            value={data.addressLineOne}
            placeholder="Address line one"
          />
          <InputEl
            Icon={<MdBrandingWatermark />}
            name="addressLineTwo"
            onChange={handleChange}
            type="text"
            value={data.addressLineTwo}
            placeholder="Address line two"
          />
          <ReactSelect
            setData={setData}
            Icon={<MdLocationOn />}
            placeholder="Select State"
            options={StateUt}
            value={data.state}
          />
          <InputEl
            Icon={<MdBrandingWatermark />}
            name="phone"
            onChange={handleChange}
            type="text"
            value={data.phone}
            placeholder="Contact Number"
          />
          <InputEl
            Icon={<MdBrandingWatermark />}
            name="email"
            onChange={handleChange}
            type="text"
            value={data.email}
            placeholder="Email Address"
          />
        </div>
      </div>
    </UserWrapper>
  );
};

export default CreateService;
