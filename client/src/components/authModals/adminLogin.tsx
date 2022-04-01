import VpnKey from "@material-ui/icons/VpnKey";
import Person from "@material-ui/icons/Person";
import Lock from "@material-ui/icons/Lock";

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
        Icon={<Person />}
        type="text"
        placeholder="Admin username"
      />
      <InputEl
        name="password"
        value={data.password}
        onChange={handleChange}
        Icon={<VpnKey />}
        type="password"
        placeholder="Admin password"
      />
      <div className="flex flex-col w-full">
        <ButtonEl Icon={<Lock />} label="Admin Login" callback={loginAdmin} />
      </div>
    </>
  );
};

export default AdminLogin;
