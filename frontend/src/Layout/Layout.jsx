import React, { useContext } from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { Toaster } from "sonner";
import MobileFooter from "./Footer/MobileFooter";
import { MovieContext } from "../context/MovieContext";
import LoadingIcons from "react-loading-icons";
import ScrollToTop from "react-scroll-to-top";
import { BiArrowToTop } from "react-icons/bi";
import SiteDown from '../Screens/SiteDown'

const Layout = ({ children }) => {
  const { isLoading, movies } = useContext(MovieContext)

  return (
    <>
      {
        (!isLoading && !movies) ? <SiteDown></SiteDown>
          :
          (
            <div className="bg-main text-white relative">
              <Toaster position="top-right" toastOptions={{
                classNames: {
                  toast: 'bg-subMain',
                  title: 'text-white',
                  closeButton: 'bg-subMain text-white hover:text-subMain',
                },
              }} ></Toaster>
              <Navbar></Navbar>
              <div className="lg:mt-32 mt-16">
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
