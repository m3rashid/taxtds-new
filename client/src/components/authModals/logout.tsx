import React from "react";
import { useSetRecoilState } from "recoil";
import { MdExitToApp } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import ButtonEl from "../atoms/Button";
import useAuth from "../../hooks/useAuth";
import { authState } from "../../store/auth";

interface IProps {
  setModal: (e: any) => void;
}

const Logout: React.FC<IProps> = ({ setModal }) => {
  const setRecoilState = useSetRecoilState(authState);
  const navigate = useNavigate();

  const { handleLogout: logout } = useAuth();

  const handleLogout = () => {
    logout(setRecoilState);
    setModal("");
    navigate("/");
  };

  return (
    <>
      <p className="text-white mb-10 -mt-6 text-lg">
        Are you sure you want to logout ?
      </p>
      <div className="flex flex-col w-full">
        <ButtonEl
          bgColor="bg-buttonDanger"
          Icon={<MdExitToApp />}
          label="Logout"
          callback={handleLogout}
        />
      </div>
    </>
  );
};

export default Logout;
