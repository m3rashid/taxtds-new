import React from "react";
import { Loader } from "../../components/atoms/loader";
const CreateOrEditListing = React.lazy(
  () => import("../../components/user/createOrEditListing")
);

import UserWrapper from "../../components/user/wrapper";

const CreateService = () => {
  return (
    <UserWrapper>
      <React.Suspense fallback={<Loader />}>
        <CreateOrEditListing />
      </React.Suspense>
    </UserWrapper>
  );
};

export default CreateService;
