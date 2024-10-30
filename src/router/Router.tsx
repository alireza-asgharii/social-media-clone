import { Routes, Route } from "react-router-dom";
import { Home } from "../_root/pages";
import SigninForm from "../_auth/forms/SigninForm";
import SignupForm from "../_auth/forms/SignupForm";
import RootLayout from "../_root/RootLayout";
import AuthLayout from "../_auth/AuthLayout";

const Router = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SigninForm />} />
        <Route path="/sign-up" element={<SignupForm />} />
      </Route>

      {/* privte routes */}
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Router;
