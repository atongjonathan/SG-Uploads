import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSearch, FaHeart } from "react-icons/fa";
import logo from "../../images/4x3.jpg"
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { Button } from "@headlessui/react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useMovies, useUser } from "../../utils/SWR";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Navbar = () => {
  const hover = 'hover:text-subMain transitions text-white'
  const Hover = ({ isActive }) => (isActive ? 'text-subMain' : hover)
  const signOut = useSignOut()
  const navigate = useNavigate()
  const isAuthenticated = useIsAuthenticated()


  const auth = useAuthHeader()
  const user = useUser(auth)?.user
  const movies = useMovies()?.movies
  const [isresults, setResults] = useState([])
  function searchMovie(e) {
    setResults(movies.filter((movie) => movie.title.toLowerCase().includes(e.target.value.toLowerCase())))
  }


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
          <div className="col-span-3 relative">
              <form className="w-full text-sm bg-dryGray rounded flex-btn gap-4 relative">
                <button
                  type="submit"
                  className="bg-subMain w-12 flex-colo h-12 rounded text-white"
                >
                  <FaSearch></FaSearch>
                </button>
                <input
                  type="text"
                  placeholder="Search Movie Name from here"
                  className="font-medium placeholder:text-border text-sm w-full h-12 bg-transparent border-none px-2 text-black"
                  onInput={(e) => searchMovie(e)}
                ></input>
              </form>
              <div className="w-full bg-dry border border-gray-800 p-1 rounded-md xl:mb-0 mb-5 absolute">


                <table className='w-full table-auto border border-border divide-y divide-border'>

                  <tbody className='bg-main divide-y divide-gray-800'>
                    {
                      isresults?.slice(0, 3).map((movie, idx) => (
                        <tr key={idx} className='hover:text-main hover:bg-dryGray hover:cursor-pointer' title={movie.title} onClick={() => {
                          navigate(`/movie/${movie.title}`)
                          setResults([])
                          
                          }}>
                          <td key={movie.title} className={`${Text}`}>
                            <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
                              <img src={movie.poster} alt={movie.title} className='h-full w-full object-cover' />
                            </div>
                          </td>
                          <td className={Text}>{movie.title}</td>
                          <td className={Text}>{movie.year}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
          </div>
          {/* menus */}
          <div className="col-span-3 font-medium text-sm hidden xl:gap-10 2xl:gap-20 justify-between lg:flex xl:justify-end items-center">

            { }
            <NavLink title="Movies" className={Hover} to="/movies">
              Movies
            </NavLink>
            {!user && <NavLink title="About Us" className={Hover} to="/about-us">
              About
            </NavLink>}

            {!user && <NavLink title="Contact Us" className={Hover} to="/contact-us">
              Contact
            </NavLink>}


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

            {isAuthenticated &&
              <NavLink className={`${Hover} relative`} to="/profile" title="Favourites">
                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  {user?.image && <img className="absolute w-12 h-12 rounded-full " src={BACKEND_URL + user.image} alt={user?.username + ' image'} />}

                </div>              </NavLink>
            }
            {isAuthenticated ?
              (<Button title="Log Out" className={Hover} onClick={() => {
                signOut()
                navigate("/login")
              }}>
                Logout


              </Button>) : <NavLink className={Hover} to="/login">
                <p>Log In</p></NavLink>}

          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
