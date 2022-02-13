import UserTable from "./UserTable";
import ServiceTable from "./ServiceTable";
import ServiceNameTable from "./serviceNameTable";
import ProfesssionNameTable from "./professionNameTable";

const AdminDashboard = () => {
  return (
    <>
      <UserTable />
      <ServiceTable />
      <ServiceNameTable />
      <ProfesssionNameTable />
    </>
  );
};

export default AdminDashboard;
