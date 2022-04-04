import React from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

interface IInputElProps {
  Icon?: any;
  type: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler;
  min?: number;
  max?: number;
  placeholder?: string;
  border?: boolean;
}

const InputEl = ({
  Icon,
  type,
  min,
  max,
  name,
  value,
  onChange,
  placeholder,
  border = true,
}: IInputElProps) => {
  const [passwordType, setpasswordType] = React.useState("password");
  const showPassword = (e: any) => {
    if (passwordType === "password") {
      setpasswordType("text");
    } else {
      setpasswordType("password");
    }
  };

  return (
    <div
      className={`flex flex-row items-center w-full bg-[white] mb-[15px] pl-[8px] h-[35px] rounded-md shadow-md ${
        border && "border-x-4 border-buttonSuccess"
      }`}
    >
      {Icon}
      <input
        name={name}
        min={min}
        max={max}
        onChange={onChange}
        type={type === "password" ? passwordType : type}
        className={`h-[35px] pl-[10px] w-full focus:outline-none ${
          type !== "password" ? "rounded-r" : ""
        }`}
        placeholder={placeholder}
        value={value}
      />
      {type === "password" ? (
        passwordType === "password" ? (
          <MdVisibilityOff className="m-[8px]" onClick={showPassword} />
        ) : (
          <MdVisibility className="m-[8px]" onClick={showPassword} />
        )
      ) : null}
    </div>
  );
};

export default InputEl;
