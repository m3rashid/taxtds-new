import React from "react";

const TopLink = ({
  name,
  Icon,
  callback,
}: {
  name: string;
  Icon: any;
  callback: React.MouseEventHandler;
}) => {
  return (
    <div
      className="flex items-center gap-1 text-lightBgOne m-[5px] hover:text-buttonSuccess"
      onClick={callback}
    >
      {Icon}
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
