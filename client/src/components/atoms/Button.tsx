interface IButtonProps {
  label: string;
  callback?: React.MouseEventHandler<HTMLButtonElement>;
  bgColor?: string;
  textColor?: string;
  Icon?: React.ReactElement;
  iconAfter?: boolean;
  disabled?: boolean;
  compact?: boolean;
}

const ButtonEl = ({
  label,
  callback,
  bgColor,
  textColor,
  Icon,
  iconAfter = false,
  disabled = false,
  compact = false,
}: IButtonProps) => {
  return (
    <button
      onClick={callback}
      className={`${bgColor ? bgColor : "bg-buttonSuccess"} ${
        textColor ? textColor : "text-accentOne"
      } ${disabled ? "bg-gray-400" : "hover:opacity-80"} ${
        compact ? "py-[15px] px-[20px]" : "min-w-[100px] py-[5px] px-[15px]"
      }   mb-3 inline-block rounded-md`}
      disabled={disabled}
    >
      <div className="flex items-center justify-center font-bold gap-2">
        {iconAfter === false && Icon ? Icon : null}
        {label}
        {iconAfter === true && Icon ? Icon : null}
      </div>
    </button>
  );
};

export default ButtonEl;
