import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  const Links = [
    {
      title: 'StreamGrid',
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
    <div className='bg-dry py-3 bprder=t-2 border-black'>
      <div className="container mx-auto">     
        <p className='text-border text-center'>This site does not store any files on the server, we only linked to the media which is hosted on 3rd party services.</p>

      </div>

    </div>
  )
}

export default Footer