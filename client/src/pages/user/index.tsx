import React from "react";

import { Loader } from "../../components/atoms/loader";
const Card = React.lazy(() => import("../../components/main/card"));
import UserWrapper from "../../components/user/wrapper";
import { IListing } from "../../store/interfaces";

const demoServices: IListing[] = [
  {
    _id: "6255057609b0c094b65739cb",
    brandName: "Brandname",
    avatar: {
      url: "v1649739061/safqbxslbowg5nc2zasz.png",
      public_id: "safqbxslbowg5nc2zasz",
    },
    gallery: [
      {
        url: "v1649739080/dvwqlfstdmeucu0konpc.png",
        public_id: "dvwqlfstdmeucu0konpc",
        _id: "6255057609b0c094b65739cc",
      },
      {
        url: "v1649739098/swenfga5adydns7zrkwq.png",
        public_id: "swenfga5adydns7zrkwq",
        _id: "6255057609b0c094b65739cd",
      },
      {
        url: "v1649739107/evtfdjsljgwxkpyrkrft.png",
        public_id: "evtfdjsljgwxkpyrkrft",
        _id: "6255057609b0c094b65739ce",
      },
    ],
    services: [
      "6252c24cac84277612a6b8db",
      "6252c24cac84277612a6b8de",
      "6252c24cac84277612a6b8e0",
    ],
    addedBy: "6252db6ded30187f908c7d37",
    established: "1947",
    tagline: "service tagline",
    owner: "Owner ",
    addressLineOne: "this is the address one",
    addressLineTwo: "address two",
    state: "Andaman and Nicobar Islands",
    phone: 1223235,
    email: "test@user.com",
    deleted: false,
    featured: false,
    createdAt: "2022-04-12T04:52:06.634Z",
    updatedAt: "2022-04-12T04:52:06.634Z",
    __v: 0,
  },
];

const User = () => {
  return (
    <UserWrapper>
      <div className="flex flex-col md:flex-row flex-shrink-0 gap-4 p-4 md:w-full max-w-[1600px] mb-4">
        <React.Suspense fallback={<Loader />}>
          {demoServices.map((listing) => (
            <Card listing={listing} isUserPage={true} />
          ))}
        </React.Suspense>
      </div>
    </UserWrapper>
  );
};

export default User;
