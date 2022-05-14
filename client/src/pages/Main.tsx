import React from "react";
import { useRecoilValue } from "recoil";
import { Helmet } from "react-helmet";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";

import Header from "../components/main/header";
import Footer from "../components/main/footer";
import { Loader } from "../components/atoms/loader";
import { EmptyCard } from "../components/main/card";
import { listingPagination, listings as allListings } from "../store/data";
import ButtonEl from "../components/atoms/Button";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
const Sidebar = React.lazy(() => import("../components/main/sidebar"));
const Card = React.lazy(() => import("../components/main/card"));

const getExt = (n: number) =>
  n === 1 ? "1st" : n === 2 ? "2nd" : n === 3 ? "3rd" : `${n}th`;

const Main = () => {
  const listings = useRecoilValue(allListings);
  const pagination = useRecoilValue(listingPagination);
  const nthPage = getExt(pagination.currentPage + 1);

  return (
    <>
      <Helmet>
        <title>Taxtds - Home</title>
        <meta name="og:title" content="Taxtds - Home" />
        <meta name="twitter:title" content="Taxtds - Home" />
      </Helmet>

      <Header />
      <div className="flex flex-col md:flex-row max-w-[1400px] lg:min-w-[1200px] justify-center items-start mb-4">
        <div className="mb-4 md:mb-0 flex justify-center">
          <React.Suspense fallback={<Loader />}>
            <Sidebar />
          </React.Suspense>
        </div>
        <div className="flex flex-col items-center gap-4">
          {listings.length > 0 ? (
            listings.map((listing) => (
              <React.Suspense key={listing._id} fallback={<Loader />}>
                <Card listing={listing} />
              </React.Suspense>
            ))
          ) : (
            <EmptyCard />
          )}

          <div className="flex flex-col gap-2 mt-10">
            <p className="text-center -mb-2">
              Page {pagination.currentPage + 1}
            </p>
            <p className="text-center mb-2">
              {`showing ${nthPage} ${pagination.limit} out of ${pagination.count} listings`}
            </p>
            <div className="flex gap-2 justify-center">
              <ButtonEl
                label=""
                Icon={<FaAngleDoubleLeft />}
                callback={() => {}}
                disabled={!pagination.hasPrevious}
                compact={true}
              />
              <ButtonEl
                label=""
                Icon={<ImArrowLeft2 />}
                callback={() => {}}
                disabled={!pagination.hasPrevious}
                compact={true}
              />
              <ButtonEl
                label=""
                Icon={<ImArrowRight2 />}
                iconAfter={true}
                callback={() => {}}
                disabled={!pagination.hasMore}
                compact={true}
              />
              <ButtonEl
                label=""
                Icon={<FaAngleDoubleRight />}
                iconAfter={true}
                disabled={!pagination.hasMore}
                compact={true}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Main;
