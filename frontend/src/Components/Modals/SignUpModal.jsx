import React, { useState } from 'react'
import { DialogBackdrop, Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'
import { IoClose } from "react-icons/io5";
import { toast } from 'sonner'
import { Input } from '../../Components/UserInputs'
import { CgSpinner } from 'react-icons/cg'
import { FiLogIn } from 'react-icons/fi'

const SignUpModal = ({ isSignUpOpen, setIsSignUpOpen, openLogin, closeSignUp }) => {

    const [loading, setLoading] = useState(false)


    async function handleSubmit(e) {
        setLoading(true)
        e.preventDefault()
        const formData = new FormData(e.target)
        const formObject = Object.fromEntries(formData.entries())
        const response = await backend.signUp(formObject)
        if (response.status == 201) {
            openLogin()
        }
        else if (response.data) {
            let data = response.data
            toast.error(data.email ? data.email : data.username ? data.username : 'An error occured try again later')
        }
        setLoading(false)
        closeSignUp()


    }
    return (
        <Dialog open={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-main/50"></DialogBackdrop>

            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">


                <DialogPanel transition className="relative max-w-lg space-y-4 border bg-main px-8 py-5  text-text rounded-lg  backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                    <Button onClick={() => setIsSignUpOpen(false)} className='absolute top-5 right-5 text-text hover:text-subMain transitions'><IoClose className="h-5 w-5"></IoClose></Button>
                    <DialogTitle className="font-bold">Sign Up</DialogTitle>
                    <form method='post' onSubmit={(e) => handleSubmit(e)} className='container mx-auto lg:px-2 my-24 flex-colo gap-2'>
                        <Input name='username' label="Username" placeholder='username' type='text' bg></Input>
                        <Input name='email' label="Email" placeholder='example@gmail.com' type='email' bg></Input>
                        <Input name='password' label="Password" placeholder='*******' type='password' bg></Input>
                        <Button type='submit' className='bg-subMain transitions hover:bg-main flex-rows gap-4 text-white text-md py-2 rounded-lg w-full my-2'>
                            <FiLogIn></FiLogIn>Sign Up {loading && <CgSpinner className='animate-spin text-white'></CgSpinner>}</Button>
                        <p className="text-center text-border">
                            Already have an account? {" "}
                            <Button onClick={openLogin} className='text-dryGray font-semibold ml-2'> Sign in</Button>
                        </p>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default SignUpModal
