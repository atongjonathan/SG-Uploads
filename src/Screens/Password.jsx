import React from 'react'
import SideBar from './SideBar'
import Uploader from '../Components/Uploader'
import { Input } from '../Components/UserInputs'
const Password = () => {
  return (
    <SideBar>
        <div className="flex flex-col gap-6">
          <h2 className='text-xl font-bold'>Change Password</h2>
        <Input label="Previous Password" placeholder='*****' type='password' bg></Input>
        <Input label="New Password" placeholder='*****' type='password' bg></Input>
        <Input label="Confirm Password" placeholder='*****' type='password' bg></Input>

        <Input label="Email" placeholder='johndoe@gmail.com' type='email' bg></Input>
        <div className="flex justify-end items-center my-4">
          <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">Change Password</button>
        </div>  
        </div>

      </SideBar>
  )
}

export default Password
