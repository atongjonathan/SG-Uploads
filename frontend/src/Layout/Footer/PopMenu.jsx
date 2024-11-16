import React, { useCallback, useEffect, useRef, useState } from 'react'
import { HiViewGridAdd } from 'react-icons/hi';
import { CloseButton, Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from '@headlessui/react'
import { NavLink } from 'react-router-dom';
import { MdOutlineContactMail, MdOutlineInfo } from 'react-icons/md';
import { BsCollectionPlay, BsHouseAddFill, BsHouseExclamationFill } from 'react-icons/bs'
import { FiHeart } from 'react-icons/fi'
import { RxDashboard } from "react-icons/rx";
import Backend from '../../utils/Backend';
import { FaFilm, FaHeart, FaListAlt, FaUsers, FaAngleDown } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { RiLockPasswordLine } from 'react-icons/ri'

const PopMenu = ({ user }) => {

    const active = 'bg-subMain text-main'
    const inActive = 'transitions text-2xl flex-colo hover:bg-white hover:text-main text-white rounded-md px-4 py-3'
    const Hover = useCallback(({ isActive }) =>
        isActive ? `${active} ${inActive}` : inActive,
        []
    );
    const [scroll, setIsScrolling] = useState(false)
    const popButton = useRef()

    const adminLinks = [
        {
            name: 'Movies',
            link: '/movieslist',
            icon: FaListAlt,

        },
        {
            name: 'Add',
            link: '/addmovie',
            icon: FaFilm,

        },
        // {
        //     name: 'Categories',
        //     link: '/categories',
        //     icon: HiViewGridAdd
        // },
        {
            name: 'Users',
            link: '/users',
            icon: FaUsers,

        },
        {
            name: 'Dashboard',
            link: '/dashboard',
            icon: RxDashboard,

        },
    ]

    const sideLinks = [

        {
            name: 'Profile',
            link: '/profile',
            icon: FiSettings
        },
        {
            name: 'Favourites',
            link: '/favourites',
            icon: FaHeart
        },
        {
            name: 'Password',
            link: '/password',
            icon: RiLockPasswordLine
        },
    ]


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
                <PopoverPanel anchor="bottom" className="grid grid-cols-4 bg-dry z-50">
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

                    {
                        user?.is_superuser && adminLinks.map((link, idx) => (
                            <NavLink title={link.name} className={Hover} key={idx} to={link.link}>
                                <link.icon className='w-7 h-7'></link.icon><p className='text-sm'> {link.name}</p>
                            </NavLink>
                        ))
                    }

                    {
                        sideLinks.map((link, idx) => (
                            <NavLink title={link.name} className={Hover} key={idx} to={link.link}>
                                <link.icon className='w-7 h-7'></link.icon><p className='text-sm'> {link.name}</p>
                            </NavLink>
                        ))
                    }



                </PopoverPanel>
            )}

        </Popover>
    )
}

export default PopMenu
