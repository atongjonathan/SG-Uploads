import React from 'react'
import Layout from "../Layout/Layout";
import Head from "../Components/Head";
import { FaTelegram, FaVoicemail, FaWhatsapp } from 'react-icons/fa';
import { FiMap, FiPhoneCall } from 'react-icons/fi';
import { FaLocationDot } from 'react-icons/fa6';
const ContactUs = () => {
  const contactData = [
    {
      title: 'Text us',
      info: 'Any feedack is well recieved',
      icon: FaWhatsapp,
      contact: "mailto:atongjonathan2@gmail.com",
    }
    ,
    {
      title: 'Join us',
      info: 'Join our evergrowing community',
      icon: FaTelegram,
      contact: "https://t.me/dont_be_soy"
    },
    {
      title: 'Location',
      info: 'Nairobi, Kenya.',
      icon: FaLocationDot,
      contact: 'https://maps.app.goo.gl/GLUK7ouvs8WA1ViSA'
    }
  ]

  document.title = `Contact Us`

  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Head title={"Contact Us"}></Head>
      </div>
      <div className="grid mg:grid-cols-2 gap-6 lg:my-20 my-10 lg:grid-cols-3 xl:gap-8">
        {contactData.map((contact, idx) => (
          <div key={idx} className="border border-border flex-colo p-10 bg-dry rounded-lg text-center">
            <span className='flex-colo w-20 h-20 mb-4 rounded-full bg-main text-subMain text-2xl'>
              <contact.icon />
            </span>
            <h5 className="text-xl font-semibold mb-2">{contact.title}</h5>
            <p className="mb-0 text-sm text-text leading-7">
              <a href={`${contact.contact}`} className='text-blue-600'>SG Uploads   </a>{contact.info}
            </p>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default ContactUs
