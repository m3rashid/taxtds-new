import Header from "../components/customHeader";
import AdminDashboard from "../components/adminDashboard";

const Admin = () => {
  // TODO handle OG tags
  document.title = "Taxtds - Admin";
  return (
    <>
      <Header greeting="Hello Admin" />
      <AdminDashboard />
    </>
  );
};

export default Admin;
