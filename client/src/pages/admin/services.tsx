import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
const Table = React.lazy(() => import("../../components/admin/table"));

import AdminWrapper from "../../components/admin/wrapper";
import ButtonEl from "../../components/atoms/Button";
import { Loader } from "../../components/atoms/loader";

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
      {
        Header: "ID",
        accessor: "id",
        Cell: (props: any) => <>{props.row.original.id}</>,
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: (props: any) => <>{props.row.original.name}</>,
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: () => (
          <div className="flex gap-4">
            <ButtonEl label="Edit" Icon={<MdEdit />} bgColor="bg-blue-200" />
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
    Edit Service
    Delete Service    
  */

  return (
    <AdminWrapper>
      <React.Suspense fallback={<Loader />}>
        <Table columns={columns} data={demoData} title="Listed Services" />
      </React.Suspense>
    </AdminWrapper>
  );
};
