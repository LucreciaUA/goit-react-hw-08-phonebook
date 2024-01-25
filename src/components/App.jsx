import { Route, Routes } from "react-router-dom";

import Layout from "./outlet/outlet";
import { SignUpPage } from "components/authform/signup/signup-page";
import { LoginPage } from "components/authform/login/login-page";
import Phonebook from "./phonebook";
import { UserPage } from "./authform/user/user-page";
import { useDispatch, useSelector } from "react-redux";
import { verifyUserThunk } from "../redux/store/authorisationSlicer";
import { useEffect } from "react";

export const App = () => {
  const isVerified = useSelector(state => state.authorisation.isVerified) 
  const dispatch = useDispatch()
useEffect(() => {
  !isVerified && dispatch(verifyUserThunk())

}, [isVerified, dispatch])


  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Phonebook />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="user" element={<UserPage />} />
        </Route>
      </Routes>
    </div>
  );
};
