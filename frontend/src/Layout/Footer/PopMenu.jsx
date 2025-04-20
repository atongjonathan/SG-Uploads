import React, { useCallback } from 'react'
import { HiViewGridAdd } from 'react-icons/hi';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { NavLink } from 'react-router-dom';
import { MdOutlineContactMail, MdOutlineInfo } from 'react-icons/md';
import { FaFilm, FaHeart, FaListAlt } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi';
import { IoTime } from 'react-icons/io5';


const PopMenu = ({ user }) => {

    const active = 'text-main'
    const inActive = 'transitions text-2xl flex-colo hover:bg-white hover:text-main text-white rounded-md p-3'
    const Hover = useCallback(({ isActive }) =>
        isActive ? `${active} ${inActive}` : inActive,
        []
    );

    const adminLinks = [
        // {
        //     name: 'Movies',
        //     link: '/movieslist',
        //     icon: FaListAlt,

        // },
        {
            name: 'Add',
            link: '/addmovie',
            icon: FaFilm,

        }
    ]

    const sideLinks = [

        {
            name: 'Favs',
            link: '/favourites',
            icon: FaHeart
        },
        {
            name: 'Settings',
            link: '/profile',
            icon: FiSettings
        },
    ]

    return (
        <Menu>
            <MenuButton className={Hover}>
                <HiViewGridAdd></HiViewGridAdd><p className='text-xs'>Menu</p>
            </MenuButton>
            <MenuItems
                transition
                anchor="top start"
                className={`flex justify-center gap-2 bg-dry/80 z-50 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0`}            >

                <MenuItem>
                    <NavLink title="About Us" className={Hover} to="/about-us">
                        <MdOutlineInfo className='w-7 h-7'></MdOutlineInfo ><p className='text-sm'>About</p>

                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink title="About Us" className={Hover} to="/contact-us">
                        <MdOutlineContactMail className='w-7 h-7'></MdOutlineContactMail><p className='text-sm'>Contact</p>
                    </NavLink>
                </MenuItem>



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

