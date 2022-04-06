import React from "react";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Main from "./pages/Main";
import ListingDetail from "./pages/listingDetail";
import NotFound from "./pages/NotFound";

import User from "./pages/user";
import CreateService from "./pages/user/create";
import EditService from "./pages/user/edit";

import { Listings } from "./pages/admin/listings";
import { Professions } from "./pages/admin/professions";
import { Services } from "./pages/admin/services";
import { Users } from "./pages/admin/users";

const App = () => {
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
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/user" element={<User />} />
          <Route path="/listings">
            <Route path=":id">
              <Route path="" element={<ListingDetail />} />
              <Route path="edit" element={<EditService />} />
            </Route>
            <Route path="" element={<Navigate to="/" />} />
            <Route path="create" element={<CreateService />} />
          </Route>
          <Route path="/admin">
            <Route path="" element={<Navigate to="/admin/listings" />} />
            <Route path="professions" element={<Professions />} />
            <Route path="services" element={<Services />} />
            <Route path="listings" element={<Listings />} />
            <Route path="users" element={<Users />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
