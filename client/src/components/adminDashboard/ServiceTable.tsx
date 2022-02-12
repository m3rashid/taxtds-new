import Table from "./helpers/Table";
import { ProfilePhoto, TableHeader, Button } from "./helpers/atoms";

const demoData = [
  {
    id: 1,
    avatar: "/images/carousel/1.jpg",
    name: "Service 1",
    phone: "1234567890",
    email: "user@user.com",
  },
  {
    id: 2,
    avatar: "/images/carousel/2.jpg",
    name: "Service 2",
    phone: "1234567890",
    email: "user@user.com",
  },
  {
    id: 3,
    avatar: "/images/carousel/3.jpg",
    name: "Service 3",
    phone: "1234567890",
    email: "user@user.com",
  },
  {
    id: 4,
    avatar: "/images/carousel/4.jpg",
    name: "Service 4",
    phone: "1234567890",
    email: "user@user.com",
  },
  {
    id: 5,
    avatar: "/images/carousel/5.jpg",
    name: "Service 5",
    phone: "1234567890",
    email: "user@user.com",
  },
];

const columns = [
  {
    title: "",
    field: "avatar",
    sorting: false,
    render: ({ avatar }: { avatar: string }) => (
      <ProfilePhoto avatar={avatar} />
    ),
  },
  { title: "Name", field: "name", sorting: false },
  { title: "Phone", field: "phone", sorting: false },
  { title: "Email", field: "email", sorting: false },
  {
    title: "Actions",
    field: "",
    sorting: false,
    render: () => (
      <div className="flex flex-col md:flex-row gap-2 md:items-center justify-around">
        <Button
          color="bg-buttonDanger"
          label="Delete Service"
          onClick={() => {}}
        />
        <Button
          textColor="text-accentOne"
          color="bg-buttonSuccess"
          label="Contact"
          onClick={() => {}}
        />
        <Button color="bg-accentOne" label="Show Details" onClick={() => {}} />
      </div>
    ),
  },
];

const ServiceTable = () => {
  return (
    <>
      <Table
        columns={columns}
        data={demoData}
        Title={<TableHeader title="Registered Services" />}
      />
    </>
  );
};

export default ServiceTable;
