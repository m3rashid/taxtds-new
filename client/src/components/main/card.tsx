import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";
import RateReview from "@material-ui/icons/RateReview";
import AttachMoney from "@material-ui/icons/AttachMoney";

import ButtonEl from "../atoms/Button";

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
      <div className="bg-[white] hover:bg-accentTwo md:min-w-[350px] lg:min-w-[520px] rounded-md mb-[30px] p-[20px] shadow-md">
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
              <Phone />
              <span className="font-semibold">{phone}</span>
            </p>
            <p className="font-semibold flex items-center gap-2">
              <Email />
              <span className="font-semibold">{email}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <ButtonEl Icon={<Phone />} label="Call Now" callback={() => {}} />
          <ButtonEl
            Icon={<RateReview />}
            label="Write Review"
            callback={() => {}}
          />
          <ButtonEl
            Icon={<AttachMoney />}
            label="Get Quotes"
            callback={() => {}}
          />
        </div>
      </div>
    </>
  );
};

export default Card;
