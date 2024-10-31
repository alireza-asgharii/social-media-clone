import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  if (isAuthenticated) return <Navigate to="/" />;
  return (
    <>
      <section className="flex flex-1 justify-center items-center flex-col py-10 overflow-y-auto">
        <Outlet />
      </section>
      <img
        src="/assets/images/side-img.svg"
        alt="logo"
        className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
      />
    </>
  );
};

export default AuthLayout;
