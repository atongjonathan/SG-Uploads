import React, { useCallback, useContext, useState } from "react";
import {  NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaHeart } from "react-icons/fa";
import logo from "../../images/4x3.jpg";
import { Button } from "@headlessui/react";
import AuthContext from "../../context/AuthContext";
import { MovieContext } from "../../context/MovieContext";
import SgMenu from "./SgMenu";
import LoginModal from '../../Components/Modals/LoginModal'
import SignUpModal from '../../Components/Modals/SignUpModal'


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Navbar = () => {
  const hover = 'hover:text-subMain transitions text-white';
  const Hover = ({ isActive }) => (isActive ? 'text-subMain' : hover);
  const navigate = useNavigate();


  const {  user } = useContext(AuthContext);
  const movies = useContext(MovieContext)?.movies || [];
  const [isResults, setResults] = useState([]);

  const location = useLocation(); // Get the current path
  const { pathname, search } = location; // Extract pathname and search

  // Helper function to determine active state
  const isActive = (linkPath) => pathname + search === linkPath;

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const closeLogin = useCallback(() => {
    setIsLoginOpen(false);
  }, []);

  const closeSignUp = useCallback(() => {
    setIsSignUpOpen(false);
  }, []);

  const openSignUp = useCallback(() => {
    setIsLoginOpen(false)
    setIsSignUpOpen(true)

  })
  const openLogin = useCallback(() => {
    setIsSignUpOpen(false)
    setIsLoginOpen(true)

  })

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (query == '') {
      setResults([])
    }
    else {
      const filtered = movies.filter(movie =>
        movie.title.toLowerCase().includes(query)
      );

      setResults(filtered);
    }

  };

  const handleResultClick = (title) => {
    navigate(`/watch/${title}`);
    setResults([]);
  };


  const userAvatar = user?.image
    ? `${BACKEND_URL}${user.image}`
    : `https://ui-avatars.com/api/?name=${user?.name || user?.username}&rounded=true&background=14759f&size=35&color=fff`;

  return (
    <div className="bg-main shadow-md fixed top-0 z-20 w-full">
      <div className="container mx-auto py-3 px-2 lg:py-6 lg:grid gap-10 grid-cols-7 justify-between items-center min-h-7">
        {/* Logo */}
        <div className="col-span-1 lg:block hidden">
          <NavLink to="/">
            <img
              src={logo}
              alt="logo"
              style={{ scale: '1.2' }}
              className="w-full h-12 object-contain"
            />
          </NavLink>
        </div>


        <div className="col-span-3 lg:hidden flex-rows text-text text-sm gap-3">

          <NavLink
            to="/movies"
            className={`${isActive("/movies") ? "bg-subMain" : "bg-dry"
              } p-3 cursor-pointer rounded-2xl border border-gray-800`}
          >
            Browse
          </NavLink>


          {/* Action Movies NavLink */}
          <NavLink
            to="/movies?category=Action"
            className={`${isActive("/movies?category=Action") ? "bg-subMain" : "bg-dry"
              } p-3 cursor-pointer rounded-2xl border border-gray-800`}
          >
            Action
          </NavLink>

          {/* Horror Movies NavLink */}
          <NavLink
            to="/movies?category=Horror"
            className={`${isActive("/movies?category=Horror") ? "bg-subMain" : "bg-dry"
              } p-3 cursor-pointer rounded-2xl border border-gray-800`}
          >
            Horror
          </NavLink>

          {
            user == undefined ? <Button className={`${Hover} relative`} onClick={openLogin} title="Profile">
              <div className="relative inline-flex items-center justify-center w-9 h-9 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <img src={`https://ui-avatars.com/api/?name=ME&rounded=true&background=14759f&size=35&color=fff`} alt={`${user?.username} avatar`} className="absolute w-10 h-10 rounded-full" />
              </div>
            </Button> :
              <NavLink to={`/profile`} className={`${Hover} relative`} title="Profile">
                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <img src={userAvatar} alt={`${user?.username} avatar`} className="absolute w-10 h-10 rounded-full" />
                </div>
              </NavLink>
          }


        </div>



        {/* Search Form */}

        <div className={`col-span-3 relative p-4 hidden lg:inline-block`}>
          <form className="w-full text-sm bg-dryGray rounded flex-btn gap-4">
            <button type="button" className="bg-subMain w-12 flex-colo h-12 rounded text-white">
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search Movie Name from here"
              className="font-medium placeholder:text-border text-sm w-full h-12 bg-transparent border-none px-2 text-black"
              onInput={handleSearch}
            />
          </form>



          {/* Search Results */}
          {isResults.length > 0 && (
            <div className="w-full bg-dry border border-gray-800 p-1 rounded-md absolute left-0">
              <table className="w-full table-auto border border-border divide-y divide-border">
                <tbody className="bg-main divide-y divide-gray-800">
                  {isResults.slice(0, 3).map((movie, idx) => (
                    <tr
                      key={idx}
                      className="hover:text-main text-center hover:bg-dryGray hover:cursor-pointer"
                      title={movie.title}
                      onClick={() => handleResultClick(movie.title)}
                    >
                      <td className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
                        <img
                          src={movie.poster}
                          alt={movie.title} title={movie.title}
                          className="h-full w-full object-cover"
                        />
                      </td>
                      <td>{movie.title}</td>
                      <td>{movie.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Menus for larger screens */}
        <div className="col-span-3 font-medium text-sm hidden xl:gap-10 2xl:gap-20 justify-between lg:flex xl:justify-end items-center">
          <NavLink title="Movies" className={Hover} to="/movies">
            Browse
          </NavLink>
          <SgMenu></SgMenu>

          {user && (
            <NavLink className={`${Hover} relative`} to="/favourites" title="Favourites">
              <FaHeart className="w-5 h-5" />
              <div className="w-4 h-4 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-3 -right-3">
                {user?.favourites?.length}
              </div>
            </NavLink>
          )}
          {user && (
            <NavLink className={`${Hover} relative`} to="/profile" title="Profile">
              <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <img src={userAvatar} alt={`${user?.username} avatar`} className="absolute w-10 h-10 rounded-full" />
              </div>
            </NavLink>
          )}
          {!user && (
            <>
              <Button className={Hover} onClick={() => setIsLoginOpen(true)}>
                Log In
              </Button>

              <Button className={'bg-subMain border-b-subMain py-2 px-3 rounded-lg hover:bg-main transitions'} onClick={() => setIsSignUpOpen(true)}>
                Sign Up
              </Button>
            </>
          )}
          <SignUpModal isSignUpOpen={isSignUpOpen} setIsSignUpOpen={setIsSignUpOpen} openLogin={openLogin} closeSignUp={closeSignUp} ></SignUpModal>

          <LoginModal isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} openSignUp={openSignUp} closeLogin={closeLogin} ></LoginModal>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
