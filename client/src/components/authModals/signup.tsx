import React from "react";
import Select from "react-select";
import AlternateEmail from "@material-ui/icons/AlternateEmail";
import VpnKey from "@material-ui/icons/VpnKey";
import Phone from "@material-ui/icons/Phone";
import Person from "@material-ui/icons/Person";
import Lock from "@material-ui/icons/Lock";
import LocationCity from "@material-ui/icons/LocationCity";
import LocationOn from "@material-ui/icons/LocationOn";

import InputEl from "../atoms/Input";
import ButtonEl from "../atoms/Button";

const titleStyle = "text-[white] text-center font-bold text-xl -mt-4";

const SignupStepOne = ({ setState }: { setState: Function }) => {
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <h2 className={titleStyle}>Signup Here</h2>
      <p className="mt-1 mb-4 text-[white] text-center font-semibold">
        Verify your email first
      </p>
      <InputEl
        name="name"
        value={data.name}
        onChange={handleChange}
        Icon={<Person />}
        type="text"
        placeholder="Enter your name"
      />
      <InputEl
        name="email"
        value={data.email}
        onChange={handleChange}
        Icon={<AlternateEmail />}
        type="email"
        placeholder="Enter your Email"
      />
      <div className="flex flex-col w-full">
        <ButtonEl
          Icon={<Lock />}
          label="Verify email"
          callback={() => setState(true)}
        />
        <ButtonEl
          Icon={<Lock />}
          label="Already verified ?"
          callback={() => {}}
        />
      </div>
    </>
  );
};

const SignupStepTwo = () => {
  const [state, setState] = React.useState(null);
  const handleSelectChange = () => {};

  const [data, setData] = React.useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    addressLineOne: "",
    addressLineTwo: "",
    avatar: "",
    password: "",
    confirmPassword: "",
  });

  const StateUt = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman & Diu",
    "Delhi",
    "Jammu & Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  const options = StateUt.sort().map((item) => {
    return {
      value: item,
      label: item,
    };
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const signupUser = () => {};

  return (
    <>
      <h2 className={`${titleStyle} mb-4`}>Complete signup</h2>
      <InputEl
        name="name"
        value={data.name}
        onChange={handleChange}
        Icon={<Person />}
        type="text"
        placeholder="Enter your name"
      />
      <InputEl
        name="email"
        value={data.email}
        onChange={handleChange}
        Icon={<AlternateEmail />}
        type="email"
        placeholder="Enter your Email"
      />
      <InputEl
        name="phone"
        value={data.phone}
        onChange={handleChange}
        Icon={<Phone />}
        placeholder="Enter Phone Number"
        type="number"
      />
      <InputEl
        name="addressLineOne"
        value={data.addressLineOne}
        onChange={handleChange}
        Icon={<LocationCity />}
        placeholder="Address Line One"
        type="text"
      />
      <InputEl
        name="addressLineTwo"
        value={data.addressLineTwo}
        onChange={handleChange}
        Icon={<LocationCity />}
        placeholder="Address Line Two"
        type="text"
      />
      <div className="flex flex-row items-center w-full mb-[15px] border-x-4 border-buttonSuccess rounded-md shadow-md bg-[white]">
        <LocationOn className="mr-2" />
        <Select
          className="w-full"
          onChange={handleSelectChange}
          placeholder="Select State"
          options={options}
          styles={{
            control: (base) => ({
              ...base,
              border: "none",
              boxShadow: "none",
            }),
            menuList: (base, state) => ({
              ...base,
              paddingRight: "8px",
              paddingLeft: "8px",
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isSelected ? "#D5EBF5" : "#fff",
              borderRadius: "4px",
              color: "#141F31",
              ":hover": {
                backgroundColor: "#fdf2d4",
              },
            }),
          }}
        />
      </div>
      <InputEl
        name="password"
        value={data.password}
        onChange={handleChange}
        Icon={<VpnKey />}
        type="password"
        placeholder="Choose a password"
      />
      <InputEl
        name="confirmPassword"
        value={data.confirmPassword}
        onChange={handleChange}
        Icon={<VpnKey />}
        type="password"
        placeholder="Confirm password"
      />
      <div className="flex flex-col w-full">
        <ButtonEl Icon={<Lock />} label="SignUp" callback={signupUser} />
      </div>
    </>
  );
};

const Signup = () => {
  const [stepOneDone, setStepOneDone] = React.useState(false);
  return (
    <>
      {!stepOneDone ? (
        <SignupStepOne setState={(val: boolean) => setStepOneDone(val)} />
      ) : (
        <SignupStepTwo />
      )}
    </>
  );
};

export default Signup;
