import React, { useContext, useState } from 'react'
import { DialogBackdrop, Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'
import { toast } from 'sonner'
import { Input } from '../../Components/UserInputs'
import { CgSpinner } from 'react-icons/cg'
import { FiLogIn } from 'react-icons/fi'
import AuthContext from '../../context/AuthContext';
import { IoClose } from 'react-icons/io5'
import { loginUser } from '../../utils/Backend'


const LoginModal = ({ isLoginOpen, setIsLoginOpen, openSignUp, closeLogin, openForgot}) => {

    const [loading, setLoading] = useState(false)
    const [passwordError, setPasswordError] = useState(null)
    const [usernameError, setusernameError] = useState(null)
    const {  saveAuthTokens } = useContext(AuthContext)

    async function handleSubmit(e) {
        setLoading(true)
        e.preventDefault()
        const formData = new FormData(e.target)
        const formObject = Object.fromEntries(formData.entries())
        if (formData.username != '' || formData.password != '') {
            const response = await loginUser(formObject.username, formObject.password);
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
        <Dialog open={isLoginOpen} onClose={() => setIsLoginOpen(false)} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-main/50"></DialogBackdrop>

            <div className="fixed inset-0 flex w-screen items-center justify-center p-3">


                <DialogPanel transition className="relative max-w-lg space-y-4 border bg-main px-8 py-5  text-text rounded-lg  backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                    <Button onClick={() => setIsLoginOpen(false)} className='absolute top-5 right-5 text-text hover:text-subMain transitions'><IoClose className="h-5 w-5"></IoClose></Button>
                    <DialogTitle className="font-bold text-center">Welcome Back</DialogTitle>
                    <form action="" method='post' onSubmit={(e) => handleSubmit(e)}>
                        <div className='container flex flex-col items-end gap-2'>

                            <Input label="Username" placeholder={'streamgrid'} type='text' bg name="username" error={usernameError}></Input>
                            <Input label="Password" placeholder='*******' type='password' name="password" bg error={passwordError}></Input>
                            <Button as='a' title='Forgot password ?' onClick={openForgot} className="text-sm underline cursor-pointer">Forgot password ?</Button>
                            <Button type="submit" className='bg-subMain transitions hover:bg-main flex-rows gap-4 text-white py-2 rounded-lg w-full my-2'><FiLogIn></FiLogIn>Sign In
                                {
                                    loading && <CgSpinner className='animate-spin'></CgSpinner>
                                }
                            </Button>
                            <p className="text-center text-border">
                                Don't have an account? {" "}
                                <Button onClick={openSignUp} className='text-dryGray font-semibold ml-2'> Sign Up</Button>
                            </p>
                        </div>
                    </form>

                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default LoginModal
