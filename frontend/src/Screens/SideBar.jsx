import React from 'react'
import { BsFillGridFill } from 'react-icons/bs'
import { FaHeart, FaListAlt, FaUsers } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { HiViewGridAdd } from 'react-icons/hi'
import { RiLockPasswordLine, RiMovie2Fill } from 'react-icons/ri'
import Layout from '../Layout/Layout'
import { NavLink } from 'react-router-dom'

const SideBar = ({ children }) => {
    const sideLinks = [
        {
            name: 'Dashboard',
            link: '/dashboard',
            icon: BsFillGridFill
        },
        {
            name: 'Movies List',
            link: '/movieslist',
            icon: FaListAlt
        },
        // {
        //     name: 'Categories',
        //     link: '/categories',
        //     icon: HiViewGridAdd
        // },
        {
            name: 'Users',
            link: '/users',
            icon: FaUsers
        },
        {
            name: 'Update Profile',
            link: '/profile',
            icon: FiSettings
        },
        {
            name: 'Favourite Movies',
            link: '/favourites',
            icon: FaHeart
        },
        {
            name: 'Change Password',
            link: '/password',
            icon: RiLockPasswordLine
        },
    ]

    const active = 'bg-dryGray text-subMain'
    const hover = 'hover:text-white hover:bg-main'
    const inActive = 'rounded font-medium text-sm transitions flex gap-3 items-center p-4'

    const getNavLinkClass = ({ isActive }) =>
        isActive ? `${active} ${inActive}` : `${inActive} ${hover}`

    return (
        <Layout>
            <div className="w-full min-h-screen container mx-auto">

                <div className="lg:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
                    <div  className="col-span-2 sticky bg-dry border border-gray-800 p-6     rounded-md xl:mb-0 mb-5">
                        {
                            sideLinks.map((link, idx) => (
                                <NavLink
                                    to={link.link}
                                    key={idx}
                                    className={getNavLinkClass}
                                >
                                    <link.icon className="text-lg" />
                                    <p>{link.name}</p>
                                </NavLink>      
                            ))
                        }
                    </div>
                    <div
                        data-aos="fade-up" data-aos-duration="1000" data-aos-delay="10" data-aos-offset="100"

                        className="col-span-6 rounded bg-dry border border-gray-800 p-6">
                        {children}

                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default SideBar
