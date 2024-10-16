import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { Input } from '../Components/UserInputs';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import logo from "../images/4x3.jpg";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import Backend from '../utils/Backend';
import { CgSpinner } from 'react-icons/cg';
import { jwtDecode } from 'jwt-decode';

const backend = Backend();

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [usernameError, setusernameError] = useState(null);
  const [invalid, setInvalid] = useState(null);

  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPasswordError(null);
    setusernameError(null);
    setInvalid(null); // Clear previous errors

    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    if (!username || !password) {
      if (!username) setusernameError("Please enter a username");
      if (!password) setPasswordError("Please enter a password");
      setLoading(false);
      return;
    }

    try {
      const response = await backend.loginUser(username, password);

      if (response.data) {
        const tokens = response.data;
        if (signIn({
          auth: {
            token: tokens.access,
            type: 'Bearer'
          },
          refresh: tokens.refresh,
          userState: jwtDecode(tokens.access),
        })) {
          navigate("/profile");
        } else {
          setInvalid('Invalid Credential');
        }
      } else {
        setInvalid("Something went wrong");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.status === 401) {
        setInvalid('Invalid Credentials');
      } else {
        setInvalid("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <div className='container mx-auto px-2 my-24 flex-colo'>
          <div className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry rounded-lg border border-border">
            <img style={{ scale: '2' }} src={logo} alt="" className='w-full h-12 object-contain' />
            {invalid && (
              <div className="text-oldMain w-full mt-2 text-sm font-medium text-center pt-4">
                <p>{invalid}</p>
              </div>
            )}
            <Input label="Username" placeholder='johndoe' type='text' name="username" bg error={usernameError} />
            <Input label="Password" placeholder='*******' type='password' name="password" bg error={passwordError} />
            <button
              type="submit"
              className='bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full'
              disabled={loading} // Disable button when loading
            >
              <FiLogIn /> Sign In
              {loading && <CgSpinner className='animate-spin' />}
            </button>
            <p className="text-center text-border">
              Don't have an account?{" "}
              <Link to='/register' className='text-dryGray font-semibold ml-2'>Sign Up</Link>
            </p>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Login;
