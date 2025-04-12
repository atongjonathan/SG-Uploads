import React, { useEffect } from 'react'
import { Button, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import { useState, useContext } from 'react'
import { IoClose } from 'react-icons/io5';
import { FaInfoCircle } from "react-icons/fa";
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { verifyEmail, verifyToken } from '../../utils/Backend';
import { toast } from 'sonner';
import { CgSpinner } from 'react-icons/cg'
import Puff from "react-loading-icons/dist/esm/components/puff";


const Verify = () => {

    const { uidb64, token } = useParams()


    const [isOpen, setIsOpen] = useState(true);
    const close = () => setIsOpen(false)

    const { user, logoutUser, fetchUser, authTokens } = useAuth()

    const [disabled, setDisabled] = useState(false);
    const [counter, setCounter] = useState(30);

    const { pathname } = useLocation()

    const [verify, setVerify] = useState(uidb64 && token && user);




    const navigate = useNavigate()
    const verifyMutation = useMutation({
        mutationKey: ["verifyTokens", uidb64, token],
        mutationFn: () => verifyToken(uidb64, token, authTokens.access),
        onSuccess: async () => {
            await fetchUser(authTokens);
            toast.success("Email has been verified")
            setIsOpen(false)
            navigate("/")
        },
        onError: (err) => {
            console.error(err);
            setIsOpen(true)
            toast.error("Email verification failed")
            setVerify(false)
        }
    })








    const verifyMock = () => new Promise((res, rej) => {
        setTimeout(() => {
            res({ "message": "success" })

        }, 1000);
    })

    useEffect(() => {

        setIsOpen(true)

    }, [pathname]);

    useEffect(() => {
        // console.log();
        if (token && uidb64 && user) {
            verifyMutation.mutate()
        }



    }, [token, uidb64, user]);


    const { mutate, isPending } = useMutation({
        mutationKey: ["verify"],
        mutationFn: () => verifyEmail(authTokens.access),
        onSuccess: () => {
            toast.success("Verification Email Sent")
            setDisabled(true)
            const countdown = setInterval(() => {
                setCounter(prev => {
                    if (prev <= 1) {
                        clearInterval(countdown)
                        setDisabled(false)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
            setCounter(30)
        },
        onError: (err) => {
            console.error(err);
            toast.error("An error occured. Please try again later.")
        }
    })


    useEffect(() => {
        if (isOpen) {
            document.title = "Verify Email"
        } else {
            document.title = "StreamGrid"
        }


    }, [isOpen]);




    return user && !user.is_verified && (

        <Dialog open={isOpen} as="div" className="relative z-20 focus:outline-none" onClose={close}>
            <DialogBackdrop className="fixed inset-0 bg-main/50"></DialogBackdrop>


            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center">
                    <DialogPanel
                        transition
                        className="relative gap-3 w-4/5 md:4/12 lg:w-3/12 xl:w-3/12 space-y-4 border bg-main text-text rounded-lg p-4 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <Button onClick={close} className='absolute top-3 right-5 text-text hover:text-subMain transitions'><IoClose className="h-5 w-5"></IoClose></Button>
                        {
                            verifyMutation.isPending ? <div className='my-3 flex flex-col justify-center items-center gap-4'>
                                <DialogTitle as="h3" className="text-base/3 text-white flex items-center gap-1">
                                    <p className='text-sm'>Verifying {user.email}</p>
                                </DialogTitle>

                                <Puff />
                            </div> : <>
                                <DialogTitle as="h3" className="text-base/3 text-white flex items-center gap-1">
                                    <FaInfoCircle className='w-5' />

                                    Verify your Email
                                </DialogTitle>

                                <p className='text-sm'>
                                    Your email <Link className='underline' to={"mailto:" + user.email}> {user.email}</Link> is not verified
                                </p>
                                <div className="flex justify-end items-center my-4">
                                    <Button type='submit' className="bg-main transitions hover:bg-subMain border border-subMain text-white py-2 px-3 rounded w-full sm:w-auto" onClick={() => {
                                        logoutUser()
                                        setIsOpen(false)
                                    }}>Logout</Button>
                                    <Button type='submit' className="bg-main transitions hover:bg-subMain border border-subMain text-white py-2 px-3 rounded w-full sm:w-auto flex items-center justify-center" disabled={disabled} onClick={mutate}>{disabled ? `Wait ${counter}s` : isPending ? <CgSpinner className="animate-spin" /> : "Verify"}</Button>
                                </div></>
                        }


                    </DialogPanel>
                </div>
            </div>


        </Dialog>
    )
}

export default Verify
