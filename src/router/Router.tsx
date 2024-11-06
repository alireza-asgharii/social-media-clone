import { Routes, Route } from "react-router-dom";

//pages
import {
  AllUser,
  CreatePost,
  EditPost,
  Explore,
  Home,
  PostDetails,
  Profile,
  Saved,
  UpdateProfile,
} from "../_root/pages";

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
        <Route path="/explore" element={<Explore />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/all-users" element={<AllUser />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/update-post/:id" element={<EditPost />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/profile/:id/*" element={<Profile />} />
        <Route path="/update-profile/:id" element={<UpdateProfile />} />
      </Route>
    </Routes>
  );
};

export default Router;
