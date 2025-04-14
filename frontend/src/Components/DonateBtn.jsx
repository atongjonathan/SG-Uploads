import { Button } from '@headlessui/react'
import React, { useState } from 'react'
import { BiSolidDonateHeart } from "react-icons/bi";
import DonateModal from './Modals/DonateModal';


const DonateBtn = () => {
  const [isModalOpen, setisModalOpen] = useState(false)



  return (
    <>
      <DonateModal isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} />

      <Button onClick={() => {
        setisModalOpen(true)
      }} className='bg-[#2e5ea0] hover:bg-[#f0bc39] flex-rows gap-2 hover:text-main transitions text-white font-medium py-3 animate-pulse w-10 h-10 flex-colo rounded-lg '>
        <BiSolidDonateHeart className='w-4 h-4  text-white ' />
      </Button>
    </>

  )
}

export default DonateBtn
