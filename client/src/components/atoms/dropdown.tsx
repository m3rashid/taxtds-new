import React from "react";
import { MdExpandMore } from "react-icons/md";

interface IProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  name?: string;
  Icon?: any;
}

const Dropdown: React.FC<IProps> = ({
  name,
  Icon,
  children,
  open,
  setOpen,
}) => {
  return (
    <div className="relative inline-block text-left z-50 shadow-2xl">
      <div
        className="flex items-center gap-1 text-lightBgOne m-[5px] hover:text-lightHover"
        onClick={() => setOpen(!open)}
      >
        {Icon || <MdExpandMore size={25} className="ml-2" />}
        <p>{name || "Actions"}</p>
      </div>
      <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        {open && <div className="py-1 z-50">{children}</div>}
      </div>
    </div>
  );
};

export default Dropdown;
