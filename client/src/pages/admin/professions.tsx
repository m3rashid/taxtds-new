import React from "react";
import { Table } from "../../components/admin/table";

import AdminWrapper from "../../components/admin/wrapper";

const demoData = [
  { id: 1, name: "Registration Services" },
  { id: 2, name: "Company Compliance" },
  { id: 3, name: "Tax Filling" },
  { id: 4, name: "Audit And Insurance" },
  { id: 5, name: "Taxation Advisory And Personal Advisory" },
  { id: 6, name: "FCRA FEMA NGOs" },
  { id: 7, name: "Valuations" },
];

interface IProps {}

export const Professions: React.FC<IProps> = () => {
  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Name", accessor: "name" },
    ],
    []
  );

  /*
    ===== Actions ===== 
    Edit Service
    Delete Service
  */

  return (
    <AdminWrapper>
      <Table columns={columns} data={demoData} title="Listed Professions" />
    </AdminWrapper>
  );
};
