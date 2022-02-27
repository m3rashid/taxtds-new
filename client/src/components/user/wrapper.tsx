import React from "react";

import Header from "../customHeader";
import Footer from "../mainFooter";

const UserWrapper = ({
  username,
  name,
  children,
}: {
  username: string;
  name: string;
  children: any;
}) => {
  document.title = `Taxtds - ${username}`;
  // TODO implement authentication things in the wrapper
  return (
    <>
      <Header greeting={`Hello ${name}`} />
      <div className="">{children}</div>
      <Footer />
    </>
  );
};

export default UserWrapper;
