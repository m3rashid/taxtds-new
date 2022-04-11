interface IPropsTopLink {
  name: string;
  Icon: any;
  callback: React.MouseEventHandler;
}

const TopLink: React.FC<IPropsTopLink> = ({ name, Icon, callback }) => {
  return (
    <div
      className="flex items-center gap-2 text-accentOne m-[5px] hover:bg-lightHover rounded-md px-2 py-1"
      onClick={callback}
    >
      {Icon}
      <p>{name}</p>
    </div>
  );
};

export default TopLink;
