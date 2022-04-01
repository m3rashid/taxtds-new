import React from "react";
import { Link } from "react-router-dom";

import Header from "../customHeader";

const AdminWrapper = ({ children }: any) => {
  document.title = "Taxtds - Admin";

  const linkStyles = "";
  return (
    <div className="w-full">
      <Header greeting="Hello Admin" />
      <div className="bg-accentTwo w-full -mt-4 shadow-md p-3 flex gap-4 flex-wrap items-center justify-center">
        <Link className={linkStyles} to="/admin/listed-rofessions">
          Professions
        </Link>
        <Link className={linkStyles} to="/admin/list-services-names">
          Service Names
        </Link>
        <Link className={linkStyles} to="/admin/listed-services">
          Listed Serices
        </Link>
        <Link className={linkStyles} to="/admin/listed-users">
          Listed Users
        </Link>
      </div>
      <div className="flex justify-center">{children}</div>
    </div>
  );
};

export default AdminWrapper;
