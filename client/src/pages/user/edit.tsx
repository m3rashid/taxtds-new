import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/atoms/loader";
import CreateOrEditListing from "../../components/user/createOrEditListing";

import UserWrapper from "../../components/user/wrapper";
import useListings from "../../hooks/useListings";
import { IListingDetail } from "../../store/interfaces";

const EditService = () => {
  const { listingId } = useParams();
  const [loading, setLoading] = React.useState(true);
  const { getOneListing } = useListings();
  const [listing, setListing] = React.useState<IListingDetail>();

  React.useEffect(() => {
    getOneListing(listingId!)
      .then((gotListing) => setListing(gotListing.listing))
      .catch()
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <UserWrapper>
      <React.Suspense fallback={<Loader />}>
        <CreateOrEditListing listing={listing} isEdit={true} />
      </React.Suspense>
    </UserWrapper>
  );
};

export default EditService;
