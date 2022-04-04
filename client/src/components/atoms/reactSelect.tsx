import React from "react";
import Select, { CSSObjectWithLabel } from "react-select";

export const reactSelectStyleOptions = {
  control: (base: CSSObjectWithLabel) => ({
    ...base,
    border: "none",
    boxShadow: "none",
  }),
  menuList: (base: CSSObjectWithLabel, state: any) => ({
    ...base,
    paddingRight: "8px",
    paddingLeft: "8px",
  }),
  option: (base: CSSObjectWithLabel, state: any) => ({
    ...base,
    backgroundColor: state.isSelected ? "#D5EBF5" : "#fff",
    borderRadius: "4px",
    color: "#141F31",
    ":hover": {
      backgroundColor: "#fdf2d4",
    },
  }),
};

interface IProps {
  Icon?: any;
  className?: string;
  placeholder?: string;
  options?: any;
  data?: any;
  setData: Function;
  border?: boolean;
  value: any;
  single?: boolean;
  suffix?: string;
  prefix?: string;
}

export const ReactSelect: React.FC<IProps> = ({
  Icon,
  className,
  placeholder,
  options,
  data,
  setData,
  border = true,
  value,
  single,
  suffix,
  prefix = "",
}) => {
  const filterOptions = React.useMemo(
    () =>
      options.sort().map((item: string) => {
        return {
          label: `${prefix} ${item} ${suffix}`,
          value: item,
        };
      }),
    [options, prefix, suffix]
  );

  const handleSelectChange = (option: any) => {
    if (single) {
      setData(option.value);
    } else {
      setData((prev: any) => ({
        ...prev,
        [value]: option.value,
      }));
    }
  };

  return (
    <div
      className={`flex flex-row items-center w-full min-w-[150px] mb-[15px] rounded-md shadow-md bg-[white] pl-[8px] ${
        border && "border-x-4 border-buttonSuccess"
      }`}
    >
      {Icon && Icon}
      <Select
        className={`w-full ${className}`}
        placeholder={placeholder}
        options={filterOptions}
        styles={reactSelectStyleOptions}
        onChange={handleSelectChange}
      ></Select>
    </div>
  );
};
