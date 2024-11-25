import React, { useCallback, useContext, useState } from 'react'
import { BsHouseAddFill } from 'react-icons/bs'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from '@headlessui/react'
import AuthContext from '../../context/AuthContext';
import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import Login from '../../Screens/Auth/Login';
import Register from '../../Screens/Auth/Register';
import { IoClose } from 'react-icons/io5';
import PopMenu from './PopMenu';
import { FaSearch } from 'react-icons/fa';
import { MovieContext } from '../../context/MovieContext';

const MobileFooter = () => {
    const Hover = 'transitions text-2xl flex-colo hover:bg-white hover:text-main text-white rounded-md px-4 py-3'
    const { user } = useContext(AuthContext)
    let [isLoginOpen, setisLoginOpen] = useState(false)
    let [isSignUpOpen, setIsSignUpOpen] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [isResults, setResults] = useState([]);
    const movies = useContext(MovieContext)?.movies || [];
    const navigate = useNavigate()



    const closeLogin = useCallback(() => {
        setisLoginOpen(false);
    })

    const closeSignUp = useCallback(() => {
        setIsSignUpOpen(false);
    }, []);

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



    const openSignUp = useCallback(() => {
        setisLoginOpen(false)
        setIsSignUpOpen(true)

    })
    const isOpen = useCallback(() => {
        setisLoginOpen(false)

    })
    const openLogin = useCallback(() => {
        setIsSignUpOpen(false)
        setisLoginOpen(true)

    })

    const handleResultClick = (title) => {
        navigate(`/watch/${title}`);
        setResults([]);
    };



    return (
        <>


            <footer className='lg:hidden fixed z-50 bottom-0 w-full px-1'>
                <div className=" rounded-md p-1 bg-gradient-to-t from-dry from-40% to-100% flex justify-around items-center">

                    <NavLink title="Movies" className={Hover} to="/">
                        <BsHouseAddFill></BsHouseAddFill><p className='text-xs'>Home</p>
                    </NavLink>

                    <Button type="button" onClick={() => setShowModal(true)} className="transitions text-2xl flex flex-col items-center hover:bg-white hover:text-main text-white rounded-md px-4 py-3">
                        <FaSearch /> <p className='text-xs'>Search</p>
                    </Button>

                    <PopMenu user={user}></PopMenu>






                </div>
                <Dialog open={showModal} onClose={() => setShowModal(false)} className="relative z-50">
                    <DialogBackdrop className="fixed inset-0 bg-main/50"></DialogBackdrop>

                    <div className="fixed inset-0 flex w-full items-start justify-center p-4">
                        <DialogPanel className="relative max-w-lg space-y-4 border bg-dry p-6 lg:p-10 text-text rounded-lg w-full">
                            <DialogTitle className="font-bold">Find a Movie</DialogTitle>
                            <Button onClick={() => setShowModal(false)} className='absolute top-0 right-3 text-text hover:text-subMain transitions'><IoClose className="h-5 w-5"></IoClose></Button>
                            <input
                                type="text"
                                placeholder="Search Movie Name from here"
                                className={"font-medium placeholder:text-text text-sm w-full h-12 bg-transparent border-none px-2 text-black bg-white mt-10" + { Hover }}
                                onInput={handleSearch}
                            />
                            {(isResults.length > 0 && showModal) && (
                                <div className="w-full bg-dry border border-gray-800 p-1 rounded-md absolute left-0">
                                    <table className="w-full table-auto border border-border divide-y divide-border">
                                        <tbody className="bg-main divide-y divide-gray-800">
                                            {isResults.slice(0, 3).map((movie, idx) => (
                                                <tr
                                                    key={idx}
                                                    className="hover:text-main text-center hover:bg-dryGray hover:cursor-pointer"
                                                    title={movie.title}
                                                    onClick={() => {
                                                        handleResultClick(movie.title)
                                                        setShowModal(false)
                                                    }}
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
                        </DialogPanel>
                    </div>
                </Dialog>
                <Dialog open={isLoginOpen} onClose={() => setisLoginOpen(false)} className="relative z-50">
                    <DialogBackdrop className="fixed inset-0 bg-main/50"></DialogBackdrop>
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">


                        <DialogPanel className="relative max-w-lg space-y-4 border bg-main p-6 lg:p-10 text-text rounded-lg">
                            <Button onClick={() => setisLoginOpen(false)} className='absolute top-5 right-5 text-text hover:text-subMain transitions'><IoClose className="h-5 w-5"></IoClose></Button>
                            <DialogTitle className="font-bold">Log In</DialogTitle>
                            <Login openSignUp={openSignUp} closeLogin={closeLogin}></Login>
                        </DialogPanel>
                    </div>
                </Dialog>

                <Dialog open={isSignUpOpen} onClose={() => setisSignUpOpen(false)} className="relative z-50">
                    <DialogBackdrop className="fixed inset-0 bg-main/50"></DialogBackdrop>

                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">


                        <DialogPanel className="relative max-w-lg space-y-4 border bg-main p-6 lg:p-10 text-text rounded-lg">
                            <Button onClick={() => setIsSignUpOpen(false)} className='absolute top-5 right-5 text-text hover:text-subMain transitions'><IoClose className="h-5 w-5"></IoClose></Button>
                            <DialogTitle className="font-bold">Sign Up</DialogTitle>
                            <Register openLogin={openLogin} closeSignUp={closeSignUp}></Register>
                        </DialogPanel>
                    </div>
                </Dialog>
            </footer>
        </>

    )
}

export default MobileFooter
