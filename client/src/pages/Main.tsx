import React from "react";
import { Helmet } from "react-helmet";
import { useRecoilValue } from "recoil";

import Pagination from "./pagination";
import Header from "../components/main/header";
import Footer from "../components/main/footer";
import { Loader } from "../components/atoms/loader";
import { EmptyCard } from "../components/main/card";
import { listings as allListings } from "../store/data";

const Sidebar = React.lazy(() => import("../components/main/sidebar"));
const Card = React.lazy(() => import("../components/main/card"));

const Main = () => {
  const listings = useRecoilValue(allListings);

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
          <Pagination />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Main;
