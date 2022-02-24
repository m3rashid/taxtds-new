import AlternateEmail from "@material-ui/icons/AlternateEmail";
import Person from "@material-ui/icons/Person";
import Phone from "@material-ui/icons/Phone";
import Help from "@material-ui/icons/Help";

import InputEl from "../atoms/Input";
import ButtonEl from "../atoms/Button";
import React from "react";

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
      <div className="flex flex-col w-full">
        <ButtonEl Icon={<Help />} label="Get Quotes" callback={getQuotes} />
      </div>
    </>
  );
};

export default Quotes;
