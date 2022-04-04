import React from "react";
import { Table } from "../../components/admin/table";

import AdminWrapper from "../../components/admin/wrapper";

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
      { Header: "ID", accessor: "id" },
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "", accessor: "avatar" },
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
      <Table columns={columns} data={demoData} title="Listed Users" />
    </AdminWrapper>
  );
};
