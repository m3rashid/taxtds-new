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
  { id: 8, name: "Accounting Services" },
  { id: 9, name: "Investment Planning" },
  { id: 10, name: "GST Return" },
  { id: 11, name: "GST Registration" },
  { id: 12, name: "GST Registration For Foreigners" },
  { id: 13, name: "Cancel GST Registration" },
  { id: 14, name: "Temporary Registration" },
  { id: 15, name: "Income Tax Registration" },
  { id: 16, name: "Company Registration" },
  { id: 17, name: "Private Limited Company" },
  { id: 18, name: "Public Limited Company" },
  { id: 19, name: "Proprietorship Registration" },
  { id: 20, name: "Partnership Registration" },
];

interface IProps {}

export const Services: React.FC<IProps> = () => {
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
      <Table columns={columns} data={demoData} title="Listed Services" />
    </AdminWrapper>
  );
};
