import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Bounce } from "react-toastify";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import ListingDetail from "./pages/listingDetail";

import User from "./pages/user";
import EditService from "./pages/user/edit";
import CreateService from "./pages/user/create";

import useAuth from "./hooks/useAuth";
import Home from "./pages/admin/home";
import useData from "./hooks/useData";
import Users from "./pages/admin/users";
import UserDetail from "./pages/userDetail";
import Listings from "./pages/admin/listings";
import Services from "./pages/admin/services";
import { Loader } from "./components/atoms/loader";
import Professions from "./pages/admin/professions";

const App = () => {
  const { getUser } = useAuth();

  const { getProfessions, getListings } = useData();

  React.useEffect(() => {
    getUser().then().catch();
    getProfessions().then().catch();
    getListings({}).then().catch();
  }, []);

  return (
    <BrowserRouter>
      <div className="flex flex-col items-center justify-center">
        <ToastContainer
          position="bottom-right"
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
        <React.Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/user/:userId">
              <Route path="" element={<UserDetail />} />
              <Route path="home" element={<User />} />
              <Route path="create" element={<CreateService />} />
              <Route path=":listingId/edit" element={<EditService />} />
            </Route>
            <Route path="/listings">
              <Route path="" element={<Navigate to="/" />} />
              <Route path=":id" element={<ListingDetail />} />
            </Route>
            <Route path="/admin">
              <Route path="" element={<Navigate to="/admin/home" />} />
              <Route path="home" element={<Home />} />
              <Route path="professions" element={<Professions />} />
              <Route path="services" element={<Services />} />
              <Route path="listings" element={<Listings />} />
              <Route path="users" element={<Users />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </React.Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
