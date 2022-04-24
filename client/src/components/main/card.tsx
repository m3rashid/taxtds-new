import {
  MdEmail,
  MdPhone,
  MdAttachMoney,
  MdInfo,
  MdEdit,
} from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";

import ButtonEl from "../atoms/Button";
import ButtonLink from "../atoms/ButtonLink";
import { cloudinaryInitial } from "../../hooks/helpers";
import { IListing } from "../../store/interfaces";
import { useRecoilValue } from "recoil";
import { authState } from "../../store/auth";

export const EmptyCard: React.FC<{}> = () => {
  return (
    <div className="bg-[white] hover:bg-lightHover w-[94vw] md:w-auto md:min-w-[350px] lg:min-w-[520px] rounded-md p-[20px] shadow-md">
      <h3 className="text-2xl lg:text-xl font-bold">No Listings found</h3>
    </div>
  );
};

const Tag = ({
  label = "featured",
  bgColor = "bg-accentOne",
  textColor = "text-white",
}) => {
  return (
    <div
      className={`absolute top-6 -right-10 h-10 w-[165px] ${bgColor} ${textColor} rotate-45 flex items-center justify-center font-bold`}
    >
      {label}
    </div>
  );
};

interface IProps {
  listing: IListing;
  isUserPage?: boolean;
}

const Card: React.FC<IProps> = ({ listing, isUserPage = false }) => {
  const { user } = useRecoilValue(authState);
  const userId = user._id || null;

  return (
    <>
      <div className="bg-[white] hover:bg-lightHover w-[94vw] md:w-auto md:min-w-[350px] lg:min-w-[520px] rounded-md p-[20px] shadow-md relative overflow-hidden">
        {listing.featured && <Tag />}
        <div className="mb-3">
          <h3 className="text-2xl lg:text-3xl font-bold">
            {listing.brandName}
          </h3>
          <p className="ml-4"> ~ {listing.tagline}</p>
        </div>
        <div className="flex flex-row gap-4 md:gap-8 mb-4">
          <LazyLoadImage
            className="w-24 h-24 rounded-full"
            src={cloudinaryInitial + listing.avatar.url}
            alt={listing.brandName}
          />
          <div className="grow">
            <p className="font-semibold">
              Owner: <span className="font-semibold">{listing.owner}</span>
            </p>
            <p className="font-semibold">
              State: <span className="font-semibold">{listing.state}</span>
            </p>
            <p className="font-semibold flex items-center gap-2">
              <MdPhone />
              <span className="font-semibold">{listing.phone}</span>
            </p>
            <p className="font-semibold flex items-center gap-2">
              <MdEmail />
              <span className="font-semibold">{listing.email}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-2 flex-wrap">
          <ButtonLink
            bgColor="bg-accentTwo"
            Icon={<MdInfo />}
            label="Show Details"
            to={`/listings/${listing._id}`}
          />
          <ButtonEl Icon={<MdPhone />} label="Call Now" callback={() => {}} />
          <ButtonEl
            Icon={<MdAttachMoney />}
            bgColor="bg-buttonDanger"
            textColor="text-[white]"
            label="Get Quotes"
            callback={() => {}}
          />
          {isUserPage && (
            <ButtonLink
              Icon={<MdEdit />}
              label="Edit"
              to={`/user/${userId}/${listing._id}/edit`}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
