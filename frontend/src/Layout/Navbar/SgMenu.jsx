import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { FaFilm, FaHeart, FaListAlt, FaUsers, FaAngleDown } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { RiLockPasswordLine } from 'react-icons/ri'
import AuthContext from '../../context/AuthContext'
import { useContext, useEffect, useState } from 'react'
import { BsFillGridFill } from 'react-icons/bs'
import { NavLink, useLocation } from 'react-router-dom'

export default function SgMenu() {
    const { user } = useContext(AuthContext)
    const hover = 'transitions text-white';
    const Hover = ({ isActive }) => (isActive ? 'text-subMain' : hover);

    const pathname = useLocation().pathname

    let [active, setActive] = useState('Menu')


    const common = [
        {
            name: 'About',
            link: '/about-us',
            icon: FaListAlt,

        },
        {
            name: 'Contact',
            link: '/contact-us',
            icon: FaFilm,

        },
    ]


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
    ]

    const sideLinks = [

        {
            name: 'Profile',
            link: '/profile',
            icon: FiSettings
        },
        {
            name: 'Password',
            link: '/password',
            icon: RiLockPasswordLine
        },
    ]


    useEffect(() => {
        setActive([...adminLinks, ...sideLinks].find((link) => link.link == pathname)?.name)
    })

    return (
        <div className="text-right">
            <Menu>
                <MenuButton className={`inline-flex items-center gap-2 text-sm/6 font-semibold text-white shadow-inner focus:outline-none data-[hover]:text-subMain data-[open]:text-subMain data-[focus]:outline-1 data-[focus]:outline-white data-[active]:text-subMain} transitions`}>
                    <span className={`${active ? 'text-subMain' : ''}`}>{active ? active : 'Menu'}</span>

                    <FaAngleDown className="size-4 fill-white/60" />
                </MenuButton>

                <MenuItems
                    transition
                    anchor="bottom"
                    className="w-36 z-50 origin-top-right rounded-xl border border-white/5 bg-main p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >


                    {
                        user?.is_superuser && adminLinks.map((link, idx) => (
                            <MenuItem key={idx} onClick={() => setActive(link.name)}>
                                <NavLink onClick={() => setActive(link.name)}
                                    to={link.link}
                                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                                >
                                    <link.icon className="text-lg size-4" />
                                    {link.name}
                                </NavLink>
                            </MenuItem>
                        ))
                    }

                    {
                        user && sideLinks.map((link, idx) => (
                            <MenuItem key={idx} onClick={() => setActive(link.name)}>
                                <NavLink onClick={() => setActive(link.name)}
                                    to={link.link}
                                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                                >
                                    <link.icon className="text-lg size-4" />
                                    {link.name}
                                </NavLink>
                            </MenuItem>
                        ))
                    }
                     {
                        !user && common.map((link, idx) => (
                            <MenuItem key={idx} onClick={() => setActive(link.name)}>
                                <NavLink onClick={() => setActive(link.name)}
                                    to={link.link}
                                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                                >
                                    <link.icon className="text-lg size-4 fill-white/30" />
                                    {link.name}
                                </NavLink>
                            </MenuItem>
                        ))
                    }


                </MenuItems>
            </Menu>
        </div>
    )
}