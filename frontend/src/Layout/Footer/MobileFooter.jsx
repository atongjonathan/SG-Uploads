import React, { useCallback, useContext, useState } from 'react'
import { BsCollectionPlay, BsHouseAddFill, BsHouseExclamationFill } from 'react-icons/bs'
import { FiHeart } from 'react-icons/fi'
import { RxDashboard } from "react-icons/rx";
import { MdLogout, MdOutlineContactMail, MdLogin, MdOutlineInfo } from "react-icons/md";
import { NavLink } from 'react-router-dom'
import { FaHeart, FaPersonBooth, } from 'react-icons/fa'
import { Button } from '@headlessui/react'
import AuthContext from '../../context/AuthContext';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Login from '../../Screens/Login';
import Register from '../../Screens/Register';
import { IoClose } from 'react-icons/io5';
import { toast } from 'sonner';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const MobileFooter = () => {
    const active = 'bg-subMain text-main'
    const inActive = 'transitions text-2xl flex-colo hover:bg-white hover:text-main text-white rounded-md px-4 py-3'
    const { logoutUser, user } = useContext(AuthContext)
    let [isLoginOpen, setisLoginOpen] = useState(false)
    let [isSignUpOpen, setIsSignUpOpen] = useState(false)

    const Hover = useCallback(({ isActive }) =>
        isActive ? `${active} ${inActive}` : inActive,
        []
    );

    const closeLogin = useCallback(() => {
        setisLoginOpen(false);
    })

    const closeSignUp = useCallback(() => {
        setIsSignUpOpen(false);
    }, []);



    const openSignUp = useCallback(() => {
        setisLoginOpen(false)
        setIsSignUpOpen(true)

    })
    const openLogin = useCallback(() => {
        setIsSignUpOpen(false)
        setisLoginOpen(true)

    })

    const handleLogout = () => {
        logoutUser()

        toast.info("Logged Out", {
            classNames: {
                toast: 'bg-subMain',
                title: 'text-white',
            },
            closeButton: true,
        })
    }

    return (
        <>


            <footer className='lg:hidden fixed z-50 bottom-0 w-full px-1'>
                <div className=" rounded-md flex-btn p-1 bg-gradient-to-t from-dry from-40% to-100%">

                    <NavLink title="Movies" className={Hover} to="/">
                        <BsHouseAddFill></BsHouseAddFill><p className='text-xs'>Home</p>
                    </NavLink>

                    {user && user?.is_superuser ? <NavLink title="Dashboard" className={Hover} to="/dashboard">
                        <RxDashboard></RxDashboard> <p className='text-xs'>Dashboard</p>
                    </NavLink> : user &&
                    <NavLink className={`${Hover}`} to="/favourites" title="Favourites">
                        <div className="relative">
                            <FaHeart className="w-5 h-5"></FaHeart>
                            <div className="w-4 h-4 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-3 -right-3">{user?.favourites?.length}</div>
                        </div>

                    </NavLink>}
                    {user ?
                        (<Button title="Log Out" className={Hover} onClick={handleLogout}>
                            <MdLogout></MdLogout><p className='text-xs'>LogOut</p>
                        </Button>) : <Button onClick={() => setisLoginOpen(true)} className={Hover} to="/login">
                            <MdLogin> </MdLogin><p className='text-xs'>LogIn</p></Button>}

                    {user &&
                        <NavLink className={Hover} to="/profile" title="Profile">
                            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                <img className="absolute w-12 h-12 rounded-full " src={user?.image ? BACKEND_URL + user.image : `https://ui-avatars.com/api/?name=${user?.name ? user.name : user?.username}&rounded=true&background=14759f&size=35&color=fff`} alt={user?.username + ' image'} />
                            </div>
                            <p className='text-xs'>Profile</p>
                        </NavLink>}

                    {
                        !user &&
                        <NavLink title="About Us" className={Hover} to="/about-us">
                            <MdOutlineInfo></MdOutlineInfo ><p className='text-xs'>About</p>

                        </NavLink>
                    }
                    {
                        !user &&
                        <NavLink title="About Us" className={Hover} to="/contact-us">
                            <MdOutlineContactMail></MdOutlineContactMail><p className='text-xs'>Contact</p>
                        </NavLink>
                    }
                </div>
                <Dialog open={isLoginOpen} onClose={() => setisLoginOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">


                        <DialogPanel className="relative max-w-lg space-y-4 border bg-main p-6 lg:p-10 text-text rounded-lg">
                            <Button onClick={() => setisLoginOpen(false)} className='absolute top-5 right-5 text-text hover:text-subMain transitions'><IoClose className="h-5 w-5"></IoClose></Button>
                            <DialogTitle className="font-bold">Log In</DialogTitle>
                            <Login openSignUp={openSignUp} closeLogin={closeLogin}></Login>
                        </DialogPanel>
                    </div>
                </Dialog>

                <Dialog open={isSignUpOpen} onClose={() => setisSignUpOpen(false)} className="relative z-50">
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
