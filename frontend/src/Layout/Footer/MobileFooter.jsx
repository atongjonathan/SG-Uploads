import React from 'react'
import { BsCollectionPlay } from 'react-icons/bs'
import { FiHeart, FiUser, FiUserCheck } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import { useUser } from '../../utils/SWR'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { FaHome, FaPersonBooth, FaPhone, FaQuestion, FaUserMinus } from 'react-icons/fa'
import { Button } from '@headlessui/react'
import useSignOut from 'react-auth-kit/hooks/useSignOut'

const MobileFooter = () => {
    const active = 'bg-subMain text-main'
    const inActive = 'transitions text-2xl flex-colo hover:bg-white hover:text-main text-white rounded-md px-4 py-3'
    const Hover = ({ isActive }) => isActive ? `${active} ${inActive}` : inActive
    const auth = useAuthHeader()
    const user = useUser(auth)?.user
    const signOut = useSignOut()

    return (
        <>
            <div className='flex-btn h-full bg-white rounded cursor-pointer overflow-y-scroll flex-grow w-full'>

            </div>

            <footer className='lg:hidden fixed z-50 bottom-0 w-full px-1'>
                <div className="bg-dry rounded-md flex-btn w-full p-1">

                    <NavLink title="Movies" className={Hover} to="/movies">
                        <BsCollectionPlay></BsCollectionPlay>
                    </NavLink>

                    {user && user?.is_superuser ? <NavLink title="Dashboard" className={Hover} to="/dashboard">
                        <FaHome></FaHome>
                    </NavLink> : user &&
                    <NavLink title="Dashboard" to='/profile' className={Hover}>
                        <FaPersonBooth></FaPersonBooth>
                    </NavLink>}
                    {user ?
                        (<Button title="Log Out" className={Hover} onClick={() => {
                            signOut()
                        }}>
                            <FaUserMinus></FaUserMinus>
                        </Button>) : <NavLink className={Hover} to="/login">
                            <FiUser> </FiUser></NavLink>}

                    {user &&
                        <NavLink className={Hover} to="/favourites" title="Favourites">
                            <div className="relative">

                                <div className="w-4 h-4 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-3 -right-3">{user?.favourites?.length}</div>
                            </div>
                            <FiHeart></FiHeart>
                        </NavLink>}
                    <NavLink title="About Us" className={Hover} to="/about-us">
                        <FaQuestion></FaQuestion>
                    </NavLink>
                    {
                        !user && 
                        <NavLink title="About Us" className={Hover} to="/contact-us">
                        <FaPhone></FaPhone>
                    </NavLink>
                    }
                </div>
            </footer>
        </>

    )
}

export default MobileFooter
