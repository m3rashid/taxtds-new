import React from "react";
import axios from "axios";
import {
  MdPerson,
  MdRateReview,
  MdThumbsUpDown,
  MdGrade,
} from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useLocation } from "react-router-dom";

import Header from "../components/customHeader";
import Footer from "../components/main/footer";
import InputEl from "../components/atoms/Input";
import ButtonEl from "../components/atoms/Button";
import { Loader } from "../components/atoms/loader";
import { IListingDetail } from "../store/interfaces";
import {
  cloudinaryInitial,
  defaultHeader,
  SERVER_ROOT_URL,
} from "../hooks/helpers";

interface IListBoxProps {
  children?: React.ReactNode;
  title?: string;
}
const ListBox: React.FC<IListBoxProps> = ({ children, title }) => {
  return (
    <div className="bg-[white] hover:bg-lightHover mb-[20px] p-[10px] rounded-md shadow-md">
      <h2 className="text-left mb-2 text-2xl font-bold">{title}</h2>
      {children}
    </div>
  );
};

interface IListBoxItemProps {
  label?: string;
  value?: any;
}
const ListBoxItem: React.FC<IListBoxItemProps> = ({ label, value }) => {
  return (
    <p className="font-bold">
      <span className="font-semibold">{label}</span>
      {value}
    </p>
  );
};

const getListing = async (listingId: string) => {
  try {
    const res = await axios.post(
      `${SERVER_ROOT_URL}/listings/one`,
      JSON.stringify({ listingId }),
      defaultHeader
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const ListingDetail = () => {
  const location = useLocation();
  const listingId = location.pathname.split("/")[2];
  const [listing, setListing] = React.useState<IListingDetail>();

  React.useEffect(() => {
    getListing(listingId).then((gotListing) => setListing(gotListing));
  }, []);

  if (!listing) {
    return <Loader size={56} />;
  }

  const demoListing = listing.listing;
  const reviews = listing.reviews;
  const user = listing.listing.addedBy;

  // TODO handle OG tags
  document.title = `Taxtds - ${demoListing.brandName}`;
  return (
    <>
      <Header
        greeting={demoListing.brandName || ""}
        subtitle={demoListing.tagline}
        person={false}
      />
      <div className="min-h-[25vh] grid grid-cols-1 md:grid-cols-2 md:gap-[30px] mb-8 max-w-[1400px]">
        <div className="p-[10px] md:p-[15px] w-full md:w-auto flex flex-col gap-[15px] order-last md:order-1">
          <React.Suspense fallback={<Loader />}>
            <LazyLoadImage
              className="max-w-[600px] w-full rounded-md shadow-md"
              src={cloudinaryInitial + demoListing.avatar.url}
              alt={demoListing.brandName || ""}
            />
            {demoListing.gallery.map((image) => (
              <LazyLoadImage
                key={image._id}
                alt={demoListing.brandName}
                src={cloudinaryInitial + image.url}
                placeholderSrc={cloudinaryInitial + image.url}
                className="max-w-[600px] w-full rounded-md shadow-md"
              />
            ))}
          </React.Suspense>
        </div>
        <div className="p-[10px] md:p-[15px] order-2">
          <ListBox title="General Service Details">
            <ListBoxItem
              label="Established : "
              value={demoListing.established}
            />
            <ListBoxItem label="Phone Number : " value={demoListing.phone} />
            <ListBoxItem label="Email Address : " value={demoListing.email} />
            <ListBoxItem
              label="Address : "
              value={
                demoListing.addressLineOne + ", " + demoListing.addressLineTwo
              }
            />
            <ListBoxItem label="Address (state) : " value={demoListing.state} />
          </ListBox>
          <ListBox title="Listing Owner">
            <ListBoxItem label="Name : " value={demoListing.owner} />
          </ListBox>
          <ListBox title="Listing Added By">
            <ListBoxItem label="Name : " value={user.name} />
            <ListBoxItem label="Phone Number : " value={user.phone} />
            <ListBoxItem label="Email Address : " value={user.email} />
            <ListBoxItem label="Experience : " value={user.experience} />
            <ListBoxItem
              label="Address : "
              value={user.addressLineOne + ", " + user.addressLineTwo}
            />
            <ListBoxItem label="Address (state) : " value={user.state} />
            <ListBoxItem
              label="Professions : "
              value={user.professions.join(", ") || " - "}
            />
          </ListBox>
          <ListBox title="All services offered">
            <div className="pt-[10px]">
              {demoListing.services.map((service) => (
                <ListBoxItem key={service.name} label={service.name} />
              ))}
            </div>
          </ListBox>
        </div>
      </div>
      <div className="min-h-[25vh] grid gap-[10px] grid-cols-1 md:grid-cols-2 max-w-[1400px] w-full md:w-auto mb-[30px]">
        <div className="order-last md:order-none w-full">
          <h2 className="text-center text-2xl font-bold">
            Reviews from customers
          </h2>
          <div className="p-[10px] md:p-[15px]">
            <React.Suspense fallback={<Loader />}>
              {reviews.length !== 0 ? (
                <div className="flex gap-3 flex-col items-center">
                  {reviews.map((review) => {
                    return (
                      <div
                        key={review._id}
                        className="bg-[white] hover:bg-lightHover rounded-md shadow-md gap-3 p-3 w-full max-w-[400px]"
                      >
                        <div className="flex items-center w-full gap-6 mb-2">
                          <div className="p-2 bg-accentTwo rounded-full">
                            <MdPerson fontSize="large" />
                          </div>
                          <div className="">
                            <ListBoxItem label="Name : " value={review.name} />
                            <ListBoxItem
                              label="Rating : "
                              value={review.rating}
                            />
                          </div>
                        </div>
                        <div className="">
                          <ListBoxItem
                            label="Review : "
                            value={review.review}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-[white] hover:bg-lightHover rounded-md shadow-md gap-3 p-3 w-full">
                  <p className="">No rating/reviews yet</p>
                </div>
              )}
            </React.Suspense>
          </div>
        </div>
        <div className="w-full md:min-w-[400px]">
          <h2 className="text-center text-2xl font-bold">Write a review</h2>
          <div className="p-[10px] md:p-[15px]">
            <div className="bg-[white] p-4 rounded-md shadow-md">
              <InputEl
                Icon={<MdPerson />}
                name="name"
                onChange={() => {}}
                placeholder="Name"
                type="text"
                value=""
              />
              <InputEl
                Icon={<MdGrade />}
                name="rating"
                onChange={() => {}}
                type="number"
                placeholder="Rating"
                min={0}
                max={10}
                value=""
              />
              <InputEl
                Icon={<MdRateReview />}
                name="review"
                onChange={() => {}}
                placeholder="Review"
                type="text"
                value=""
              />
              <ButtonEl
                Icon={<MdThumbsUpDown />}
                label="Post Review"
                callback={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListingDetail;
