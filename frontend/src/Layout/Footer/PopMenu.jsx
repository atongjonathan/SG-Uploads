import React, { useCallback } from 'react'
import { HiViewGridAdd } from 'react-icons/hi';
import {  Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { NavLink } from 'react-router-dom';
import { MdOutlineContactMail, MdOutlineInfo } from 'react-icons/md';
import { RxDashboard } from "react-icons/rx";
import { FaFilm, FaHeart, FaListAlt } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { RiLockPasswordLine } from 'react-icons/ri'


const PopMenu = ({ user }) => {

    const active = 'bg-subMain text-main'
    const inActive = 'transitions text-2xl flex-colo hover:bg-white hover:text-main text-white rounded-md px-4 py-3 bg-dry mt-2'
    const Hover = useCallback(({ isActive }) =>
        isActive ? `${active} ${inActive}` : inActive,
        []
    );

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

    return (
        <Menu>
            <MenuButton className={Hover}>
                <HiViewGridAdd></HiViewGridAdd><p className='text-xs'>Menu</p>
            </MenuButton>
            <MenuItems
                transition
                anchor="top"
                className={`grid ${user ? 'grid-cols-4' : 'grid-cols-2'}  gap-2 bg-main z-50`}            >
                {
                    !user &&
                    <MenuItem>
                        <NavLink title="About Us" className={Hover} to="/about-us">
                            <MdOutlineInfo className='w-7 h-7'></MdOutlineInfo ><p className='text-sm'>About</p>

                        </NavLink>
                    </MenuItem>

                }
                {
                    !user &&
                    <MenuItem>
                        <NavLink title="About Us" className={Hover} to="/contact-us">
                            <MdOutlineContactMail className='w-7 h-7'></MdOutlineContactMail><p className='text-sm'>Contact</p>
                        </NavLink>
                    </MenuItem>

                }

                {
                    user?.is_superuser && adminLinks.map((link, idx) => (
                        <MenuItem key={idx}>
                            <NavLink title={link.name} className={Hover} key={idx} to={link.link}>
                                <link.icon className='w-7 h-7'></link.icon><p className='text-sm'> {link.name}</p>
                            </NavLink>
                        </MenuItem>

                    ))
                }

                {
                    user && sideLinks.map((link, idx) => (
                        <MenuItem key={idx}>
                            <NavLink title={link.name} className={Hover} key={idx} to={link.link}>
                                <link.icon className='w-7 h-7'></link.icon><p className='text-sm'> {link.name}</p>
                            </NavLink>
                        </MenuItem>

                    ))
                }
            </MenuItems>

        </Menu>
    )
}

export default PopMenu

