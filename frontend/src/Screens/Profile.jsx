import React, { useCallback, useState } from 'react'
import SideBar from './SideBar'
import Uploader from '../Components/Uploader'
import { Input } from '../Components/UserInputs'
import Backend from '../utils/Backend'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { useUser } from '../utils/SWR'


const Profile = () => {

const backend = Backend()

  const authHeader = useAuthHeader()
  const user = useUser(authHeader).user
  const username = user?.username
  const email = user?.email
  const [image, setFileResponse] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from being submitted the default way
  
    // Create a new FormData instance from the form data
    const formData = new FormData(e.target);
  
    // Add any additional fields if needed
    formData.append('username', username);  // Assuming `username` comes from state
    formData.append('email', email);        // Assuming `email` comes from state
    
    // Add the file (assuming `image` comes from state or a file input)
    if (image) {
      formData.append('image', image);      // Append the actual file object
    }
  
    try {
      // Send FormData directly in the Axios request
      const response = await backend.updateProfile(authHeader, formData);
      
      console.log(response); // Handle the response here (e.g., show a success message)
    } catch (error) {
      console.error('Error uploading profile:', error); // Handle any errors
    }
  };
  

  const handleDataFromChild = useCallback((data) => {
    setFileResponse(data)
  })
  return (
    <>
      <SideBar>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-6" action='' method='post' encType='multipart/form-data'>
          <h2 className='text-xl font-bold'>Profile</h2>
          <Uploader updateParentFile={handleDataFromChild}></Uploader>
          <Input label="Full Name" placeholder='SG Uploads' type='text' bg name='name'></Input>
          <Input label="Email" placeholder='johndoe@gmail.com' type='email' name='email' bg></Input>
          <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
            {/* <button className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">Delete Account</button> */}
            <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">Update Profile</button>
          </div>
        </form>

      </SideBar>

    </>

  )
}

export default Profile
