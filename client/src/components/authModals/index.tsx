import React from "react";

import CloseEl from "../atoms/Close";
const Login = React.lazy(() => import("./login"));
const Signup = React.lazy(() => import("./signup"));
const Quotes = React.lazy(() => import("./quotes"));
const Search = React.lazy(() => import("./search"));
const ChangePassword = React.lazy(() => import("./changePassword"));
const ForgotPassword = React.lazy(() => import("./forgotPassword"));
const ResetPassword = React.lazy(() => import("./resetPassword"));
const Logout = React.lazy(() => import("./logout"));

import { Loader } from "../atoms/loader";

const AuthModals = ({
  trigger,
  setModalShow,
}: {
  trigger: string;
  setModalShow: any;
}) => {
  const initialState = React.useMemo(() => {
    return {
      login: false,
      quotes: false,
      signup: false,
      search: false,
      change: false,
      forgot: false,
      reset: false,
      logout: false,
    };
  }, []);

  const [show, setShow] = React.useState(initialState);
  React.useEffect(() => {
    switch (trigger) {
      case "login":
        setShow({ ...initialState, login: true });
        break;
      case "signup":
        setShow({ ...initialState, signup: true });
        break;
      case "quotes":
        setShow({ ...initialState, quotes: true });
        break;
      case "search":
        setShow({ ...initialState, search: true });
        break;
      case "change":
        setShow({ ...initialState, change: true });
        break;
      case "forgot":
        setShow({ ...initialState, forgot: true });
        break;
      case "reset":
        setShow({ ...initialState, reset: true });
        break;
      case "logout":
        setShow({ ...initialState, logout: true });
        break;
      default:
        setShow(initialState);
        break;
    }
  }, [trigger, initialState]);

  const closeCurrent = (e: any) => {
    setShow(initialState);
    setModalShow("");
  };

  if (show === initialState) {
    return null;
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
            <React.Suspense fallback={<Loader />}>
              <div className="relative -top-[3.5rem]">
                <img
                  className="rounded-full h-28 border-8 border-accentTwo"
                  src="/favicon.ico"
                  alt=""
                />
              </div>
              {show.signup && <Signup setModal={closeCurrent} />}
              {show.login && <Login setModal={closeCurrent} />}
              {show.quotes && <Quotes setModal={closeCurrent} />}
              {show.search && <Search setModal={closeCurrent} />}
              {show.change && <ChangePassword setModal={closeCurrent} />}
              {show.forgot && <ForgotPassword setModal={closeCurrent} />}
              {show.reset && <ResetPassword setModal={closeCurrent} />}
              {show.logout && <Logout setModal={closeCurrent} />}
            </React.Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModals;
