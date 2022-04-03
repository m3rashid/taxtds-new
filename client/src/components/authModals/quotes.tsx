import { MdPerson, MdAlternateEmail, MdPhone, MdHelp } from "react-icons/md";

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
        Icon={<MdPerson />}
        type="text"
        placeholder="Your Organisation Name"
      />
      <InputEl
        name="email"
        value={data.email}
        onChange={handleChange}
        Icon={<MdAlternateEmail />}
        type="email"
        placeholder="Your email"
      />
      <InputEl
        name="phone"
        value={data.phone}
        onChange={handleChange}
        Icon={<MdPhone />}
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
        <ButtonEl Icon={<MdHelp />} label="Get Quotes" callback={getQuotes} />
      </div>
    </>
  );
};

export default Quotes;
