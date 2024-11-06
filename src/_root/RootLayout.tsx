import { Outlet } from "react-router-dom";
import Topbar from "../components/shared/Topbar";
import LeftSidebar from "../components/shared/LeftSidebar";
import BottomBar from "../components/shared/BottomBar";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex h-full flex-1">
        <Outlet />
      </section>

      <BottomBar />
    </div>
  );
};

export default RootLayout;
