import React from "react";

import Header from "../components/main/header";
import Footer from "../components/main/footer";
import { Loader } from "../components/atoms/loader";
const Sidebar = React.lazy(() => import("../components/main/sidebar"));
const Card = React.lazy(() => import("../components/main/card"));
import { EmptyCard } from "../components/main/card";
import { listings as allListings } from "../store/data";
import { useRecoilValue } from "recoil";

const Main = () => {
  const storeListings = useRecoilValue(allListings);

  const listings = React.useMemo(() => {
    return storeListings.sort((a, b) => {
      return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
    });
  }, [storeListings]);

  document.title = "Taxtds - Home";
  return (
    <>
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Main;
