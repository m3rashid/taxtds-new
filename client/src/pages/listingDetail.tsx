import React from "react";
import { Helmet } from "react-helmet";
import { MdPerson } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Header from "../components/customHeader";
import Footer from "../components/main/footer";
import { Loader } from "../components/atoms/loader";
import { IListingDetail } from "../store/interfaces";
import { cloudinaryInitial } from "../hooks/helpers";
import useListings from "../hooks/useListings";
import AddReview from "../components/addReview";

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
    <p>
      <span className="font-semibold">{label}</span>
      {value}
    </p>
  );
};

const ListingDetail = () => {
  const location = useLocation();
  const listingId = location.pathname.split("/")[2];
  const [listing, setListing] = React.useState<IListingDetail>();
  const { getOneListing, addReview } = useListings();

  React.useEffect(() => {
    getOneListing(listingId).then((gotListing) =>
      setListing(gotListing.listing)
    );
  }, []);

  if (!listing) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        {/* TODO handle OG tags here */}
        <title>{`Taxtds - ${listing.brandName}`}</title>
      </Helmet>

      <Header
        greeting={listing.brandName || ""}
        subtitle={listing.tagline}
        person={false}
      />
      <div className="min-h-[25vh] grid grid-cols-1 md:grid-cols-2 md:gap-[30px] mb-8 max-w-[1400px]">
        <div className="p-[10px] md:p-[15px] w-full md:w-auto flex flex-col gap-[15px] order-last md:order-1">
          <React.Suspense fallback={<Loader />}>
            <LazyLoadImage
              className="max-w-[600px] w-full rounded-md shadow-md"
              src={cloudinaryInitial + listing.avatar.url}
              alt={listing.brandName || ""}
            />
            {listing.gallery.map((image) => (
              <LazyLoadImage
                key={image._id}
                alt={listing.brandName}
                src={cloudinaryInitial + image.url}
                placeholderSrc={cloudinaryInitial + image.url}
                className="max-w-[600px] w-full rounded-md shadow-md"
              />
            ))}
          </React.Suspense>
        </div>
        <div className="p-[10px] md:p-[15px] order-2">
          <ListBox title="General Service Details">
            <ListBoxItem label="Established : " value={listing.established} />
            <ListBoxItem label="Phone Number : " value={listing.phone} />
            <ListBoxItem label="Email Address : " value={listing.email} />
            <ListBoxItem
              label="Address : "
              value={listing.addressLineOne + ", " + listing.addressLineTwo}
            />
            <ListBoxItem label="Address (state) : " value={listing.state} />
          </ListBox>
          <ListBox title="Listing Owner">
            <ListBoxItem label="Name : " value={listing.owner} />
          </ListBox>
          <ListBox title="Listing Added By">
            <ListBoxItem label="Name : " value={listing.addedBy.name} />
            <ListBoxItem
              label="Phone Number : "
              value={listing.addedBy.phone}
            />
            <ListBoxItem
              label="Email Address : "
              value={listing.addedBy.email}
            />
            <ListBoxItem
              label="Experience : "
              value={listing.addedBy.experience}
            />
            <ListBoxItem
              label="Address : "
              value={
                listing.addedBy.addressLineOne +
                ", " +
                listing.addedBy.addressLineTwo
              }
            />
            <ListBoxItem
              label="Address (state) : "
              value={listing.addedBy.state}
            />
            <ListBoxItem
              label="Professions : "
              value={listing.addedBy.professions.join(", ") || " - "}
            />
          </ListBox>
          <ListBox title="All services offered">
            <div className="pt-[10px]">
              {listing.services.map((service) => (
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
              {listing.reviews.length !== 0 ? (
                <div className="flex gap-3 flex-col items-center">
                  {listing.reviews.map((review) => {
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
        <AddReview listingId={listing._id!} />
      </div>
      <Footer />
    </>
  );
};

export default ListingDetail;
