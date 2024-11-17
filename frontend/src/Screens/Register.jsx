import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { Input } from '../Components/UserInputs'
import { Link, useNavigate } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import logo from "../images/4x3.jpg"
import { Button } from '@headlessui/react'
import Backend from '../utils/Backend'
import { CgSpinner } from 'react-icons/cg'
import { toast } from 'sonner'

const backend = Backend()




const Register = ({ openLogin, closeSignUp }) => {
  const [loading, setLoading] = useState(false)


  async function handleSubmit(e) {
    setLoading(true)
    e.preventDefault()
    const formData = new FormData(e.target)
    const formObject = Object.fromEntries(formData.entries())
    const response = await backend.signUp(formObject)
    if (response.status == 201) {
      closeSignUp()
      openLogin()
    }
    else if (response.data) {
      let data = response.data
      toast(data.email ? data.email : data.username ? data.username : 'An error occured try again later')
    }
    setLoading(false)

  }

  document.title = `Sign Up`
  return (
    <form method='post' onSubmit={(e) => handleSubmit(e)} className='container mx-auto lg:px-2 my-24 flex-colo gap-2'>
      <Input name='username' label="Username" placeholder='username' type='text' bg></Input>
      <Input name='email' label="Email" placeholder='johndoe@gmail.com' type='email' bg></Input>
      <Input name='password' label="Password" placeholder='*******' type='password' bg></Input>
      <Button type='submit' className='bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full my-3'>
        <FiLogIn></FiLogIn>Sign Up</Button> {loading && <CgSpinner className='animate-spin'></CgSpinner>}
      <p className="text-center text-border">
        Already have an account? {" "}
        <Button onClick={openLogin} className='text-dryGray font-semibold ml-2'> Sign in</Button>
      </p>
    </form>

  )
}

export default Register
