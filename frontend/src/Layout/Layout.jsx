import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { Toaster } from "sonner";

const Layout = ({ children }) => {
  return (
    <>
      <div className="bg-main text-white">
        <Toaster></Toaster>
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
      </div>
    </>
  );
};

export default Layout;
