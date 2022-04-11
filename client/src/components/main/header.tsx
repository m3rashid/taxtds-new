import React from "react";
import {
  MdAdminPanelSettings,
  MdAccountCircle,
  MdSettingsPower,
} from "react-icons/md";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

import AuthModals from "../authModals";
import { authState } from "../../store/auth";
import Dropdown from "../atoms/dropdown";
import TopLink from "../atoms/topLink";
import {
  adminLoggedInActions,
  notLoggedInActions,
  userLoggedInActions,
  data,
} from "./headerActions";

const Header = () => {
  const { isAuthenticated, role, user } = useRecoilValue(authState);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState<
    | "login"
    | "signup"
    | "quotes"
    | "search"
    | "change"
    | "forgot"
    | "reset"
    | "logout"
    | ""
  >("");

  const isAuthUser = isAuthenticated && role === "USER";
  const isAuthAdmin = isAuthenticated && role === "ADMIN";

  const userActions = isAuthUser
    ? userLoggedInActions(user._id)
    : isAuthAdmin
    ? adminLoggedInActions
    : notLoggedInActions;

  return (
    <header className="w-screen">
      <div className="bg-accentOne p-[5px] md:p-[10px] flex items-center justify-around">
        <div className="flex-shrink flex flex-row mt-2 md:mt-0 mb-3 md:mb-0">
          <img className="" src="/images/foot-logo.png" alt="logo" />
        </div>

        <div className="ml-0 md:ml-[50px] md:mt-2 lg:ml-[30px] xl:ml-[200px] cursor-pointer flex gap-2">
          <Dropdown
            open={open}
            setOpen={setOpen}
            name={
              isAuthUser
                ? "User Actions"
                : isAuthAdmin
                ? "Admin Actions"
                : "Actions"
            }
            Icon={
              isAuthUser ? (
                <MdAccountCircle />
              ) : isAuthAdmin ? (
                <MdAdminPanelSettings />
              ) : (
                <MdSettingsPower />
              )
            }
          >
            {userActions.map((action) => (
              <TopLink
                key={action.name}
                name={action.name}
                Icon={action.Icon}
                callback={() => {
                  setOpen(false);
                  if (action.modalName !== "") {
                    setModalShow(action.modalName as any);
                  }
                  if (action.to !== "") {
                    navigate(action.to);
                  }
                }}
              />
            ))}
          </Dropdown>
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
        <AuthModals trigger={modalShow} setModalShow={setModalShow} />
      </div>
    </header>
  );
};

export default Header;
