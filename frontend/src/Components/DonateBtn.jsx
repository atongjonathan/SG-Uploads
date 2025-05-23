import { Button } from '@headlessui/react'
import React, { useState } from 'react'
import { BiSolidDonateHeart } from "react-icons/bi";
import DonateModal from './Modals/DonateModal';


const DonateBtn = ({ open }) => {
  const [isModalOpen, setisModalOpen] = useState(open ?? false)



  return (
    <>
      <DonateModal isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} />
      {
        !open && <Button onClick={() => {
          setisModalOpen(true)
        }} className={`relative select-none outline-none transitions data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-sm  px-2 py-1 gap-2 flex items-center rounded-lg hover:bg-white/20 cursor-pointer mb-[.1rem] text-white ${isModalOpen? 'bg-white/30':"bg-white/10"}`}>          
          <BiSolidDonateHeart className='w-4 h-4  text-white ' />
          Support
        </Button>
      }


    </>

  )
}

export default DonateBtn
