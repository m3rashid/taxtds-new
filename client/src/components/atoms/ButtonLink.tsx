import { Link } from "react-router-dom";

interface IButtonProps {
  label: string;
  to: string;
  bgColor?: string;
  textColor?: string;
  Icon?: React.ReactElement;
}

const ButtonLink = ({ label, to, bgColor, textColor, Icon }: IButtonProps) => {
  return (
    <Link to={to}>
      <span
        className={`${bgColor ? bgColor : "bg-accentTwo"} ${
          textColor ? textColor : "text-accentOne"
        } py-[5px] px-[15px] min-w-[100px] rounded-md flex items-center justify-center font-bold gap-2 hover:opacity-80`}
      >
        {Icon ? Icon : null}
        {label}
      </span>
    </Link>
  );
};

export default ButtonLink;
