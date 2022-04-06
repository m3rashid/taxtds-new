import { MdVpnKey, MdPerson, MdLock } from "react-icons/md";

import InputEl from "../atoms/Input";
import ButtonEl from "../atoms/Button";
import React from "react";

const Login = () => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loginUser = () => {};

  return (
    <>
      <InputEl
        name="email"
        value={data.email}
        onChange={handleChange}
        Icon={<MdPerson />}
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
      <div className="flex flex-col w-full">
        <ButtonEl Icon={<MdLock />} label="Login" callback={loginUser} />
      </div>
    </>
  );
};

export default Login;
