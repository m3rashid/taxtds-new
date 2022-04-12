import React from "react";
import {
  MdDelete,
  MdEmail,
  MdFeaturedPlayList,
  MdLoop,
  MdInfoOutline,
} from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Table = React.lazy(() => import("../../components/admin/table"));
import AdminWrapper from "../../components/admin/wrapper";
import ButtonEl from "../../components/atoms/Button";
import ButtonLink from "../../components/atoms/ButtonLink";
import { Loader } from "../../components/atoms/loader";

const demoData = [
  {
    _id: 1,
    avatar: "/images/carousel/1.jpg",
    name: "Listing 1",
    phone: "1234567890",
    email: "user@user.com",
    featured: true,
  },
  {
    _id: 2,
    avatar: "/images/carousel/2.jpg",
    name: "Listing 2",
    phone: "1234567890",
    email: "user@user.com",
    featured: true,
  },
  {
    _id: 3,
    avatar: "/images/carousel/3.jpg",
    name: "Listing 3",
    phone: "1234567890",
    email: "user@user.com",
    featured: false,
  },
  {
    _id: 4,
    avatar: "/images/carousel/4.jpg",
    name: "Listing 4",
    phone: "1234567890",
    email: "user@user.com",
    featured: false,
  },
  {
    _id: 5,
    avatar: "/images/carousel/5.jpg",
    name: "Listing 5",
    phone: "1234567890",
    email: "user@user.com",
    featured: true,
  },
];

interface IProps {}

export const Listings: React.FC<IProps> = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: (props: any) => <>{props.row.original.name}</>,
      },
      {
        Header: "Avatar",
        accessor: "avatar",
        Cell: (props: any) => (
          <LazyLoadImage
            className="h-16 w-16"
            src={props.row.original.avatar}
          />
        ),
      },
      {
        Header: "Phone",
        accessor: "phone",
        Cell: (props: any) => <>{props.row.original.phone}</>,
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: (props: any) => <>{props.row.original.email}</>,
      },
      {
        Header: "Featured",
        accessor: "featured",
        Cell: (props: any) => <>{props.row.original.featured ? "Yes" : "No"}</>,
      },
      {
        Header: "Actions",
        accessor: "",
        Cell: (props: any) => (
          <div className="flex gap-4">
            <ButtonLink
              label="Details"
              Icon={<MdInfoOutline />}
              bgColor="bg-accentTwo"
              to={`/listings/${props.row.original._id}`}
            />
            <ButtonEl
              label="Send Email"
              Icon={<MdEmail />}
              bgColor="bg-blue-200"
            />
            <ButtonEl
              label={props.row.original.featured ? "Unfeature" : "Feature"}
              Icon={
                props.row.original.featured ? (
                  <MdLoop />
                ) : (
                  <MdFeaturedPlayList />
                )
              }
              bgColor={props.row.original.featured && "bg-rose-500"}
              textColor={props.row.original.featured && "text-white"}
            />
            <ButtonEl
              label="Delete"
              Icon={<MdDelete />}
              bgColor="bg-rose-500"
              textColor="text-white"
            />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <AdminWrapper>
      <React.Suspense fallback={<Loader />}>
        <Table columns={columns} data={demoData} title="Listings" />
      </React.Suspense>
    </AdminWrapper>
  );
};
