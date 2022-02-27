import React from "react";
import UserWrapper from "../../components/user/wrapper";

const CreateService = () => {
  return (
    <UserWrapper name="Demo User" username="demouser">
      <div className="flex flex-col md:flex-row flex-shrink-0 gap-4 p-4 md:w-full max-w-[1600px] mb-4"></div>
    </UserWrapper>
  );
};

export default CreateService;
