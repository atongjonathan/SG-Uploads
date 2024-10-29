import React, { useContext, useState } from 'react'
import SideBar from './SideBar'
import { Input } from '../Components/UserInputs'
import { Button } from '@headlessui/react'
import Backend from '../utils/Backend'
import AuthContext from '../context/AuthContext'

const backend = Backend()
const Password = () => {
  const [error, setError] = useState(null)
  const { authTokens } = useContext(AuthContext)

  async function handleSubmit(e) {
    setError(null)
    e.preventDefault()
    const formData = new FormData(e.target);
    const old_password = formData.get('password');
    const new_password = formData.get('new');
    const confirmPassword = formData.get('confirm');
    if (confirmPassword !== new_password) {
      console.log(confirmPassword, new_password)
      setError("Passwords do not match")
    }
    else {
      const response = await backend.changePassword(authTokens.access, { old_password, new_password })
      console.log(response)
      if (response.old_password)
      {
        setError(response.old_password)
      }
      else if (response.non_field_errors)
      {
        setError(response.non_field_errors)
      }
    }

  }
  return (
    <SideBar>
      <form method='post' action='' className="flex flex-col gap-6" onSubmit={handleSubmit}>
        {error && <p className='text-sm text-oldMain text-center'>{error}</p>}
        <h2 className='text-xl font-bold'>Change Password</h2>
        <Input name='password' label="Previous Password" placeholder='*****' type='password' bg></Input>
        <Input name='new' label="New Password" placeholder='*****' type='password' bg></Input>
        <Input name='confirm' label="Confirm Password" placeholder='*****' type='password' bg></Input>
        <div className="flex justify-end items-center my-4">
          <Button type='submit' className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">Change Password</Button>
        </div>
      </form>

    </SideBar>
  )
}

export default Password
