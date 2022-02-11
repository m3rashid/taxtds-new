import Cancel from "@material-ui/icons/Cancel";

const CloseEl = ({ callback }: { callback: React.MouseEventHandler }) => {
  return (
    <span className="cursor-pointer mb-2" onClick={callback}>
      <Cancel className="hover:text-buttonDanger" fontSize="large" />
    </span>
  );
};

export default CloseEl;
