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
  name: string;
  Icon?: any;
  className?: string;
  placeholder?: string;
  options?: any[];
  customOptions?: any[];
  data?: any;
  setData?: Function;
  border?: boolean;
  value: any;
  single?: boolean;
  suffix?: string;
  prefix?: string;
  useDefaultFilter?: boolean;
  handleChange?: Function;
  isMulti?: boolean;
}

export const ReactSelect: React.FC<IProps> = ({
  name,
  Icon,
  className,
  placeholder,
  options = [],
  customOptions = [],
  data,
  setData = () => {},
  border = true,
  value,
  single,
  suffix = "",
  prefix = "",
  useDefaultFilter = true,
  handleChange = () => {},
  isMulti = false,
}) => {
  const filterOptions = React.useMemo(
    () =>
      options?.sort().map((item) => {
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
        [name]: option.value,
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
        name={name}
        className={`w-full ${className}`}
        placeholder={placeholder}
        options={useDefaultFilter ? filterOptions : customOptions}
        styles={reactSelectStyleOptions}
        onChange={useDefaultFilter ? handleSelectChange : (handleChange as any)}
        isMulti={isMulti}
      ></Select>
    </div>
  );
};
