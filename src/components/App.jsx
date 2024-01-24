import { Route, Routes } from "react-router-dom";

import Layout from "./outlet/outlet";
import { SignUpPage } from "components/authform/signup/signup-page";
import { LoginPage } from "components/authform/login/login-page";
import Phonebook from "./phonebook";
import { UserPage } from "./authform/user/user-page";

export const App = () => {
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
