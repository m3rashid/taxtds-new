import { MdCancel } from "react-icons/md";

const CloseEl = ({ callback }: { callback: React.MouseEventHandler }) => {
  return (
    <span className="cursor-pointer mb-2" onClick={callback}>
      <MdCancel className="hover:text-buttonDanger" fontSize="large" />
    </span>
  );
};

export default CloseEl;
