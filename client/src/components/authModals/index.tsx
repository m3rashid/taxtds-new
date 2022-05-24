import React from "react";

import ModalWrapper from "../modalWrapper";

const Login = React.lazy(() => import("./login"));
const Signup = React.lazy(() => import("./signup"));
const Quotes = React.lazy(() => import("./quotes"));
const Search = React.lazy(() => import("./search"));
const ChangePassword = React.lazy(() => import("./changePassword"));
const ForgotPassword = React.lazy(() => import("./forgotPassword"));
const ResetPassword = React.lazy(() => import("./resetPassword"));
const Logout = React.lazy(() => import("./logout"));

interface IProps {
  trigger: string;
  setModalShow: any;
}

const AuthModals: React.FC<IProps> = ({ trigger, setModalShow }) => {
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

  const closeCurrent = () => {
    setShow(initialState);
    setModalShow("");
  };

  if (show === initialState) {
    return null;
  }

  return (
    <ModalWrapper close={closeCurrent}>
      {show.signup && <Signup setModal={closeCurrent} />}
      {show.login && <Login setModal={closeCurrent} />}
      {show.quotes && <Quotes setModal={closeCurrent} />}
      {show.search && <Search setModal={closeCurrent} />}
      {show.change && <ChangePassword setModal={closeCurrent} />}
      {show.forgot && <ForgotPassword setModal={closeCurrent} />}
      {show.reset && <ResetPassword setModal={closeCurrent} />}
      {show.logout && <Logout setModal={closeCurrent} />}
    </ModalWrapper>
  );
};

export default AuthModals;
