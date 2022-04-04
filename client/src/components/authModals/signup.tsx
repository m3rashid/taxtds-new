import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MdLocationCity,
  MdPhone,
  MdAlternateEmail,
  MdVpnKey,
  MdPerson,
  MdLock,
  MdLocationOn,
} from "react-icons/md";

import InputEl from "../atoms/Input";
import ButtonEl from "../atoms/Button";
import {
  registerOne,
  registerTwo,
  registerOneAlreadyDone,
} from "../../redux/actions/auth.action";
import { ReactSelect } from "../atoms/reactSelect";
import StateUt from "../../data/state";

const titleStyle = "text-[white] text-center font-bold text-xl -mt-4";

const SignupStepOne = ({
  email,
  setEmail,
}: {
  email: string;
  setEmail: Function;
}) => {
  const dispatch = useDispatch();

  const handleRegisterOne = () => {
    dispatch(registerOne({ email }));
  };

  const alreadyVerified = () => {
    dispatch(registerOneAlreadyDone(true));
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

const SignupStepTwo = ({ email }: { email?: string }) => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState({
    name: "",
    email: email || "",
    phone: "",
    experience: "",
    addressLineOne: "",
    addressLineTwo: "",
    state: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const goBack = () => {
    dispatch(registerOneAlreadyDone(false));
  };

  const signupUser = () => {
    dispatch(registerTwo(data));
  };

  return (
    <>
      <h2 className={`${titleStyle} mb-4`}>Complete signup</h2>
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
        setData={setData}
        Icon={<MdLocationOn />}
        placeholder="Select State"
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
      <div className="flex flex-col w-full">
        <ButtonEl Icon={<MdLock />} label="SignUp" callback={signupUser} />
        <ButtonEl Icon={<MdLock />} label="Go Back" callback={goBack} />
      </div>
    </>
  );
};

const Signup = () => {
  const [email, setEmail] = React.useState<string>("");

  const stepOneDone = useSelector(
    (state: any) => state.auth.registerOneSuccess
  );
  return (
    <>
      {!stepOneDone ? (
        <SignupStepOne email={email} setEmail={setEmail} />
      ) : (
        <SignupStepTwo email={email} />
      )}
    </>
  );
};

export default Signup;
