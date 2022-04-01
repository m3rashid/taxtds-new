import React from "react";
import Select from "react-select";
import HomeWork from "@material-ui/icons/HomeWork";

interface IProps {
  data?: any;
  setData: Function;
}

const comingData: string[] = [];

const ServiceSelector = ({ data, setData }: IProps) => {
  const options = React.useMemo(
    () =>
      comingData.sort().map((item: string) => {
        return {
          label: item,
          lebel: item,
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
      <HomeWork />
      <Select
        className="w-full"
        onChange={handleSelectChange}
        placeholder="Select Service"
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

export default ServiceSelector;
