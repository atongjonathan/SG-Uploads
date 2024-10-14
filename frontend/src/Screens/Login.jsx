import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import { Input } from '../Components/UserInputs'
import { Link, useNavigate } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import logo from "../images/4x3.jpg"
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import Backend from '../utils/Backend'
import { CgSpinner } from 'react-icons/cg'
import { jwtDecode } from 'jwt-decode'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import refreshApi from '../utils/Refresh'


const backend = Backend()
const Login = () => {

  const [loading, setLoading] = useState(false)
  const [passwordError, setPasswordError] = useState(null)
  const [usernameError, setusernameError] = useState(null)
  const [invalid, setInvalid] = useState(null)

  const signIn = useSignIn();
  const auth = useAuthUser()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    setLoading(true)
    e.preventDefault()
    const formData = new FormData(e.target)
    const formObject = Object.fromEntries(formData.entries())
    if (formData.username != '' || formData.password != '') {
      const response = await backend.loginUser(formObject.username, formObject.password);
      if (response.data) {
        const tokens = response.data;
        if (signIn({
          auth: {
            token: tokens.access,
            type: 'Bearer'
          },
          refresh: tokens.refresh,
          userState: jwtDecode(tokens.access)
        })) {
          // refreshApi() 
          navigate("/dashboard")
        } else {
          setInvalid('Invalid Credential')
          //Throw error
        }

      }
      else if (response?.status == 401) {
        setInvalid('Invalid Credential')
      }
      else {
        setInvalid("Something went wrong");
      }

      setLoading(false);

    }
    else {
      if (formData.password == '') {
        setPasswordError("Please enter a password");
      }

      if (formData.username == '') {
        setusernameError("Please enter a username");
      }
    }
  }
  return (
    <Layout>
      <form action="" method='post' onSubmit={(e) => handleSubmit(e)}>
        <div className='container mx-auto px-2 my-24 flex-colo'>
          <div className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry  rounded-lg border border-border">
            <img style={{ scale: '2' }} src={logo} alt="" className='w-full h-12 object-contain' />
            {
              invalid && <div className="text-oldMain w-full mt-2 text-sm font-medium text-center pt-4">
                <p>{invalid}</p>
              </div>
            }

            <Input label="Username" placeholder='johndoe' type='text' bg name="username" error={usernameError}></Input>

            <Input label="Password" placeholder='*******' type='password' name="password" bg error={passwordError}></Input>
            <button type="submit" className='bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full'><FiLogIn></FiLogIn>Sign In
              {
                loading && <CgSpinner className='animate-spin'></CgSpinner>
              }
            </button>
            <p className="text-center text-border">
              Don't have an account? {" "}
              <Link to='/register' className='text-dryGray font-semibold ml-2'> Sign Up</Link>
            </p>
          </div>
        </div>
      </form>
    </Layout>
  )
}

export default Login
