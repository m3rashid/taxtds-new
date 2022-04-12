import React from "react";
import {
  MdDelete,
  MdEmail,
  MdInfoOutline,
  MdOutlineReadMore,
} from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Table = React.lazy(() => import("../../components/admin/table"));
import AdminWrapper from "../../components/admin/wrapper";
import ButtonEl from "../../components/atoms/Button";
import { Loader } from "../../components/atoms/loader";

const demoData = [
  {
    id: 1,
    name: "Raj",
    email: "raj@gmail.com",
    avatar: "/images/carousel/1.jpg",
  },
  {
    id: 2,
    name: "Rahul",
    email: "rahul@gmail.com",
    avatar: "/images/carousel/2.jpg",
  },
  {
    id: 3,
    name: "Ritu",
    email: "ritu@gmail.com",
    avatar: "/images/carousel/3.jpg",
  },
  {
    id: 4,
    name: "Rashid",
    email: "rahid@user.com",
    avatar: "/images/carousel/4.jpg",
  },
  {
    id: 5,
    name: "Shakir",
    email: "shakir@bluff.com",
    avatar: "/images/carousel/5.jpg",
  },
];

interface IProps {}

export const Users: React.FC<IProps> = () => {
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
          <LazyLoadImage
            className="h-16 w-16"
            src={props.row.original.avatar}
          />
        ),
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: (props: any) => <>{props.row.original.name}</>,
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: (props: any) => <>{props.row.original.email}</>,
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
            <ButtonEl label="Show Listings" Icon={<MdOutlineReadMore />} />
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

  /*
    ===== Actions ===== 
    Send Email
    Delete
    Show User Listings
  */

  return (
    <AdminWrapper>
      <React.Suspense fallback={<Loader />}>
        <Table columns={columns} data={demoData} title="Listed Users" />
      </React.Suspense>
    </AdminWrapper>
  );
};
