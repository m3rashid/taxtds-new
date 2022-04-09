import React from "react";

import CloseEl from "../atoms/Close";
import Login from "./login";
import Signup from "./signup";
import AdminLogin from "./adminLogin";
import Quotes from "./quotes";
import { authState } from "../../store/auth";
import { useRecoilValue } from "recoil";

const AuthModals = ({
  trigger,
  setTrigger,
}: {
  trigger: string;
  setTrigger: any;
}) => {
  const { isAuthenticated } = useRecoilValue(authState);

  const initialState = React.useMemo(() => {
    return {
      adminLogin: false,
      userLogin: false,
      quotes: false,
      userSignup: false,
    };
  }, []);

  const [show, setShow] = React.useState(initialState);
  React.useEffect(() => {
    switch (trigger) {
      case "admin":
        setShow({ ...initialState, adminLogin: true });
        break;
      case "login":
        setShow({ ...initialState, userLogin: true });
        break;
      case "signup":
        setShow({ ...initialState, userSignup: true });
        break;
      case "quotes":
        setShow({ ...initialState, quotes: true });
        break;
      default:
        setShow(initialState);
        break;
    }
  }, [trigger, initialState]);

  const closeCurrent = (e: any) => {
    setShow(initialState);
    setTrigger();
  };

  if (show === initialState) {
    return null;
  }
  if (isAuthenticated) {
    setShow(initialState);
  }

  document.addEventListener("keyup", (event) => {
    if (event.key === "Escape") {
      closeCurrent(event);
    }
  });

  return (
    <>
      <div
        id="backdrop"
        className="fixed top-0 left-0 right-0 bottom-0 overflow-hidden bg-accentOne opacity-70 z-10"
      ></div>
      <div className="absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] w-full flex items-center justify-center z-50">
        <div
          id="modal"
          className="bg-accentTwo rounded-md z-100 px-[15px] py-[25px] md:px-[25px] md:py-[35px] flex flex-col items-end"
        >
          <CloseEl callback={closeCurrent} />
          <div className="flex flex-col items-center bg-accentOne rounded-md px-[15px] pb-[25px] md:px-[25px] md:pb-[35px]">
            <div className="relative -top-[3.5rem]">
              <img
                className="rounded-full h-28 border-8 border-accentTwo"
                src="/favicon.ico"
                alt=""
              />
            </div>
            {show.userSignup && <Signup />}
            {show.userLogin && <Login />}
            {show.quotes && <Quotes />}
            {show.adminLogin && <AdminLogin />}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModals;
