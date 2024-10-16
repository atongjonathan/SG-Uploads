import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { Toaster } from "sonner";
import MobileFooter from "./Footer/MobileFooter";

const Layout = ({ children }) => {
  return (
    <>
      <div className="bg-main text-white">
        <Toaster position="top-right" toastOptions={{
          classNames: {
            toast: 'bg-subMain',
            title: 'text-white',
            closeButton: 'bg-subMain text-white hover:text-subMain',
          },
        }} ></Toaster>
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
        <MobileFooter></MobileFooter>
      </div>
    </>
  );
};

export default Layout;
