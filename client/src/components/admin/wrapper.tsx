import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import Header from "../customHeader";

const AdminWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <Helmet>
        <title>Taxtds - Admin</title>
        <meta name="og:title" content="Taxtds - Admin" />
        <meta name="twitter:title" content="Taxtds - Admin" />
      </Helmet>

      <Header greeting="Hello Admin" />
      <div className="bg-accentTwo w-full -mt-4 shadow-md p-3 flex gap-4 flex-wrap items-center justify-center">
        <Link to="/admin/home">Home</Link>
        <Link to="/admin/listings">Listings</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/professions">Professions</Link>
        <Link to="/admin/services">Services</Link>
      </div>
      <div className="flex justify-center mb-8">{children}</div>
    </div>
  );
};

export default AdminWrapper;
