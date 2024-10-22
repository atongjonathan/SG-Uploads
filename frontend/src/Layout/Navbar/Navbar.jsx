import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaHeart } from "react-icons/fa";
import logo from "../../images/4x3.jpg";
import { Button } from "@headlessui/react";
import { useMovies, useUser } from "../../utils/SWR";
import AuthContext from "../../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Navbar = () => {
  const hover = 'hover:text-subMain transitions text-white';
  const Hover = ({ isActive }) => (isActive ? 'text-subMain' : hover);
  const navigate = useNavigate();

  const { authTokens, logoutUser } = useContext(AuthContext);
  const user = useUser(authTokens?.access)?.user;
  const movies = useMovies()?.movies || [];
  const [isResults, setResults] = useState([]);

  const location = useLocation(); // Get the current path
  const { pathname, search } = location; // Extract pathname and search

  // Helper function to determine active state
  const isActive = (linkPath) => pathname + search === linkPath;


  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(query)
    );
    setResults(filtered);
  };

  const handleResultClick = (title) => {
    navigate(`/movie/${title}`);
    setResults([]);
  };

  const userAvatar = user?.image
    ? `${BACKEND_URL}${user.image}`
    : `https://ui-avatars.com/api/?name=${user?.name || user?.username}&rounded=true&background=14759f&size=35&color=fff`;

  return (
    <div className="bg-main shadow-md sticky top-0 z-20">
      <div className="container mx-auto py-3 px-2 lg:py-6 lg:grid gap-10 grid-cols-7 justify-between items-center">
        {/* Logo */}
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

        {/* Links for small screens */}
        <div className="col-span-3 lg:hidden flex-rows text-text text-sm gap-3">
          <Link
            to="/movies?category=Sort%20By%20Categories&year=Sort%20by%20Year&times=Sort%20by%20Hours&rates=Sort%20by%20Star%20Rates"
            className={`${isActive("/movies?category=Sort%20By%20Categories&year=Sort%20by%20Year&times=Sort%20by%20Hours&rates=Sort%20by%20Star%20Rates") ? "bg-subMain" : "bg-dry"
              } p-3 cursor-pointer rounded-2xl border border-gray-800`}
          >
            All Movies
          </Link>

          {/* Action Movies Link */}
          <Link
            to="/movies?category=Action"
            className={`${isActive("/movies?category=Action") ? "bg-subMain" : "bg-dry"
              } p-3 cursor-pointer rounded-2xl border border-gray-800`}
          >
            Action
          </Link>

          {/* Horror Movies Link */}
          <Link
            to="/movies?category=Horror"
            className={`${isActive("/movies?category=Horror") ? "bg-subMain" : "bg-dry"
              } p-3 cursor-pointer rounded-2xl border border-gray-800`}
          >
            Horror
          </Link>
        </div>

        {/* Search Form */}
        <div className="col-span-3 relative lg:block hidden">
          <form className="w-full text-sm bg-dryGray rounded flex-btn gap-4 relative">
            <button type="submit" className="bg-subMain w-12 flex-colo h-12 rounded text-white">
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
            <div className="w-full bg-dry border border-gray-800 p-1 rounded-md absolute">
              <table className="w-full table-auto border border-border divide-y divide-border">
                <tbody className="bg-main divide-y divide-gray-800">
                  {isResults.slice(0, 3).map((movie, idx) => (
                    <tr
                      key={idx}
                      className="hover:text-main hover:bg-dryGray hover:cursor-pointer"
                      title={movie.title}
                      onClick={() => handleResultClick(movie.title)}
                    >
                      <td className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="h-full w-full object-cover"
                        />
                      </td>
                      <td className="text-white">{movie.title}</td>
                      <td className="text-white">{movie.year}</td>
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
            Movies
          </NavLink>
          {!user && (
            <>
              <NavLink title="About Us" className={Hover} to="/about-us">
                About
              </NavLink>
              <NavLink title="Contact Us" className={Hover} to="/contact-us">
                Contact
              </NavLink>
            </>
          )}
          {user && (
            <NavLink title={user.is_superuser ? "Dashboard" : "Profile"} className={Hover} to={user.is_superuser ? "/dashboard" : "/profile"}>
              {user.is_superuser ? "Dashboard" : "Profile"}
            </NavLink>
          )}
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
                <img src={userAvatar} alt={`${user?.username} avatar`} className="absolute w-12 h-12 rounded-full" />
              </div>
            </NavLink>
          )}
          {user ? (
            <Button title="Log Out" className={Hover} onClick={() => { logoutUser(); navigate("/login"); }}>
              Logout
            </Button>
          ) : (
            <NavLink className={Hover} to="/login">
              Log In
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
