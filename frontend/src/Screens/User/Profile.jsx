import React, { useContext, useState } from 'react'
import Layout from '../../Layout/Layout'
import { FaKey, FaUser } from 'react-icons/fa'
import { MdOutlineLogout } from "react-icons/md";
import { Button } from '@headlessui/react'
import Update from '../../Components/Modals/Update'
import AuthContext from '../../context/AuthContext';
import Password from '../../Components/Modals/Password';



const Profile = () => {
  const { logoutUser } = useContext(AuthContext)



document.title = `Update Profile`

let [isUpdateOpen, setisUpdateOpen] = useState(false)

function updateOpen() {
  setisUpdateOpen(true)
}

function updateClose() {
  setisUpdateOpen(false)
}

let [isPasswordOpen, setisPasswordOpen] = useState(false)

function passwordOpen() {
  setisPasswordOpen(true)
}

function passwordClose() {
  setisPasswordOpen(false)
}
return (
  <>
    <Layout>
      <div className="w-full min-h-screen container mx-auto">

        <div className="w-full items-start md:py-12 py-6">

          <div
            data-aos="fade-up" data-aos-duration="1000" data-aos-delay="10" data-aos-offset="100"

            className="rounded border border-gray-800 p-6">

            <div className="w-full items-start py-3 flex flex-col bg-dry mt-2">
              <Button onClick={passwordOpen} className="font-medium w-full transitions py-3 px-6 hover:bg-main/50 p-3 sm:w-auto flex items-center gap-4 rounded-lg ">
                <FaKey></FaKey>
                Change Password
              </Button>
              <Password isPasswordOpen={isPasswordOpen} passwordClose={passwordClose}></Password>

              <Button onClick={updateOpen} className="font-medium w-full transitions py-3 px-6 hover:bg-main/50 p-3 sm:w-auto flex items-center gap-4 rounded-lg ">
                <FaUser></FaUser>
                Update Profile
              </Button>
              <Update isUpdateOpen={isUpdateOpen} updateClose={updateClose}></Update>

              
              <Button onClick={logoutUser} className="font-medium w-full transitions py-3 px-6 hover:bg-main/50 p-3 sm:w-auto flex items-center gap-4 rounded-lg text-red-500 ">
                <MdOutlineLogout></MdOutlineLogout>
                Log out
              </Button>

            </div>
          </div>

        </div>
      </div>


    </Layout>

  </>

)
}

export default Profile
