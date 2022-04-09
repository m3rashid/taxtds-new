import React from "react";
import {
  MdDelete,
  MdEmail,
  MdFeaturedPlayList,
  MdLoop,
  MdInfoOutline,
} from "react-icons/md";

const Table = React.lazy(() => import("../../components/admin/table"));
import AdminWrapper from "../../components/admin/wrapper";
import ButtonEl from "../../components/atoms/Button";
import { Loader } from "../../components/atoms/loader";

const demoData = [
  {
    id: 1,
    avatar: "/images/carousel/1.jpg",
    name: "Listing 1",
    phone: "1234567890",
    email: "user@user.com",
    featured: true,
  },
  {
    id: 2,
    avatar: "/images/carousel/2.jpg",
    name: "Listing 2",
    phone: "1234567890",
    email: "user@user.com",
    featured: true,
  },
  {
    id: 3,
    avatar: "/images/carousel/3.jpg",
    name: "Listing 3",
    phone: "1234567890",
    email: "user@user.com",
    featured: false,
  },
  {
    id: 4,
    avatar: "/images/carousel/4.jpg",
    name: "Listing 4",
    phone: "1234567890",
    email: "user@user.com",
    featured: false,
  },
  {
    id: 5,
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
        Header: "ID",
        accessor: "id",
        Cell: (props: any) => <>{props.row.original.id}</>,
      },
      {
        Header: "Avatar",
        accessor: "avatar",
        Cell: (props: any) => (
          <img className="h-16 w-16" src={props.row.original.avatar} />
        ),
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: (props: any) => <>{props.row.original.name}</>,
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
            <ButtonEl
              label="Details"
              Icon={<MdInfoOutline />}
              bgColor="bg-blue-200"
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
