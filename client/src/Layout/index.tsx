import { Outlet, useLocation } from "@tanstack/react-router";
import Header from "./Header";
import Footer from "./Footer";
import { LoadingProvider } from "../Provider/LoadingProvider";
import { AuthProvider } from "../Provider/AuthProvider";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  const location = useLocation();
  const hideHeaderFooter =
    location.pathname === "/cabinet" ||
    location.pathname === "/login" ||
    location.pathname === "/confirmation" ||
    location.pathname === "/payment";

  return (
    <AuthProvider>
      <LoadingProvider>
        <Toaster position="top-right" />
        <div>
          {!hideHeaderFooter && <Header />}
          <main>
            <Outlet />
          </main>
          {!hideHeaderFooter && <Footer />}
        </div>
      </LoadingProvider>
    </AuthProvider>
  );
};

export default Layout;
