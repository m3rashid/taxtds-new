import Table from "./helpers/Table";
import { TableHeader, ProfilePhoto, Button } from "./helpers/atoms";

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

const columns = [
  {
    title: "",
    field: "avatar",
    sorting: false,
    cellStyle: { width: "4.5rem" },
    render: ({ avatar }: { avatar?: string }) => (
      <ProfilePhoto avatar={avatar} />
    ),
  },
  { title: "Name", field: "name" },
  { title: "Email", field: "email", sorting: false },
  {
    title: "Actions",
    field: "",
    sorting: false,
    render: () => (
      <div className="flex flex-col md:flex-row gap-2 md:items-center justify-end">
        <Button
          textColor="text-accentOne"
          color="bg-buttonSuccess"
          label="Email"
          onClick={() => {}}
        />
        <Button color="bg-buttonDanger" label="Delete" onClick={() => {}} />
        <Button color="bg-accentOne" label="Services" onClick={() => {}} />
      </div>
    ),
  },
];

const SellerTable = () => {
  return (
    <>
      <Table
        columns={columns}
        data={demoData}
        Title={<TableHeader title="Registered Users" />}
      />
    </>
  );
};

export default SellerTable;
