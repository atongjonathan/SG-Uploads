import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <div className="bg-main text-white">
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
      </div>
    </>
  );
};

export default Layout;
