import React from "react";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Main from "./pages/Main";
import User from "./pages/User";
import ServiceDetail from "./pages/ServiceDetail";
import NotFound from "./pages/NotFound";
import { loadUser } from "./redux/actions/auth.action";

import ProfesssionNameTable from "./pages/admin/professionNameTable";
import ServiceNameTable from "./pages/admin/serviceNameTable";
import ServiceTable from "./pages/admin/ServiceTable";
import UserTable from "./pages/admin/UserTable";

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="flex flex-col items-center justify-center">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          transition={Bounce}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/user" element={<User />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route
            path="/admin/listed-rofessions"
            element={<ProfesssionNameTable />}
          />
          <Route
            path="/admin/list-services-names"
            element={<ServiceNameTable />}
          />
          <Route path="/admin/listed-services" element={<ServiceTable />} />
          <Route path="/admin/listed-users" element={<UserTable />} />
          <Route
            path="/admin"
            element={<Navigate to="/admin/listed-services" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
