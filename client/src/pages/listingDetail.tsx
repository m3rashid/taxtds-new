import React from "react";
import {
  MdPerson,
  MdRateReview,
  MdThumbsUpDown,
  MdGrade,
} from "react-icons/md";

import Header from "../components/customHeader";
import Footer from "../components/main/footer";
import InputEl from "../components/atoms/Input";
import ButtonEl from "../components/atoms/Button";
import { Loader } from "../components/atoms/loader";

const demoService = {
  id: 1,
  name: "Rashid lsdjfalsd",
  tagline: "jsdfl asdflaksdfa sldkad",
  avatar: "/images/carousel/1.jpg",
  gallery: [
    "/images/carousel/2.jpg",
    "/images/carousel/3.jpg",
    "/images/carousel/4.jpg",
  ],
  established: 2004,
  owner: "Rashid",
  addressLineOne: "lskdjflkasd falksdjfla sdflkasjdf akdjf",
  addressLineTwo: "lkdjfa ldkfasdl fkasdlfkajsd fllkj",
  state: "delhi",
  services: [
    { name: "Registration Services" },
    { name: "Company Compliance" },
    { name: "Tax Filling" },
    { name: "Audit And Insurance" },
    { name: "Taxation Advisory And Personal Advisory" },
    { name: "FCRA FEMA NGOs" },
    { name: "Valuations" },
    { name: "Accounting Services" },
    { name: "Investment Planning" },
    { name: "GST Return" },
  ],
  reviews: [
    { name: "Anonymous", rating: 5, review: "Good" },
    {
      name: "Anon69",
      rating: 2,
      review:
        "niiace sdkfjas ldfkjas dlfkasjd flkajsdflaks dflkdfj lakdfjla skdfjsdiluwopiej slkdfjas ldkfjasldfkjasl dkfsadf",
    },
  ],
  phone: "4952903453",
  email: "user@wwamil.com",
  featured: false,
};

const ListingDetail = () => {
  // TODO handle OG tags
  document.title = `Taxtds - ${demoService.name}`;
  return (
    <>
      <Header
        greeting={demoService.name}
        subtitle={demoService.tagline}
        person={false}
      />
      <div className="slideshow"></div>
      <div className="min-h-[25vh] grid grid-cols-1 md:grid-cols-2 gap-[30px] mb-8 max-w-[1400px]">
        <div className="p-[10px] md:p-[15px]">
          <img
            className="max-w-[600px] mb-[15px] w-full rounded-md"
            src={demoService.avatar}
            alt={demoService.name}
          />
          <div className="bg-[white] hover:bg-lightHover mb-[20px] p-[10px] rounded-md shadow-md">
            <h2 className="text-left mb-2 text-2xl font-bold">
              General Service Details
            </h2>
            <p className="font-bold">
              <span className="font-semibold">Established: </span>
              {demoService.established}
            </p>
            <p className="font-bold">
              <span className="font-semibold">Phone Number: </span>
              {demoService.phone}
            </p>
            <p className="font-bold">
              <span className="font-semibold">Email Address: </span>
              {demoService.email}
            </p>
            <p className="font-bold">
              <span className="font-semibold">Address: </span>
              {demoService.addressLineOne}
            </p>
            <p className="font-bold">
              <span className="font-semibold">Address (state): </span>
              {demoService.state}
            </p>
          </div>
          <div className="bg-[white] hover:bg-lightHover mb-[20px] p-[10px] rounded-md shadow-md">
            <h2 className="text-left mb-2 text-2xl font-bold">
              Service Owner Details
            </h2>
            <p className="font-bold">
              <span className="font-semibold">Name: </span>
              {demoService.owner}
            </p>
            {/* {demoService.professions ? <p className="font-bold"><span className="font-semibold">Profession: </span>{demoService.professions}</p>: null} */}
            {/* <p className="font-bold"><span className="font-semibold">Experience: </span>{demoService.experience}</p> */}
          </div>
        </div>
        <div className="right">
          <h2 className="text-center text-2xl font-bold">
            All services offered
          </h2>
          <div className="p-[10px] md:p-[15px]">
            {demoService.services.map(({ name }: { name: string }) => (
              <div className="bg-[white] hover:bg-lightHover py-[6px] px-[10px] rounded-md mb-[5px] font-semibold shadow-sm">
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="min-h-[25vh] grid gap-[10px] grid-cols-1 md:grid-cols-2">
        <div className="order-last md:order-none">
          <h2 className="text-center text-2xl font-bold">
            Reviews from customers
          </h2>
          <div className="p-[10px] md:p-[15px]">
            <React.Suspense fallback={<Loader />}>
              {demoService.reviews.length !== 0 ? (
                <div className="flex gap-3 flex-col items-center">
                  {demoService.reviews.map(
                    ({
                      name,
                      rating,
                      review,
                    }: {
                      name: string;
                      rating: number;
                      review: string;
                    }) => {
                      return (
                        <div className="bg-[white] hover:bg-lightHover rounded-md shadow-md gap-3 p-3 w-full max-w-[400px]">
                          <div className="flex items-center w-full gap-6 mb-2">
                            <div className="p-2 bg-accentTwo rounded-full">
                              <MdPerson fontSize="large" />
                            </div>
                            <div className="">
                              <p className="font-semibold">
                                Name:
                                <span className="font-bold"> {name}</span>
                              </p>
                              <p className="font-semibold">
                                Rating:
                                <span className="font-bold"> {rating}</span>
                              </p>
                            </div>
                          </div>
                          <div className="">
                            <p className="font-semibold">
                              Review:
                              <span className="font-medium">
                                &nbsp; {review}
                              </span>
                            </p>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              ) : (
                <div className="bg-[white] hover:bg-lightHover rounded-md shadow-md gap-3 p-3 w-full">
                  <p className="">No rating/reviews yet</p>
                </div>
              )}
            </React.Suspense>
          </div>
        </div>
        <div className="">
          <h2 className="text-center text-2xl font-bold">Write a review</h2>
          <div className="p-[10px] md:p-[15px]">
            <div className="bg-[white] p-4 rounded-md shadow-md">
              {/* to remove the arrows, validate the input for the given range (0-10) */}
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
