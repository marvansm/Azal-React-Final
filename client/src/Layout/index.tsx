import { Outlet, useLocation } from "@tanstack/react-router";
import Header from "./Header";
import Footer from "./Footer";
import { LoadingProvider } from "../Provider/LoadingProvider";

const Layout = () => {
  const location = useLocation();
  const hideHeaderFooter =
    location.pathname === "/cabinet" || location.pathname === "/login" || location.pathname === "/confirmation";

  return (
    <LoadingProvider>
      <div>
        {!hideHeaderFooter && <Header />}
        <main>
          <Outlet />
        </main>
        {!hideHeaderFooter && <Footer />}
      </div>
    </LoadingProvider>
  );
};

export default Layout;
