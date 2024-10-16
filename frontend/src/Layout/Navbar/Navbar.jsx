import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSearch, FaHeart } from "react-icons/fa";
import logo from "../../images/4x3.jpg"
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { Button } from "@headlessui/react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useUser } from "../../utils/SWR";

const Navbar = () => {
  const hover = 'hover:text-subMain transitions text-white'
  const Hover = ({ isActive }) => (isActive ? 'text-subMain' : hover)
  const signOut = useSignOut()
  const navigate = useNavigate()
  const isAuthenticated = useIsAuthenticated()

  const auth = useAuthHeader()
  const user = useUser(auth)?.user


  return (
    <>
      <div className="bg-main shadow-md sticky top-0 z-20">

        <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center">
          {/* logo */}
          <div className="col-span-1 lg:block hidden">
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                style={{ scale: '1.2' }}
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
                className="font-medium placeholder:text-border text-sm w-10/12 h-12 bg-transparent border-none px-2 text-black"
              ></input>
            </form>
          </div>
          {/* menus */}
          <div className="col-span-3 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center">

            { }
            <NavLink title="Movies" className={Hover} to="/movies">
              Movies
            </NavLink>
            <NavLink title="About Us" className={Hover} to="/about-us">
              About
            </NavLink>

            <NavLink title="Contact Us" className={Hover} to="/contact-us">
              Contact
            </NavLink>
            {isAuthenticated && user?.is_superuser ? <NavLink title="Dashboard" className={Hover} to="/dashboard">
              Dashboard
            </NavLink> : isAuthenticated &&
            <NavLink title="Dashboard" to='/profile' className={Hover}>
              Profile
            </NavLink>}
            {isAuthenticated &&
              <NavLink className={`${Hover} relative`} to="/favourites" title="Favourites">
                <FaHeart className="w-5 h-5"></FaHeart>
                <div className="w-4 h-4 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-3 -right-3">{user?.favourites?.length}</div>
              </NavLink>
            }
            {isAuthenticated ?
              (<Button title="Log Out" className={Hover} onClick={() => {
                signOut()
                navigate("/login")
              }}>
                LogOut
              </Button>) : <NavLink className={Hover} to="/login">
                <p>Log In</p></NavLink>}

          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
