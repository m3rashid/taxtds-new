import React from "react";
import { MdAlternateEmail, MdLock } from "react-icons/md";
import ButtonEl from "../atoms/Button";
import InputEl from "../atoms/Input";

interface IProps {
  setModal: (e: any) => void;
}

const ForgotPassword: React.FC<IProps> = ({ setModal }) => {
  const [email, setEmail] = React.useState("");

  const handleChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = () => {
    setModal("");
  };

  return (
    <>
      <InputEl
        name="email"
        value={email}
        onChange={handleChange}
        Icon={<MdAlternateEmail />}
        type="text"
        placeholder="Enter email"
      />
      <div className="flex flex-col w-full">
        <ButtonEl
          Icon={<MdLock />}
          label="Forgot Password"
          callback={handleForgotPassword}
        />
      </div>
    </>
  );
};

export default ForgotPassword;
