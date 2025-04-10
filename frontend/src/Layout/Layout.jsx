import React, { useContext, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { Toaster } from "sonner";
import MobileFooter from "./Footer/MobileFooter";
import { MovieContext, useMovies } from "../context/MovieContext";
import ScrollToTop from "react-scroll-to-top";
import { BiArrowToTop } from "react-icons/bi";
import SiteDown from '../Screens/Error/SiteDown'
import Verify from "../Components/Modals/Verify";

const Layout = ({ children }) => {
  const { isError } = useMovies()


  return (
    <>
      {
        isError ? <SiteDown></SiteDown>
          :
          (
            <div className="bg-main text-white relative min-h-[95vh] lg:min-h-[100vh]">
              <Toaster position="top-right" theme="dark" closeButton toastOptions={{
                classNames: {
                  toast: 'bg-subMain',
                  title: 'text-white',
                  closeButton: 'bg-subMain text-white hover:text-subMain',
                },
              }} ></Toaster>              
              <Verify/>
              <Navbar></Navbar>
              <div className="lg:mt-24 mt-16">
                {children}
              </div>
              <Footer></Footer>
              <MobileFooter></MobileFooter>
              <ScrollToTop component={<BiArrowToTop className="h-6 w-6" />} style={{
                backgroundColor: '#14759f'
              }} className="border-b-subMain rounded-lg hover:bg-main transitions flex items-center justify-center mb-8" smooth />
            </div>
          )
      }

    </>
  );
};

export default Layout;
