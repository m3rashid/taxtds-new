import React from "react";
import {
  MdPerson,
  MdRateReview,
  MdThumbsUpDown,
  MdGrade,
} from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "../components/customHeader";
import Footer from "../components/main/footer";
import InputEl from "../components/atoms/Input";
import ButtonEl from "../components/atoms/Button";
import { Loader } from "../components/atoms/loader";
import { IListingDetail } from "../store/interfaces";
import axios from "axios";
import {
  cloudinaryInitial,
  defaultHeader,
  SERVER_ROOT_URL,
} from "../hooks/helpers";
import Carousel from "../components/main/carousel";

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
  const galleryImages = demoListing.gallery.reduce((acc, curr) => {
    return [...acc, { key: curr._id, imageUrl: cloudinaryInitial + curr.url }];
  }, [] as any);

  // TODO handle OG tags
  document.title = `Taxtds - ${demoListing.brandName}`;
  return (
    <>
      <Header
        greeting={demoListing.brandName || ""}
        subtitle={demoListing.tagline}
        person={false}
      />
      <div className="min-h-[25vh] grid grid-cols-1 md:grid-cols-2 gap-[30px] mb-8 max-w-[1400px]">
        <div className="p-[10px] md:p-[15px] w-full md:w-auto flex flex-col gap-[15px]">
          <React.Suspense fallback={<Loader />}>
            <LazyLoadImage
              className="max-w-[600px] w-full rounded-md"
              src={cloudinaryInitial + demoListing.avatar.url}
              alt={demoListing.brandName || ""}
            />
            {demoListing.gallery.map((image) => (
              <LazyLoadImage
                key={image._id}
                alt={demoListing.brandName}
                src={cloudinaryInitial + image.url}
                placeholderSrc={cloudinaryInitial + image.url}
                className="max-w-[600px] w-full rounded-md"
              />
            ))}
          </React.Suspense>
        </div>
        <div className="p-[10px] md:p-[15px]">
          <div className="bg-[white] hover:bg-lightHover mb-[20px] p-[10px] rounded-md shadow-md">
            <h2 className="text-left mb-2 text-2xl font-bold">
              General Service Details
            </h2>
            <p className="font-bold">
              <span className="font-semibold">Established: </span>
              {demoListing.established}
            </p>
            <p className="font-bold">
              <span className="font-semibold">Phone Number: </span>
              {demoListing.phone}
            </p>
            <p className="font-bold">
              <span className="font-semibold">Email Address: </span>
              {demoListing.email}
            </p>
            <p className="font-bold">
              <span className="font-semibold">Address: </span>
              {demoListing.addressLineOne + ", " + demoListing.addressLineTwo}
            </p>
            <p className="font-bold">
              <span className="font-semibold">Address (state): </span>
              {demoListing.state}
            </p>
          </div>
          <div className="bg-[white] hover:bg-lightHover mb-[20px] p-[10px] rounded-md shadow-md">
            <h2 className="text-left mb-2 text-2xl font-bold">
              Service Owner Details
            </h2>
            <p className="font-bold">
              <span className="font-semibold">Name: </span>
              {demoListing.owner}
            </p>
          </div>

          <div className="bg-[white]  mb-[20px] p-[10px] rounded-md shadow-md">
            <h2 className="text-center text-2xl font-bold">
              All services offered
            </h2>
            <div className="py-[10px]">
              {demoListing.services.map((service) => (
                <div
                  key={service.name}
                  className="py-[6px] px-[15px] rounded-md mb-[5px] font-semibold shadow-sm hover:bg-lightHover"
                >
                  {service.name}
                </div>
              ))}
            </div>
          </div>
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
                            <p className="font-semibold">
                              Name:
                              <span className="font-bold"> {review.name}</span>
                            </p>
                            <p className="font-semibold">
                              Rating:
                              <span className="font-bold">
                                &nbsp; {review.rating}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="">
                          <p className="font-semibold">
                            Review:
                            <span className="font-medium">
                              &nbsp; {review.review}
                            </span>
                          </p>
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
