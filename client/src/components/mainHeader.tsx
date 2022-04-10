import React from "react";
import { MdPerson, MdLock, MdHelp, MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import AuthModals from "./authModals";
import { authState } from "../store/auth";
import { useRecoilValue } from "recoil";

const data = [
  { id: 1, name: "Chartered Accountant", urlSlug: "CA" },
  { id: 2, name: "Cost Accountant", urlSlug: "CMA" },
  { id: 3, name: "Company Secretory", urlSlug: "CS" },
  { id: 4, name: "All Professionals", urlSlug: "all" },
];

interface IPropsTopLink {
  name: string;
  Icon: any;
  callback: React.MouseEventHandler;
}

const TopLink: React.FC<IPropsTopLink> = ({ name, Icon, callback }) => {
  return (
    <div
      className="flex items-center gap-1 text-lightBgOne m-[5px] hover:text-lightHover"
      onClick={callback}
    >
      {Icon}
      <p>{name}</p>
    </div>
  );
};

interface IPropsInput {
  classes?: string;
  placeholder: string;
  name: string;
}

const Input: React.FC<IPropsInput> = ({ classes, placeholder, name }) => {
  return (
    <input
      className={`h-[30px] md:h-[40px] py-[8px] px-[10px] md:p-[10px] focus:outline-none rounded-sm ${classes}`}
      type="text"
      placeholder={placeholder}
      name={name}
    />
  );
};

const Header = () => {
  const { isAuthenticated, role, user } = useRecoilValue(authState);
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState<
    "login" | "signup" | "quotes" | ""
  >("");
  const setModalTrigger = () => {
    setModalShow("");
  };

  const isAuthUser = isAuthenticated && role === "USER";
  const isAuthAdmin = isAuthenticated && role === "ADMIN";

  return (
    <header className="w-screen">
      <div className="bg-accentOne p-[5px] md:p-[10px] flex flex-col md:flex-row justify-center items-center">
        <div className="flex-shrink flex flex-row mt-2 md:mt-0 mb-3 md:mb-0">
          <Input
            classes="flex-shrink max-w-[150px] mr-[8px] md:mr-[20px] md:max-w-[250px]"
            placeholder="Search State"
            name="state"
          />

          <div className="bg-lightBgOne rounded-sm pl-[5px] md:pl-[10px] mr-[8px] md:mr-[20px]">
            <Input
              classes="max-w-[150px] md:max-w-[250px]"
              placeholder="Search services"
              name="service"
            />
          </div>

          <button className="h-[30px] w-[40px] md:h-[40px] md:w-[60px] bg-accentTwo rounded-sm flex items-center justify-center">
            <MdSearch size={30} />
          </button>
        </div>

        <div className="ml-0 md:ml-[50px] md:mt-2 lg:ml-[30px] xl:ml-[200px] cursor-pointer flex gap-2">
          {!isAuthUser && !isAuthAdmin ? (
            <>
              <TopLink
                name="Quotes"
                Icon={<MdHelp />}
                callback={() => setModalShow("quotes")}
              />
              <TopLink
                name="Login"
                Icon={<MdLock />}
                callback={() => setModalShow("login")}
              />
              <TopLink
                name="Signup"
                Icon={<MdLock />}
                callback={() => setModalShow("signup")}
              />
            </>
          ) : isAuthUser ? (
            <>
              <TopLink
                name="Quotes"
                Icon={<MdHelp />}
                callback={() => setModalShow("quotes")}
              />
              <TopLink
                name="Profile"
                Icon={<MdPerson />}
                callback={() => navigate(`/user/${user._id}`)}
              />
            </>
          ) : (
            <TopLink
              name="Admin Panel"
              Icon={<MdPerson />}
              callback={() => navigate("/admin")}
            />
          )}
        </div>
      </div>

      <div className="p-[8px] bg-accentTwo shadow-xl mb-[15px]">
        <ul className="list-none items-center flex-wrap flex flex-row justify-center">
          {data.map((thing) => (
            <li key={thing.id} className="mx-[10px]">
              <a
                className="font-semibold"
                href={`/professions?profession=${thing.urlSlug}`}
                onClick={(e) => e.preventDefault()}
              >
                {thing.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center">
        <AuthModals trigger={modalShow} setTrigger={setModalTrigger} />
      </div>
    </header>
  );
};

export default Header;
