interface IButtonProps {
  label: string;
  callback?: React.MouseEventHandler<HTMLButtonElement>;
  bgColor?: string;
  textColor?: string;
  Icon?: React.ReactElement;
}

const ButtonEl = ({
  label,
  callback,
  bgColor,
  textColor,
  Icon,
}: IButtonProps) => {
  return (
    <button
      onClick={callback}
      className={`${bgColor ? bgColor : "bg-buttonSuccess"} ${
        textColor ? textColor : "text-accentOne"
      } py-[5px] px-[15px] min-w-[100px] rounded-md  hover:opacity-80 mb-3 inline-block`}
    >
      <div className="flex items-center justify-center font-bold gap-2">
        {Icon ? Icon : null}
        {label}
      </div>
    </button>
  );
};

export default ButtonEl;
