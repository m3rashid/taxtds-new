import React from "react";
import moment from "moment";
import { useRecoilValue } from "recoil";
import { MdEdit } from "react-icons/md";

import { authState } from "../store/auth";
import Header from "../components/main/header";
import Footer from "../components/main/footer";
import ButtonEl from "../components/atoms/Button";

const user = {
  banned: false,
  _id: "6252db6ded30187f908c7d37",
  email: "test@user.com",
  role: "USER",
  password: "$2b$10$NrR5kkL58mM20cdWYLoiK.dl7vOOE02jUMC/IaoiKpb1dYvp/17J.",
  phone: "32452346",
  name: "Test User",
  experience: 2,
  addressLineOne: "this ",
  addressLineTwo: "that",
  state: "Andhra Pradesh",
  professions: [],
  deleted: false,
  createdAt: "2022-04-10T13:28:13.989Z",
  updatedAt: "2022-04-10T13:28:13.989Z",
  __v: 0,
};

interface IProps {}

const UserDetail: React.FC<IProps> = () => {
  const storedUser = useRecoilValue(authState);
  const { isAuthenticated } = storedUser;
  const authUser = storedUser.user || { _id: "-1" };

  return (
    <>
      <Header />
      <div>email: {user.email}</div>
      <div>phone: {user.phone}</div>
      <div>name: {user.name}</div>
      <div>experience: {user.experience} years</div>
      <div>address: {user.addressLineOne + ", " + user.addressLineTwo}</div>
      <div>state: {user.state}</div>
      <div>
        profesions:{" "}
        {user.professions.length > 0 &&
          user.professions.map((profession: any) => <p>{profession}</p>)}
      </div>
      <div>Joined: {moment(user.createdAt).format("lll")}</div>
      {isAuthenticated && user._id === authUser._id && (
        <ButtonEl
          label="Update Profile"
          Icon={<MdEdit />}
          bgColor="bg-blue-300"
          callback={() => {}}
        />
      )}
      <Footer />
    </>
  );
};

export default UserDetail;
