import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  MdLocationCity,
  MdPhone,
  MdAlternateEmail,
  MdVpnKey,
  MdPerson,
  MdLock,
  MdLocationOn,
  MdWork,
} from "react-icons/md";

import InputEl from "../atoms/Input";
import ButtonEl from "../atoms/Button";
import { ReactSelect } from "../atoms/reactSelect";
import StateUt from "../../data/state";
import useAuth from "../../hooks/useAuth";
import { authState } from "../../store/auth";
import { IActions } from "../../hooks/helpers";
import { professions } from "../../store/data";

const titleStyle = "text-[white] text-center font-bold text-xl -mt-4";

const SignupStepOne = ({
  email,
  setEmail,
  setStepOneDone,
}: {
  email: string;
  setEmail: Function;
  setStepOneDone: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleRegisterOne = () => {
    const { handleRegister } = useAuth();
    const actions = {
      endpoint: "/user/register",
      pendingMessage: "Request in progress",
      successMessage: "Check your Email for the OTP",
      failureMessage: "An error occured, please try again later",
    };
    handleRegister({ email }, actions);
  };

  const alreadyVerified = () => {
    setStepOneDone(true);
  };

  return (
    <>
      <h2 className={titleStyle}>Signup Here</h2>
      <p className="mt-1 mb-4 text-[white] text-center font-semibold">
        Verify your email first
      </p>
      <InputEl
        name="email"
        value={email}
        onChange={(e: any) => {
          setEmail(e.target.value);
        }}
        Icon={<MdAlternateEmail />}
        type="email"
        placeholder="Enter your Email"
      />
      <div className="flex flex-col w-full">
        <ButtonEl
          Icon={<MdLock />}
          label="Verify email"
          callback={handleRegisterOne}
        />
        <ButtonEl
          Icon={<MdLock />}
          label="Already verified ?"
          callback={alreadyVerified}
        />
      </div>
    </>
  );
};

const SignupStepTwo = ({
  email,
  setStepOneDone,
}: {
  email?: string;
  setStepOneDone: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const setRecoilState = useSetRecoilState(authState);
  const givenProfessions = useRecoilValue(professions);

  const [data, setData] = React.useState({
    name: "",
    email: email || "",
    phone: "",
    experience: "",
    addressLineOne: "",
    addressLineTwo: "",
    professions: [],
    state: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const handleChangeProfessions = (values: any) => {
    setData((prev) => ({
      ...prev,
      professions: values.map((value: any) => value.value),
    }));
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const goBack = () => {
    setStepOneDone(false);
  };

  const signupUser = () => {
    const { handleAuth } = useAuth();
    const actions: IActions = {
      endpoint: "/user/create-account",
      pendingMessage: "Creating your account ...",
      successMessage:
        "Account Created Successfullu, start listing your services",
      failureMessage: "An error occured, please try again later",
    };
    handleAuth(data, actions, setRecoilState);
  };

  return (
    <>
      <h2 className={`${titleStyle} mb-4`}>Complete signup</h2>
      <div className="max-w-[300px]">
        <InputEl
          name="name"
          value={data.name}
          onChange={handleChange}
          Icon={<MdPerson />}
          type="text"
          placeholder="Enter your name"
        />
        <InputEl
          name="email"
          value={data.email}
          onChange={handleChange}
          Icon={<MdAlternateEmail />}
          type="email"
          placeholder="Enter your Email"
        />
        <InputEl
          name="phone"
          value={data.phone}
          onChange={handleChange}
          Icon={<MdPhone />}
          placeholder="Enter Phone Number"
          type="text"
        />
        <InputEl
          name="addressLineOne"
          value={data.addressLineOne}
          onChange={handleChange}
          Icon={<MdLocationCity />}
          placeholder="Address Line One"
          type="text"
        />
        <InputEl
          name="addressLineTwo"
          value={data.addressLineTwo}
          onChange={handleChange}
          Icon={<MdLocationCity />}
          placeholder="Address Line Two"
          type="text"
        />
        <InputEl
          name="experience"
          value={data.experience}
          onChange={handleChange}
          Icon={<MdLocationCity />}
          placeholder="Experience in years"
          type="number"
        />
        <ReactSelect
          name="professions"
          handleChange={handleChangeProfessions}
          Icon={<MdWork />}
          placeholder="Select Professions"
          customOptions={givenProfessions}
          value={data.professions}
          useDefaultFilter={false}
          isMulti={true}
        />
        <ReactSelect
          name="state"
          setData={setData}
          Icon={<MdLocationOn />}
          placeholder="Select Your State"
          options={StateUt}
          value={data.state}
        />
        <InputEl
          name="password"
          value={data.password}
          onChange={handleChange}
          Icon={<MdVpnKey />}
          type="password"
          placeholder="Choose a password"
        />
        <InputEl
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={handleChange}
          Icon={<MdVpnKey />}
          type="password"
          placeholder="Confirm password"
        />
        <InputEl
          name="otp"
          value={data.otp}
          onChange={handleChange}
          Icon={<MdVpnKey />}
          type="password"
          placeholder="OTP"
        />
      </div>
      <div className="flex flex-col w-full">
        <ButtonEl Icon={<MdLock />} label="SignUp" callback={signupUser} />
        <ButtonEl Icon={<MdLock />} label="Go Back" callback={goBack} />
      </div>
    </>
  );
};

const Signup = () => {
  const [email, setEmail] = React.useState<string>("");
  const [stepOneDone, setStepOneDone] = React.useState<boolean>(false);

  return (
    <>
      {!stepOneDone ? (
        <SignupStepOne
          email={email}
          setEmail={setEmail}
          setStepOneDone={setStepOneDone}
        />
      ) : (
        <SignupStepTwo email={email} setStepOneDone={setStepOneDone} />
      )}
    </>
  );
};

export default Signup;
