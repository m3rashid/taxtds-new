import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AlternateEmail from "@material-ui/icons/AlternateEmail";
import VpnKey from "@material-ui/icons/VpnKey";
import Phone from "@material-ui/icons/Phone";
import Person from "@material-ui/icons/Person";
import Lock from "@material-ui/icons/Lock";
import LocationCity from "@material-ui/icons/LocationCity";

import InputEl from "../atoms/Input";
import ButtonEl from "../atoms/Button";
import StateSelector from "../atoms/stateSelector";
import {
  registerOne,
  registerTwo,
  registerOneAlreadyDone,
} from "../../redux/actions/auth.action";

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
        Icon={<AlternateEmail />}
        type="email"
        placeholder="Enter your Email"
      />
      <div className="flex flex-col w-full">
        <ButtonEl
          Icon={<Lock />}
          label="Verify email"
          callback={handleRegisterOne}
        />
        <ButtonEl
          Icon={<Lock />}
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
        type="text"
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
      <InputEl
        name="experience"
        value={data.experience}
        onChange={handleChange}
        Icon={<LocationCity />}
        placeholder="Experience in years"
        type="number"
      />
      <StateSelector setData={setData} />
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
      <InputEl
        name="otp"
        value={data.otp}
        onChange={handleChange}
        Icon={<VpnKey />}
        type="password"
        placeholder="OTP"
      />
      <div className="flex flex-col w-full">
        <ButtonEl Icon={<Lock />} label="SignUp" callback={signupUser} />
        <ButtonEl Icon={<Lock />} label="Go Back" callback={goBack} />
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
