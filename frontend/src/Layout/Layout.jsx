import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { Toaster } from "sonner";
import MobileFooter from "./Footer/MobileFooter";

const Layout = ({ children }) => {
  return (
    <>
      <div className="bg-main text-white">
        <Toaster></Toaster>
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
        <MobileFooter></MobileFooter>
      </div>
    </>
  );
};

export default Layout;
