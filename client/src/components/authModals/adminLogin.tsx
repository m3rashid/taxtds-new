import { MdVpnKey, MdPerson, MdLock } from "react-icons/md";

import InputEl from "../atoms/Input";
import ButtonEl from "../atoms/Button";
import React from "react";

const AdminLogin = () => {
  const [data, setData] = React.useState({
    username: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loginAdmin = () => {};

  return (
    <>
      <InputEl
        name="username"
        value={data.username}
        onChange={handleChange}
        Icon={<MdPerson />}
        type="text"
        placeholder="Admin username"
      />
      <InputEl
        name="password"
        value={data.password}
        onChange={handleChange}
        Icon={<MdVpnKey />}
        type="password"
        placeholder="Admin password"
      />
      <div className="flex flex-col w-full">
        <ButtonEl Icon={<MdLock />} label="Admin Login" callback={loginAdmin} />
      </div>
    </>
  );
};

export default AdminLogin;
