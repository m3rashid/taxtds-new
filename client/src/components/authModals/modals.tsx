import AlternateEmail from "@material-ui/icons/AlternateEmail";
import VpnKey from "@material-ui/icons/VpnKey";
import Person from "@material-ui/icons/Person";
import Phone from "@material-ui/icons/Phone";
import Help from "@material-ui/icons/Help";
import Lock from "@material-ui/icons/Lock";

import InputEl from "../atoms/Input";
import ButtonEl from "../atoms/Button";
import React from "react";

const Signup = () => {
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const signupUser = () => {};

  return (
    <>
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
      <ButtonEl Icon={<Lock />} label="SignUp" callback={signupUser} />
    </>
  );
};

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
        Icon={<Person />}
        type="text"
        placeholder="Enter email"
      />
      <InputEl
        name="password"
        value={data.password}
        onChange={handleChange}
        Icon={<VpnKey />}
        type="password"
        placeholder="Enter password"
      />
      <ButtonEl Icon={<Lock />} label="Login" callback={loginUser} />
    </>
  );
};

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
      <ButtonEl Icon={<Lock />} label="Admin Login" callback={loginAdmin} />
    </>
  );
};

const Quotes = () => {
  const [data, setData] = React.useState({
    org: "",
    email: "",
    phone: "",
    query: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getQuotes = () => {};

  return (
    <>
      <InputEl
        name="org"
        value={data.org}
        onChange={handleChange}
        Icon={<Person />}
        type="text"
        placeholder="Your Organisation Name"
      />
      <InputEl
        name="email"
        value={data.email}
        onChange={handleChange}
        Icon={<AlternateEmail />}
        type="email"
        placeholder="Your email"
      />
      <InputEl
        name="phone"
        value={data.phone}
        onChange={handleChange}
        Icon={<Phone />}
        type="tel"
        placeholder="Your Phone"
      />
      <textarea
        name="query"
        value={data.query}
        onChange={handleChange}
        rows={3}
        className="rounded mb-3 px-2 py-1 w-full focus:outline-none  border-x-4 border-buttonSuccess"
        placeholder="Enter your query to be asked"
      />
      <ButtonEl Icon={<Help />} label="Get Quotes" callback={getQuotes} />
    </>
  );
};

export { Signup, Login, Quotes, AdminLogin };
