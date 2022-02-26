import Table from "../../components/admin/Table";
import {
  ProfilePhoto,
  TableHeader,
  Button,
} from "../../components/admin/atoms";
import AdminWrapper from "../../components/admin/wrapper";

const demoData = [
  {
    id: 1,
    avatar: "/images/carousel/1.jpg",
    name: "Service 1",
    phone: "1234567890",
    email: "user@user.com",
    featured: true,
  },
  {
    id: 2,
    avatar: "/images/carousel/2.jpg",
    name: "Service 2",
    phone: "1234567890",
    email: "user@user.com",
    featured: true,
  },
  {
    id: 3,
    avatar: "/images/carousel/3.jpg",
    name: "Service 3",
    phone: "1234567890",
    email: "user@user.com",
    featured: false,
  },
  {
    id: 4,
    avatar: "/images/carousel/4.jpg",
    name: "Service 4",
    phone: "1234567890",
    email: "user@user.com",
    featured: false,
  },
  {
    id: 5,
    avatar: "/images/carousel/5.jpg",
    name: "Service 5",
    phone: "1234567890",
    email: "user@user.com",
    featured: true,
  },
];

const columns = [
  {
    title: "",
    field: "avatar",
    sorting: false,
    cellStyle: { width: "4.5rem" },
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
    // TODO make interfaces of row data
    render: (rowData: any) => {
      const { featured } = rowData;
      return (
        <div className="flex flex-col md:flex-row gap-2 md:items-center justify-end">
          <Button
            textColor="text-accentOne"
            color="bg-buttonSuccess"
            label="Email"
            onClick={() => {}}
          />
          <Button
            textColor={!featured ? "text-accentOne" : ""}
            color={!featured ? "bg-buttonSuccess" : "bg-buttonDanger"}
            label={featured ? "UnFeature" : "Feature"}
            onClick={() => {}}
          />
          <Button color="bg-accentOne" label="Details" onClick={() => {}} />
          <Button color="bg-buttonDanger" label="Delete" onClick={() => {}} />
        </div>
      );
    },
  },
];

const ServiceTable = () => {
  return (
    <AdminWrapper>
      <Table
        columns={columns}
        data={demoData}
        Title={<TableHeader title="Registered Services" />}
      />
    </AdminWrapper>
  );
};

export default ServiceTable;
