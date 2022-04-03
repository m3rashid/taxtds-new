import React from "react";
import Select from "react-select";
import { MdLocationOn } from "react-icons/md";

import StateUt from "../../data/state";

interface IProps {
  data?: any;
  setData: Function;
}

const StateSelector = ({ data, setData }: IProps) => {
  const options = React.useMemo(
    () =>
      StateUt.sort().map((item) => {
        return {
          value: item,
          label: item,
        };
      }),
    []
  );

  const handleSelectChange = (option: any) => {
    setData((prev: any) => ({
      ...prev,
      state: option.value,
    }));
  };

  return (
    <div className="flex flex-row items-center w-full mb-[15px] border-x-4 border-buttonSuccess rounded-md shadow-md bg-[white] pl-[8px]">
      <MdLocationOn />
      <Select
        className="w-full"
        onChange={handleSelectChange}
        placeholder="Select State"
        options={options}
        styles={{
          control: (base) => ({
            ...base,
            border: "none",
            boxShadow: "none",
          }),
          menuList: (base, state) => ({
            ...base,
            paddingRight: "8px",
            paddingLeft: "8px",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? "#D5EBF5" : "#fff",
            borderRadius: "4px",
            color: "#141F31",
            ":hover": {
              backgroundColor: "#fdf2d4",
            },
          }),
        }}
      />
    </div>
  );
};

export default StateSelector;
