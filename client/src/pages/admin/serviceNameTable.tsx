import Table from "../../components/admin/Table";
import { TableHeader, Button } from "../../components/admin/atoms";
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

const columns = [
  { title: "Name", field: "name", sorting: false },
  {
    tilte: "Actions",
    field: "",
    sorting: false,
    render: (rowData: any) => {
      return (
        <div className="flex flex-col md:flex-row gap-2 md:items-center justify-end">
          <Button color="bg-buttonDanger" label="Delete" onClick={() => {}} />
          <Button
            textColor="text-accentOne"
            color="bg-buttonSuccess"
            label="Edit"
            onClick={() => {}}
          />
        </div>
      );
    },
  },
];

const ServiceNameTable = () => {
  return (
    <AdminWrapper>
      <Table
        columns={columns}
        data={demoData}
        Title={<TableHeader title="Listed Services" />}
      />
    </AdminWrapper>
  );
};

export default ServiceNameTable;
