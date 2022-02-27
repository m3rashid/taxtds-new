// import React from "react";
// import { toast } from "react-toastify";

import UserWrapper from "../../components/user/wrapper";

const service = {
  id: 1,
  name: "Rashid lsdjfalsd",
  tagline: "jsdfl asdflaksdfa sldkad",
  avatar: "/images/carousel/1.jpg",
  owner: "Rashid",
  state: "delhi",
  phone: "4952903453",
  email: "user@wwamil.com",
  featured: false,
};

const EditService = () => {
  return (
    <UserWrapper name="Demo User" username="demouser">
      <div className="flex flex-col md:flex-row flex-shrink-0 gap-4 p-4 md:w-full max-w-[1600px] mb-4"></div>
    </UserWrapper>
  );
};

export default EditService;
