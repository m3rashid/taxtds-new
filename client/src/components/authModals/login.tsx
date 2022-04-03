import { MdVpnKey, MdPerson, MdLock } from "react-icons/md";
import { useDispatch } from "react-redux";

import InputEl from "../atoms/Input";
import ButtonEl from "../atoms/Button";
import React from "react";
import { login } from "../../redux/actions/auth.action";

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

  const dispatch = useDispatch();
  const loginUser = () => {
    dispatch(login(data));
  };

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
