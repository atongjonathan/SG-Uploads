import React, { useContext, useState } from 'react'
import { FiLogIn } from 'react-icons/fi'
import Backend from '../../utils/Backend'
import AuthContext from '../../context/AuthContext'
import { Button } from '@headlessui/react'
import { toast } from 'sonner'
import { Input } from '../../Components/UserInputs'
import { CgSpinner } from 'react-icons/cg'


const backend = Backend()
const Login = ({ openSignUp, closeLogin }) => {

  const [loading, setLoading] = useState(false)
  const [passwordError, setPasswordError] = useState(null)
  const [usernameError, setusernameError] = useState(null)



  const { saveAuthTokens } = useContext(AuthContext)

  async function handleSubmit(e) {
    setLoading(true)
    e.preventDefault()
    const formData = new FormData(e.target)
    const formObject = Object.fromEntries(formData.entries())
    if (formData.username != '' || formData.password != '') {
      const response = await backend.loginUser(formObject.username, formObject.password);
      if (response.data) {
        const tokens = response.data;
        saveAuthTokens(tokens)
        closeLogin()
        toast.success("Logged in", {
          classNames: {
            toast: 'bg-subMain',
            title: 'text-white',
            closeButton: 'bg-subMain text-white hover:text-subMain',
          },
          closeButton: true,
        })

      }
      else if (response?.status == 401) {
        toast.error('Invalid account credentials')
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
    <form action="" method='post' onSubmit={(e) => handleSubmit(e)}>
      <div className='container mx-auto flex-colo gap-2'>

        <Input label="Username" placeholder='johndoe' type='text' bg name="username" error={usernameError}></Input>
        {/* <div> */}
        <Input label="Password" placeholder='*******' type='password' name="password" bg error={passwordError}></Input>
        {/* <Link to='/password'onClick={closeLogin} className='w-full'><p className='text-xs text-right mt-3 text-subMain'>Forgot password?</p></Link> */}
        {/* </div> */}

        <button type="submit" className='bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full my-4'><FiLogIn></FiLogIn>Sign In
          {
            loading && <CgSpinner className='animate-spin'></CgSpinner>
          }
        </button>
        <p className="text-center text-border">
          Don't have an account? {" "}
          <Button onClick={openSignUp} className='text-dryGray font-semibold ml-2'> Sign Up</Button>
        </p>
      </div>
    </form>
  )
}

export default Login