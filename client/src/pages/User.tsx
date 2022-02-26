import React from "react";
import { toast } from "react-toastify";

import Footer from "../components/mainFooter";
import Header from "../components/customHeader";

const username = "Demouser";

const User = () => {
  React.useEffect(() => {
    toast.success(`Hello ${username}`);
  }, []);

  // TODO handle OG tags
  document.title = `Taxtds - ${username}`;
  return (
    <>
      <Header greeting="Hello Demouser" />
      <Footer />
    </>
  );
};

export default User;
