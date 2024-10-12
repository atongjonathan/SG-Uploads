import React from 'react'
import Layout from "../Layout/Layout";
import Head from "../Components/Head";
import { FaVoicemail } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
const ContactUs = () => {
  const contactData = [
    {
      title: 'Email us',
      info: 'Interactively grow backend ideas for cross-platform models.',
      icon: FaVoicemail,
      contact: "atongjonathan@gmail.com"
    }
    ,
    {
      title: 'Call us',
      info: 'Interactively grow backend ideas for cross-platform models.',
      icon: FiPhoneCall,
      contact: "154712345678"
    },
    {
      title: 'Call us',
      info: 'Interactively grow backend ideas for cross-platform models.',
      icon: FiPhoneCall,
      contact: "154712345678"
    }
  ]
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Head title={"Contact Us"}></Head>
      </div>
      <div className="grid mg:grid-cols-2 gap-6 lg:my-20 my-10 lg:grid-cols-3 xl:gap-8">
        {contactData.map((contact, idx) => (
          <div key={idx} className="border border-border flex-colo p-10 bg-dry rounded-lg text-center">
            <span className='flex-colo w-20 h-20 mb-4 rounded-full bg-main text-subMain text-2xl'>
              <contact.icon/>
            </span>
            <h5 className="text-xl font-semibold mb-2">{contact.title}</h5>
            <p className="mb-0 text-sm text-text leading-7">
              <a href={`mailto:${contact.contact}`} className='text-blue-600'>{contact.contact}</a>{contact.info}
            </p>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default ContactUs
