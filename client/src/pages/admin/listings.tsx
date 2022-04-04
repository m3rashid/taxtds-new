import React from "react";
import { Table } from "../../components/admin/table";

import AdminWrapper from "../../components/admin/wrapper";

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
      { Header: "ID", accessor: "id" },
      { Header: "Avatar", accessor: "avatar" },
      { Header: "Name", accessor: "name" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Email", accessor: "email" },
      { Header: "Featured", accessor: "featured" },
    ],
    []
  );

  /*
    ===== Actions ===== 
    Email User
    Feature/Unfeature Listing
    Delete Listing
    Listing Details
  */

  return (
    <AdminWrapper>
      <Table columns={columns} data={demoData} title="Listings" />
    </AdminWrapper>
  );
};
