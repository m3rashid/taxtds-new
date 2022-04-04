import React from "react";

interface IProps {
  value: string;
}

export const StatusPill: React.FC<IProps> = ({ value }) => {
  const status = value ? value.toLowerCase() : "unknown";

  return (
    <span
      className={`px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm
        ${status.startsWith("active") && "bg-green-100 text-green-800"},
        ${status.startsWith("inactive") && "bg-yellow-100 text-yellow-800"},
        ${status.startsWith("offline") && "bg-red-100 text-red-800"}`}
    >
      {status}
    </span>
  );
};

interface IAvatarCell {
  value: any;
  column: any;
  row: any;
}
export const AvatarCell: React.FC<IAvatarCell> = ({ value, column, row }) => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10">
        <img
          className="h-10 w-10 rounded-full"
          src={row.original[column.imgAccessor]}
          alt=""
        />
      </div>
      <div className="ml-4">
        <div className="text-sm font-medium text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">
          {row.original[column.emailAccessor]}
        </div>
      </div>
    </div>
  );
};

interface IButton {
  children?: any;
  className?: string;
  onClick?: any;
  disabled?: boolean;
}
export const Button: React.FC<IButton> = ({
  children,
  className,
  onClick,
  disabled,
}) => {
  return (
    <button
      type="button"
      className={`
        "relative inline-flex items-center p-2 text-sm font-medium rounded-md text-accentOne hover:bg-accentTwo 
         ${className}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const PageButton: React.FC<IButton> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={`
        "relative inline-flex items-center p-2 text-sm font-medium text-accentOne hover:bg-accentTwo 
        ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
