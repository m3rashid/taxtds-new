import Table from "./widgets/Table";
// import ButtonEl from "../atoms/Button";

const demoData = [
  {
    id: 1,
    name: "Raj",
    email: "raj@gmail.com",
    services: 1,
  },
  {
    id: 2,
    name: "Rahul",
    email: "rahul@gmail.com",
    services: 1,
  },
  {
    id: 3,
    name: "Ritu",
    email: "ritu@gmail.com",
    services: 0,
  },
];

const columns = [
  { title: "Name", field: "name" },
  { title: "Email", field: "email" },
  { title: "Services", field: "services" },
  { title: "", field: "delete", sorting: false },
  { title: "", field: "contact", sorting: false },
];

const BuyerTable = () => {
  return (
    <>
      <Table columns={columns} data={demoData} title="Registered Buyers" />
    </>
  );
};

export default BuyerTable;
