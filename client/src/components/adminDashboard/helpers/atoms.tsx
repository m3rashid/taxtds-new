import React from "react";

export const profilePhotoStyles = {
  maxWidth: "50px",
};

export const ProfilePhoto = ({ avatar }: { avatar?: string }) => {
  if (!avatar) return null;
  return <img className="w-10 h-10 rounded-full" src={avatar} alt="" />;
};

export const Button = ({
  label,
  onClick,
  color,
  textColor,
}: {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  color: string;
  textColor?: string;
}) => {
  return (
    <>
      <button
        className={`${color} ${
          textColor ? textColor : "text-lightBgOne"
        } rounded-md px-3 py-2 font-semibold`}
        onClick={onClick}
      >
        {label}
      </button>
    </>
  );
};

interface IProps {
  title: String;
}
// add a table refresh button

export const TableHeader = ({ title }: IProps) => {
  return (
    <>
      <h1 className="text-xl font-bold">{title}</h1>
    </>
  );
};
