import React from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

interface IInputElProps {
  Icon: any;
  type: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler;
  min?: number;
  max?: number;
  placeholder?: string;
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
      className={`flex flex-row items-center w-full border-x-4 border-buttonSuccess bg-[white] mb-[15px] pl-[8px] h-[35px] rounded-md shadow-md`}
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
          <VisibilityOff className="m-[8px]" onClick={showPassword} />
        ) : (
          <Visibility className="m-[8px]" onClick={showPassword} />
        )
      ) : null}
    </div>
  );
};

export default InputEl;
