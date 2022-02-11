interface IButtonProps {
  label: string;
  callback: React.MouseEventHandler<HTMLButtonElement>;
  bgColor?: string;
  textColor?: string;
}

const ButtonEl = ({ label, callback, bgColor, textColor }: IButtonProps) => {
  return (
    <button
      onClick={callback}
      className={`${bgColor ? bgColor : "bg-buttonDanger"} ${
        textColor ? textColor : "text-lightBgOne"
      } py-[5px] px-[15px] min-w-[100px] rounded`}
    >
      {label}
    </button>
  );
};

export default ButtonEl;
