import React, { useContext } from 'react'
import { BsFillGridFill } from 'react-icons/bs'
import { FaFilm, FaHeart, FaListAlt, FaUsers } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { RiLockPasswordLine } from 'react-icons/ri'
import Layout from '../Layout/Layout'
import { NavLink } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const SideBar = ({ children }) => {

    const { authTokens, user } = useContext(AuthContext)

    const adminLinks = [
        {
            name: 'Dashboard',
            link: '/dashboard',
            icon: BsFillGridFill
        },
        {
            name: 'Movies List',
            link: '/movieslist',
            icon: FaListAlt,

        },
        {
            name: 'Add Movie',
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

                <div className="w-full items-start md:py-12 py-6">
                    
                    <div
                        data-aos="fade-up" data-aos-duration="1000" data-aos-delay="10" data-aos-offset="100"

                        className="rounded bg-dry border border-gray-800 p-6">
                        {children}

                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default SideBar
