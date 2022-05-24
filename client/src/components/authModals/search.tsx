import React from "react";
import {
  MdHomeRepairService,
  MdNotListedLocation,
  MdSearch,
} from "react-icons/md";

import ButtonEl from "../atoms/Button";
import InputEl from "../atoms/Input";

interface IProps {
  setModal: (e: any) => void;
}

const Search: React.FC<IProps> = ({ setModal }) => {
  const [search, setSearch] = React.useState({
    state: "",
    service: "",
  });

  const handleSearch = () => {
    setModal("");
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <InputEl
        name="state"
        value={search.state}
        onChange={handleChange}
        Icon={<MdNotListedLocation />}
        type="text"
        placeholder="Enter state"
      />
      <InputEl
        name="service"
        value={search.service}
        onChange={handleChange}
        Icon={<MdHomeRepairService />}
        type="text"
        placeholder="Enter service"
      />
      <div className="flex flex-col w-full">
        <ButtonEl Icon={<MdSearch />} label="Search" callback={handleSearch} />
      </div>
    </>
  );
};

export default Search;
