import React, { useCallback, useEffect, useRef, useState } from 'react'
import { HiViewGridAdd } from 'react-icons/hi';
import { CloseButton, Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from '@headlessui/react'
import { NavLink } from 'react-router-dom';
import { MdOutlineContactMail, MdOutlineInfo } from 'react-icons/md';
import { BsCollectionPlay, BsHouseAddFill, BsHouseExclamationFill } from 'react-icons/bs'
import { FiHeart } from 'react-icons/fi'
import { RxDashboard } from "react-icons/rx";
import Backend from '../../utils/Backend';
import { FaHeart } from 'react-icons/fa';

const PopMenu = ({ user }) => {

    const active = 'bg-subMain text-main'
    const inActive = 'transitions text-2xl flex-colo hover:bg-white hover:text-main text-white rounded-md px-4 py-3'
    const Hover = useCallback(({ isActive }) =>
        isActive ? `${active} ${inActive}` : inActive,
        []
    );
    const [scroll, setIsScrolling] = useState(false)
    const popButton = useRef()
    useEffect(() => {
        let timeoutId; const handleScroll = () => {
            setIsScrolling(true);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setIsScrolling(false);
            }, 1000);
        }
            ; window.addEventListener('scroll', handleScroll);
        return () => { window.removeEventListener('scroll', handleScroll); clearTimeout(timeoutId); };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolling(true)
        }
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return (
        <Popover className={Hover + ' relative'}>
            <PopoverButton className={Hover} ref={popButton}>
                <HiViewGridAdd></HiViewGridAdd><p className='text-xs'>Menu</p>
            </PopoverButton>
            <PopoverBackdrop className="fixed inset-0 bg-main/10" />
            {!scroll && (
                <PopoverPanel anchor="bottom" className="flex flex-row bg-dry z-50">
                    {
                        !user &&
                        <NavLink title="About Us" className={Hover} to="/about-us">
                            <MdOutlineInfo className='w-7 h-7'></MdOutlineInfo ><p className='text-sm'>About</p>

                        </NavLink>
                    }
                    {
                        !user &&
                        <NavLink title="About Us" className={Hover} to="/contact-us">
                            <MdOutlineContactMail className='w-7 h-7'></MdOutlineContactMail><p className='text-sm'>Contact</p>
                        </NavLink>
                    }
                    {user && user?.is_superuser ? <NavLink title="Dashboard" className={Hover} to="/dashboard">
                        <RxDashboard></RxDashboard> <p className='text-xs'>Dashboard</p>
                    </NavLink> : user &&
                    <NavLink className={`${Hover} relative flex flex-col my-auto items-center text-white mx-3`} to="/favourites" title="Favourites">
                            <FaHeart className="w-8 h-8 relative text-subMain">

                            </FaHeart>
                            <div className="w-4 h-4 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-2 right-0">{user?.favourites?.length}</div>
                            <p className='text-xs mt-1'>Favourites</p>

                    </NavLink>}


                    {user &&
                        <NavLink className={Hover} to="/profile" title="Profile">
                            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                <img className="absolute w-12 h-12 rounded-full " src={user?.image ? Backend().BACKEND_URL + user.image : `https://ui-avatars.com/api/?name=${user?.name ? user.name : user?.username}&rounded=true&background=14759f&size=35&color=fff`} alt={user?.username + ' image'} />
                            </div>
                            <p className='text-xs'>Profile</p>
                        </NavLink>}
                </PopoverPanel>
            )}

        </Popover>
    )
}

export default PopMenu
