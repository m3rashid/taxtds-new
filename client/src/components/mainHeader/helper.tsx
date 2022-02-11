import { MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TopLink = ({
  name,
  icon,
  callback,
}: {
  name: string;
  icon: any;
  callback: MouseEventHandler;
}) => {
  return (
    <div
      className="flex items-center gap-1 text-lightBgOne m-[5px] hover:text-accentTwo"
      onClick={callback}
    >
      <FontAwesomeIcon icon={icon} />
      <p>{name}</p>
    </div>
  );
};

const Input = ({
  classes,
  placeholder,
  name,
}: {
  classes?: string;
  placeholder: string;
  name: string;
}) => {
  return (
    <input
      className={`h-[30px] md:h-[40px] py-[8px] px-[10px] md:p-[10px] focus:outline-none rounded-sm ${classes}`}
      type="text"
      placeholder={placeholder}
      name={name}
    />
  );
};

export { TopLink, Input };
