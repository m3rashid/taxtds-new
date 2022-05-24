import React from "react";
import { MdAlternateEmail, MdLock, MdVpnKey } from "react-icons/md";

import InputEl from "../atoms/Input";
import ButtonEl from "../atoms/Button";

interface IProps {
  setModal: (e: any) => void;
}

const ResetPassword: React.FC<IProps> = ({ setModal }) => {
  const [data, setData] = React.useState({
    email: "",
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

  const handleResetPassword = () => {
    setModal("");
  };

  return (
    <>
      <InputEl
        name="email"
        value={data.email}
        onChange={handleChange}
        Icon={<MdAlternateEmail />}
        type="text"
        placeholder="Enter email"
      />
      <InputEl
        name="password"
        value={data.password}
        onChange={handleChange}
        Icon={<MdVpnKey />}
        type="password"
        placeholder="Enter password"
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
        <ButtonEl
          Icon={<MdLock />}
          label="Reset Password"
          callback={handleResetPassword}
        />
      </div>
    </>
  );
};

export default ResetPassword;
