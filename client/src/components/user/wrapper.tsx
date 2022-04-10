import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../../store/auth";

import Header from "../customHeader";
import Footer from "../mainFooter";

const UserWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user, role } = useRecoilValue(authState);
  const location = useLocation();
  const navigate = useNavigate();

  const userId = location.pathname.split("/")[2];

  React.useEffect(() => {
    if (!isAuthenticated || role !== "USER" || userId != user._id) {
      return navigate("/");
    }
  }, []);

  document.title = `Taxtds - ${user.name}`;
  return (
    <>
      <Header greeting={`Hello ${user.name}`} />
      <div className="bg-accentTwo w-full -mt-4 shadow-md p-3 flex gap-6 flex-wrap items-center justify-center">
        <Link to={`/user/${user._id}`}>Home</Link>
        <Link to={`/user/${user._id}/create`}>List Service</Link>
      </div>
      <div className="my-[50px] flex justify-center">{children}</div>
      <Footer />
    </>
  );
};

export default UserWrapper;
