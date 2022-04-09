import React from "react";
import { MdVpnKey, MdPerson, MdLock } from "react-icons/md";

import InputEl from "../atoms/Input";
import ButtonEl from "../atoms/Button";
import useAuth from "../../hooks/useAuth";
import { useSetRecoilState } from "recoil";
import { authState } from "../../store/auth";
import { IActions } from "../../hooks/helpers";

const Login = () => {
  const setRecoilState = useSetRecoilState(authState);
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

  const loginUser = () => {
    const { handleAuth } = useAuth();
    const actions: IActions = {
      endpoint: "/user/login",
      pendingMessage: "Logging you in...",
      successMessage: "Successfully logged in ...",
      failureMessage: "Could not log you in, please try again later",
    };
    handleAuth(data, actions, setRecoilState);
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
