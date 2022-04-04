import { MdEmail, MdPhone, MdAttachMoney, MdInfo } from "react-icons/md";

import ButtonEl from "../atoms/Button";
import ButtonLink from "../atoms/ButtonLink";

const Tag = ({
  label = "featured",
  bgColor = "bg-accentOne",
  textColor = "text-[white]",
}) => {
  return (
    <>
      <div
        className={`absolute top-6 -right-10 h-10 w-[165px] ${bgColor} ${textColor} rotate-45 flex items-center justify-center font-bold`}
      >
        {label}
      </div>
    </>
  );
};

interface IProps {
  id: string | number;
  name: string;
  tagline: string;
  owner: string;
  avatar: string;
  state: string;
  phone: string;
  email: string;
  featured: boolean;
}

const Card = ({
  id,
  name,
  tagline,
  owner,
  avatar,
  state,
  phone,
  email,
  featured,
}: IProps) => {
  return (
    <>
      <div className="bg-[white] hover:bg-lightHover w-[94vw] md:w-auto md:min-w-[350px] lg:min-w-[520px] rounded-md p-[20px] shadow-md relative overflow-hidden">
        {featured && <Tag />}
        <div className="mb-3">
          <h3 className="text-2xl lg:text-3xl font-bold">{name}</h3>
          <p className="ml-4"> ~ {tagline}</p>
        </div>
        <div className="flex flex-row gap-4 md:gap-8 mb-4">
          <img className="w-24 h-24 rounded-full" src={avatar} alt={name} />
          <div className="grow">
            <p className="font-semibold">
              Owner: <span className="font-semibold">{owner}</span>
            </p>
            <p className="font-semibold">
              State: <span className="font-semibold">{state}</span>
            </p>
            <p className="font-semibold flex items-center gap-2">
              <MdPhone />
              <span className="font-semibold">{phone}</span>
            </p>
            <p className="font-semibold flex items-center gap-2">
              <MdEmail />
              <span className="font-semibold">{email}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-2 flex-wrap">
          <ButtonLink
            bgColor="bg-accentTwo"
            Icon={<MdInfo />}
            label="Show Details"
            to={`/listings/${id}`}
          />
          <ButtonEl Icon={<MdPhone />} label="Call Now" callback={() => {}} />
          <ButtonEl
            Icon={<MdAttachMoney />}
            bgColor="bg-buttonDanger"
            textColor="text-[white]"
            label="Get Quotes"
            callback={() => {}}
          />
        </div>
      </div>
    </>
  );
};

export default Card;
