import React from "react";
import { MdLock, MdVpnKey } from "react-icons/md";
import ButtonEl from "../atoms/Button";
import InputEl from "../atoms/Input";

interface IProps {
  setModal: (e: any) => void;
}

const ChangePassword: React.FC<IProps> = ({ setModal }) => {
  const [data, setData] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangePassword = () => {
    setModal("");
  };

  return (
    <>
      <InputEl
        name="oldPassword"
        value={data.oldPassword}
        onChange={handleChange}
        Icon={<MdVpnKey />}
        type="password"
        placeholder="Enter old password"
      />
      <InputEl
        name="newPassword"
        value={data.newPassword}
        onChange={handleChange}
        Icon={<MdVpnKey />}
        type="password"
        placeholder="Enter new password"
      />
      <InputEl
        name="confirmNewPassword"
        value={data.confirmNewPassword}
        onChange={handleChange}
        Icon={<MdVpnKey />}
        type="password"
        placeholder="Confirm new password"
      />
      <div className="flex flex-col w-full">
        <ButtonEl
          Icon={<MdLock />}
          label="Change Password"
          callback={handleChangePassword}
        />
      </div>
    </>
  );
};

export default ChangePassword;
