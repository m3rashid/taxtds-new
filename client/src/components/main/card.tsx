interface IProps {
  name: string;
  tagline: string;
  owner: string;
  avatar: string;
  state: string;
  phone: string;
  email: string;
}

const Card = ({
  name,
  tagline,
  owner,
  avatar,
  state,
  phone,
  email,
}: IProps) => {
  return (
    <>
      <div className="bg-[white] hover:bg-accentTwo md:min-w-[350px] lg:min-w-[520px] rounded-md mb-[30px] p-[20px]">
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold">{name}</h3>
          <div className="">{tagline}</div>
          <p className="">
            Owner: <span className="">{owner}</span>
          </p>
          <img src={avatar} alt={name} />
          <p className="">{state}</p>
        </div>
        {/* action buttons */}
        <div className="flex flex-row"></div>
      </div>
    </>
  );
};

export default Card;
