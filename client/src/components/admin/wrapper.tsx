import React from "react";
import { Link } from "react-router-dom";

import Header from "../customHeader";

const AdminWrapper = ({ children }: { children: React.ReactNode }) => {
  document.title = "Taxtds - Admin";

  return (
    <div className="w-full">
      <Header greeting="Hello Admin" />
      <div className="bg-accentTwo w-full -mt-4 shadow-md p-3 flex gap-4 flex-wrap items-center justify-center">
        <Link to="/admin/listings">Listings</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/professions">Professions</Link>
        <Link to="/admin/services">Services</Link>
      </div>
      <div className="flex justify-center">{children}</div>
    </div>
  );
};

export default AdminWrapper;
