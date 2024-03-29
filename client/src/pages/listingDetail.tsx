import React from "react";
import moment from "moment";
import { Helmet } from "react-helmet";
import { MdPerson } from "react-icons/md";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import useListings from "../hooks/useListings";
import Footer from "../components/main/footer";
import Header from "../components/customHeader";
import AddReview from "../components/addReview";
import { Loader } from "../components/atoms/loader";
import { IListingDetail } from "../store/interfaces";
import { cloudinaryInitial } from "../hooks/helpers";

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
  const { id: listingId } = useParams();
  const [listing, setListing] = React.useState<IListingDetail>();
  const { getOneListing } = useListings();
  const [reviewAdded, setReviewAdded] = React.useState(false);

  React.useEffect(() => {
    getOneListing(listingId!)
      .then((gotListing) => setListing(gotListing.listing))
      .catch();
  }, [reviewAdded]);

  if (!listing) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>{`Taxtds - ${listing.brandName}`}</title>
        <meta name="og:title" content={`Taxtds - ${listing.brandName}`} />
        <meta name="twitter:title" content={`Taxtds - ${listing.brandName}`} />

        <meta
          name="description"
          content={listing.brandName + "- " + listing.tagline}
        />
        <meta
          name="twitter:description"
          content={listing.brandName + "- " + listing.tagline}
        />
        <meta
          name="og:description"
          content={listing.brandName + "- " + listing.tagline}
        />

        <meta
          name="keywords"
          content={
            listing.addedBy.professions.map((a: any) => a.name).join(", ") +
            ", " +
            listing.services.map((service) => service.name).join(", ")
          }
        />

        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:image"
          content={cloudinaryInitial + listing.avatar.url}
        />
        <meta
          name="og:image"
          content={cloudinaryInitial + listing.avatar.url}
        />
        <meta name="og:url" content={window.location.href} />
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
              value={
                listing.addedBy.professions
                  .map((a: any) => a.name)
                  .join(", ") || " - "
              }
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
                  {listing.reviews.map((review) => (
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
                        <ListBoxItem label="Review : " value={review.review} />
                        <ListBoxItem
                          label="On: "
                          value={moment(review.createdAt).format("LLLL")}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[white] hover:bg-lightHover rounded-md shadow-md gap-3 p-3 w-full">
                  <p className="">No rating/reviews yet</p>
                </div>
              )}
            </React.Suspense>
          </div>
        </div>
        <AddReview listingId={listing._id!} setReviewAdded={setReviewAdded} />
      </div>
      <Footer />
    </>
  );
};

export default ListingDetail;
