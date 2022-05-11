import React from "react";
import { useSetRecoilState } from "recoil";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Main from "./pages/Main";
import ListingDetail from "./pages/listingDetail";
import NotFound from "./pages/NotFound";

import User from "./pages/user";
import CreateService from "./pages/user/create";
import EditService from "./pages/user/edit";

import Home from "./pages/admin/home"
import Listings from "./pages/admin/listings";
import Professions from "./pages/admin/professions";
import Services from "./pages/admin/services";
import Users from "./pages/admin/users";
import useAuth from "./hooks/useAuth";
import { authState } from "./store/auth";
import { professions, listings } from "./store/data";
import useData from "./hooks/useData";
import UserDetail from "./pages/userDetail";
import { Loader } from "./components/atoms/loader";

const App = () => {
  const { getUser } = useAuth();

  const { getProfessions, getListings } = useData();
  const setAuthState = useSetRecoilState(authState);
  const setProfessions = useSetRecoilState(professions);
  const setListings = useSetRecoilState(listings);

  React.useEffect(() => {
    getUser(setAuthState).then().catch();
    getProfessions(setProfessions).then().catch();
    getListings(setListings).then().catch();
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
