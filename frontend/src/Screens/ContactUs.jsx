import React from 'react'
import Layout from "../Layout/Layout";
import Head from "../Components/Head";
import { FaTelegram, FaVoicemail, FaWhatsapp } from 'react-icons/fa';
import { FiMap, FiPhoneCall } from 'react-icons/fi';
import { FaLocationDot } from 'react-icons/fa6';
import { BiLogoGmail } from "react-icons/bi";

import { Link } from 'react-router-dom';
const ContactUs = () => {
  const contactData = [
    {
      title: 'Join',
      info: 'Join our evergrowing community',
      icon: FaWhatsapp,
      contact: "https://whatsapp.com/channel/0029Vb6Ftzq0lwgxrMab7W3d",
    }
    ,
    {
      title: 'Text',
      info: 'Any feedack is well recieved',
      icon: FaTelegram,
      contact: "https://t.me/dont_be_soy2"
    },
    {
      title: 'Mail',
      info: 'We respond in minutes',
      icon: BiLogoGmail,
      contact: 'mailto:support@streamgrid.stream'
    }
  ]

  document.title = `Contact Us`

  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Head title={"Contact Us"}></Head>
      </div>
      <div id='details' className="grid mg:grid-cols-2 gap-6 lg:my-20 my-10 lg:grid-cols-3 xl:gap-8">
        {contactData.map((contact, idx) => (
          <Link to={contact.contact} target='_blank' key={idx} className="border border-border flex-colo p-10 bg-dry rounded-lg text-center">
            <span className='flex-colo w-20 h-20 mb-4 rounded-full bg-main text-subMain text-2xl'>
              <contact.icon />
            </span>
            <h5 className="text-xl font-semibold mb-2">{contact.title}</h5>
            <p className="mb-0 text-sm text-text leading-7">
              {contact.info}
            </p>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default ContactUs
