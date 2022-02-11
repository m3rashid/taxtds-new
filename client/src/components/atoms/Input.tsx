import { useState, ChangeEventHandler } from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

interface IInputElProps {
  Icon: any;
  type: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler;
  placeholder: string;
}

const InputEl = ({
  Icon,
  type,
  name,
  value,
  onChange,
  placeholder,
}: IInputElProps) => {
  const [passwordType, setpasswordType] = useState("password");
  const showPassword = (e: any) => {
    if (passwordType === "password") {
      setpasswordType("text");
    } else {
      setpasswordType("password");
    }
  };

  return (
    <div
      className={`flex flex-row items-center w-full border-x-4 border-buttonDanger bg-[white] mb-[15px] pl-[8px] h-[35px] rounded`}
    >
      {Icon}
      <input
        name={name}
        onChange={onChange}
        type={type === "password" ? passwordType : type}
        className={`h-[35px] pl-[10px] w-full focus:outline-none ${
          type !== "password" ? "rounded-r" : ""
        }`}
        placeholder={placeholder}
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
