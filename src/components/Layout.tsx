import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navigation from "./Navigation";
import SubNavigation from "./SubNavigation";

function Layout() {
  return (
    <div className="flex-1 min-h-screen z-20">
      <Navigation />
      <SubNavigation />
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="flex-1 min-h-screen">
          <Outlet />
        </div>
        <div className="z-10">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;
