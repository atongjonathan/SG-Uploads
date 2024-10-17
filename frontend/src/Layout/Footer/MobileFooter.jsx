import React from 'react'
import { BsCollectionPlay } from 'react-icons/bs'
import { FiHeart } from 'react-icons/fi'
import { RxDashboard } from "react-icons/rx";
import { MdLogout, MdOutlineContactMail, MdLogin, MdOutlineInfo } from "react-icons/md";
import { NavLink } from 'react-router-dom'
import { useUser } from '../../utils/SWR'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { FaPersonBooth, } from 'react-icons/fa'
import { Button } from '@headlessui/react'
import useSignOut from 'react-auth-kit/hooks/useSignOut'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const MobileFooter = () => {
    const active = 'bg-subMain text-main'
    const inActive = 'transitions text-2xl flex-colo hover:bg-white hover:text-main text-white rounded-md px-4 py-3'
    const Hover = ({ isActive }) => isActive ? `${active} ${inActive}` : inActive
    const auth = useAuthHeader()
    const user = useUser(auth)?.user
    const signOut = useSignOut()

    return (
        <>


            <footer className='lg:hidden fixed z-50 bottom-0 w-full px-1'>
                <div className="bg-dry rounded-md flex-btn w-full p-1">

                    <NavLink title="Movies" className={Hover} to="/">
                        <BsCollectionPlay></BsCollectionPlay><p className='text-xs'>Movies</p>
                    </NavLink>

                    {user && user?.is_superuser ? <NavLink title="Dashboard" className={Hover} to="/dashboard">
                        <RxDashboard></RxDashboard> <p className='text-xs'>Dashboard</p>
                    </NavLink> : user &&
                    <NavLink title="Dashboard" to='/profile' className={Hover}>
                        <FaPersonBooth></FaPersonBooth>
                    </NavLink>}
                    {user ?
                        (<Button title="Log Out" className={Hover} onClick={() => {
                            signOut()
                            window.location.assign("/")
                        }}>
                            <MdLogout></MdLogout><p className='text-xs'>LogOut</p>
                        </Button>) : <NavLink className={Hover} to="/login">
                            <MdLogin> </MdLogin><p className='text-xs'>LogIn</p></NavLink>}

                    {user &&
                        <NavLink className={Hover} to="/profile" title="Profile">
                            <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                {user?.image && <img className="absolute w-12 h-12 rounded-full " src={BACKEND_URL + user.image} alt={user?.username + ' image'} />}

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
            </footer>
        </>

    )
}

export default MobileFooter
