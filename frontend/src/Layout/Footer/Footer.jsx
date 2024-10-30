import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  const Links = [
    {
      title: 'SG Uploads',
      links: [
        {
          name: 'Home',
          link: "/"
        },
        {
          name: 'About Us',
          link: "/about-us"
        }, {
          name: 'Contact Us',
          link: "/contact-us"
        },
        {
          name: 'Movies',
          link: "/movies"
        }
      ]
    },
    {
      title: 'My Account',
      links: [
        {
          name: 'Dashboard',
          link: "/dashboard"
        },
        {
          name: 'My Favourite ',
          link: "/favourites"
        }, {
          name: 'Profile',
          link: "/profile"
        },
        {
          name: 'Change Password',
          link: "/password"
        }
      ]
    },
    {
      title: 'Categories',
      links: [
        {
          name: 'Action',
        },
        {
          name: 'Comedy',
        },
        {
          name: 'Drama',
        },
        {
          name: 'Romance',
        }
      ]
    }
  ]
  return (
    <div className='bg-dry py-4 bprder=t-2 border-black'>
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-3 justify-between">
          {Links.map((link, idx) => (
            <div key={idx} className="col-span-1 md:col-span-2 lg:col-span-3 pb-3.5 sm:pb-0">
              <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5">{link.title}</h3>
              <ul className="text-sm flex flex-col space-y-3">
                {link.links.map((text, idx) => (
                  <li key={idx} className='flex items-baseline'>
                    <Link to={text.link} className='text-border inline-block w-full hover:text-subMain'>{text.name}</Link>
                  </li>
                ))}
              </ul>

            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default Footer