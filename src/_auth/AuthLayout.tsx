import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/AuthContext";

const AuthLayout = () => {
  const { isAuthenticated } = useUserContext();

  if (isAuthenticated) return <Navigate to="/" />;
  return (
    <>
      <section className="flex flex-1 flex-col items-center justify-center overflow-y-auto py-10 [&::-webkit-scrollbar]:w-0">
        <Outlet />
      </section>
      <img
        src="/assets/images/grid-login.png"
        alt="logo"
        className="hidden h-screen w-1/2 bg-no-repeat object-cover xl:block"
      />
    </>
  );
};

export default AuthLayout;
