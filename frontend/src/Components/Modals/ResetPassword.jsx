import React, { useRef, useState } from 'react'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Input } from '../UserInputs'
import { useMutation } from '@tanstack/react-query'
import { setPassword } from '../../utils/Backend'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { CgSpinner } from 'react-icons/cg'

const ResetPassword = ({ params, close, openLogin }) => {

    const form = useRef()
    const [error, setError] = useState("");

    const navigate = useNavigate()


    const { mutate, isPending } = useMutation({
        mutationKey: ["resetMutation"],
        mutationFn: async (data) => await setPassword(data),
        onSuccess: () => {
            close()
            toast.success("Password has been reset successfully")
            openLogin()
            navigate("/")
        },
        onError: (error) => {
            const responseError = error.response?.data.error

            if (responseError.includes("link")) {
                close()
                navigate("/")
                toast.error(responseError)
            }
            else if (responseError.includes("[")) {
                console.log(responseError.replace("/'/g", '"'));
                let error = JSON.parse(responseError.replace(/'/g, '"')).join("\n")
                setError(error)
            }


            else {
                toast.error("An error occured, try again later")
            }
            // console.log(JSON.parse(responseError));

        }
    })
    return (
        <div className="mt-6">
            <form ref={form} method='post' action='' className="flex flex-col gap-3" onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                const formData = new FormData(form.current);
                const new_password = formData.get('new');
                const confirmPassword = formData.get('confirm');
                if (confirmPassword !== new_password) {
                    setError("Passwords do not match")
                }
                else {
                    setError("")
                    mutate({ new_password, ...params })
                }

            }}>
                {error && !isPending && <p className='text-sm text-oldMain text-center'>{error}</p>}
                <Input name='new' label="New Password" placeholder='*****' type='password' bg></Input>
                <Input name='confirm' label="Confirm New Password" placeholder='*****' type='password' bg></Input>
                <div className="flex justify-end items-center my-4">
                    <Button type='submit' className="bg-main transitions hover:bg-subMain border border-subMain text-white py-2 px-3 rounded w-full sm:w-auto flex items-center justify-center" disabled={isPending}>{isPending ? <CgSpinner className="animate-spin" /> : "Save"}</Button>

                </div>
            </form>
        </div>
    )
}

export default ResetPassword
