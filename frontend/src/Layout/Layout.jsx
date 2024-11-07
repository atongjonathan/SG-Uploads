import React, { useContext } from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { Toaster } from "sonner";
import MobileFooter from "./Footer/MobileFooter";
import { MovieContext } from "../context/MovieContext";
import LoadingIcons from "react-loading-icons";

const Layout = ({ children }) => {
  const { isLoading, movies } = useContext(MovieContext)

  return (
    <>
      {
        isLoading ?
          (
            <div className="w-screen min-h-screen bg-main flex justify-center items-center">
                <LoadingIcons.Puff className="h-16 animate-pulse" speed={2} />
            </div>

          )
          : !movies ? <div className="h-96 flex flex-col justify-center items-center">
            <h3>Site down for planned maintenance...</h3>
            <p>We'll be back soon!</p>
          </div>
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
              </div>
            )
      }

    </>
  );
};

export default Layout;
