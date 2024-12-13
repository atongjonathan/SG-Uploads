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
        }
      ]
    }
  ]
  return (
    <div className='bg-dry py-4 bprder=t-2 border-black'>
      <div className="container mx-auto px-2 mb-10">     
        <p className='text-border text-center'>This site does not store any files on the server, we only linked to the media which is hosted on 3rd party services.</p>

      </div>

    </div>
  )
}

export default Footer