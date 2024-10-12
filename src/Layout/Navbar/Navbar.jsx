import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSearch, FaHeart} from "react-icons/fa";
import { CgUser } from "react-icons/cg";
const Navbar = () => {
  const hover = 'hover:text-subMain transitions text-white'
  const Hover = ({isActive}) => (isActive? 'text-subMain' : hover) 
  return (
    <>
      <div className="bg-main shadow-md sticky top-0 z-20">
        <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center">
          {/* logo */}
          <div className="col-span-1 lg:block hidden">
            <Link to="/">
              <img
                src="/src/images/4x3.jpg"
                alt="logo"
                style={{scale:'1.2'}}
                className="w-full h-12 object-contain"
              />
            </Link>
          </div>
          {/* Search form */}
          <div className="col-span-3">
            <form className="w-full text-sm bg-dryGray rounded flex-btn gap-4">
              <button
                type="submit"
                className="bg-subMain w-12 flex-colo h-12 rounded text-white"
              >
                <FaSearch></FaSearch>
              </button>
              <input
                type="text"
                placeholder="Search Movie Name from here"
                className="font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black"
              ></input>
            </form>
          </div>
          {/* menus */}
          <div className="col-span-3 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center">
            <NavLink className={Hover} to="/movies">
              Movies
            </NavLink>
            <NavLink className={Hover} to="/about-us">
              About Us
            </NavLink>
            <NavLink className={Hover} to="/contact-us">
              Contact Us
            </NavLink>
            <NavLink className={Hover} to="/login">
              <CgUser className="w-8 h-8"></CgUser>
            </NavLink>
            <NavLink className={`${Hover} relative`} to="/favourites">
              <FaHeart className="w-6 h-6"></FaHeart>
              <div className="w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1">3</div>
            </NavLink>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
