import React, { useContext, useState } from 'react'
import Backend from '../../utils/Backend'
import { Input } from '../../Components/UserInputs'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import AuthContext from '../../context/AuthContext'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { IoClose } from 'react-icons/io5'

const backend = Backend()


const Password = ({ isPasswordOpen, passwordClose }) => {
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const backend = Backend()


    const { authTokens } = useContext(AuthContext)


    async function handleSubmit(e) {
        passwordClose()
        setError(null)
        e.preventDefault()
        const formData = new FormData(e.target);
        const old_password = formData.get('password');
        const new_password = formData.get('new');
        const confirmPassword = formData.get('confirm');
        if (confirmPassword !== new_password) {
            setError("Passwords do not match")
        }
        else {
            const response = await backend.changePassword(authTokens.access, { old_password, new_password })
            if (response.detail) {
                toast.success(response.detail)
                setTimeout(() => {
                    navigate("/")
                }, 1000);

            }
            else if (response.response.data) {
                let data = response.response.data
                let error = null
                if (data.non_field_errors) {
                    error = data.non_field_errors

                }
                else if (data.old_password) {
                    error = data.old_password

                }
                toast.error(error)
                setError(error)
            }
        }

    }
    return (

        <Dialog open={isPasswordOpen} as="div" className="relative z-20 focus:outline-none" onClose={passwordClose}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel transition className="relative max-w-lg space-y-4 border bg-main p-6 lg:p-10 text-text rounded-lg  backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                <Button onClick={passwordClose} className='absolute top-5 right-5 text-text hover:text-subMain transitions'><IoClose className="h-5 w-5"></IoClose></Button>
                        <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                            Change Password
                        </DialogTitle>
                        <div className="mt-4">
                            <form method='post' action='' className="flex flex-col gap-6" onSubmit={handleSubmit}>
                                {error && <p className='text-sm text-oldMain text-center'>{error}</p>}
                                <Input name='password' label="Previous Password" placeholder='*****' type='password' bg></Input>
                                <Input name='new' label="New Password" placeholder='*****' type='password' bg></Input>
                                <Input name='confirm' label="Confirm Password" placeholder='*****' type='password' bg></Input>
                                <div className="flex justify-end items-center my-4">
                                    <Button type='submit' className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">Change Password</Button>
                                </div>
                            </form>
                        </div>



                    </DialogPanel>
                </div>
            </div>
        </Dialog>

    )
}

export default Password
