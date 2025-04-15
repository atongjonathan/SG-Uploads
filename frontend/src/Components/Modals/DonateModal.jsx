import React, { useRef } from 'react'
import { Button, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import { useEffect, useState, useContext } from 'react'
import { Input } from '../UserInputs'
import AuthContext, { useAuth } from '../../context/AuthContext'
import { toast } from 'sonner'
import { IoClose } from 'react-icons/io5'
import { useMutation } from '@tanstack/react-query';
import { getIframeSrc } from '../../utils/Backend'
import Puff from 'react-loading-icons/dist/esm/components/puff'
import { useLocation, useSearchParams } from 'react-router-dom'
import image from "../../images/keyaan-john-wick.gif"


const DonateModal = ({ isModalOpen, setisModalOpen }) => {
    const form = useRef()
    const { user } = useAuth()

    const [searchParams, setSearchParams] = useSearchParams();

    const OrderTrackingId = searchParams.getAll("OrderTrackingId")
    const OrderMerchantReference = searchParams.getAll("OrderMerchantReference")

    const close = () => {
        setisModalOpen(false)
        setSearchParams({})
        reset()
    }


    useEffect(() => {
        if (OrderTrackingId.length > 0 && OrderMerchantReference.length > 0) {
            setisModalOpen(true)
        }


    }, [OrderTrackingId.length > 0, OrderMerchantReference.length > 0]);

    const currentUrl = document.URL;


    const { mutate, isSuccess, data, isPending, reset } = useMutation({
        mutationKey: ["donate", OrderTrackingId, OrderMerchantReference],
        mutationFn: (billing_address) => {
            let grand_total = billing_address.grand_total
            delete billing_address.grand_total
            let data = {
                "currency": "KES",
                "amount": grand_total,
                "description": "StreamGrid",
                "callback_url": currentUrl,
                "redirect_mode": "PARENT_WINDOW",
                billing_address
            }

            return getIframeSrc(data)
        }
    })

    return (
        <Dialog open={isModalOpen} as="div" className="relative z-20 focus:outline-none" onClose={close}>
            <DialogBackdrop className="fixed inset-0 bg-main/50"></DialogBackdrop>



            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="relative w-full lg:w-3/5  space-y-4 border bg-main lg:p-5 text-text rounded-lg p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <Button onClick={close} className='absolute top-5 right-5 text-text hover:text-subMain transitions'><IoClose className="h-5 w-5"></IoClose></Button>
                        {
                            (isSuccess && data.redirect_url) ? <iframe className='n-typeset' src={data.redirect_url} width="100%" height="800px">
                                <p>Browser unable to load iFrame</p>
                            </iframe>
                                : isPending ? <div className='my-3 flex flex-col justify-center items-center gap-4'>
                                    <DialogTitle as="h3" className="text-base/3 text-white flex items-center gap-1">
                                        <p className='text-sm'>Loading donate page ... </p>
                                    </DialogTitle>

                                    <Puff />
                                </div> : (OrderTrackingId.length > 0 && OrderMerchantReference.length > 0) ? <div className='flex items-center justify-center'>


                                    <img src={image} alt='Thank You gif' />
                                </div> :
                                    <>
                                        <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                                            Donate
                                        </DialogTitle>
                                        <form ref={form} className='flex flex-col gap-2 w-full' method='post' onSubmit={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            const formData = new FormData(form.current)
                                            const formObject = Object.fromEntries(formData.entries())
                                            mutate(formObject);
                                        }}>
                                            <Input label='Amount' name='grand_total' type='number' required={true}></Input>
                                            <Input label='Name' name='first_name' type='text' placeholder='Name' initialValue={user?.name} required={false}></Input>
                                            <Input label='Email' name='email_address' type='email' initialValue={user?.email} required={false}></Input>
                                            <Input label='Phone Number' name='phone_number' type='text' placeholder='0723xxxxxx' required={false}></Input>
                                            <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
                                                <Button type='submit' className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">Donate</Button>
                                            </div>
                                        </form>
                                    </>



                        }

                    </DialogPanel>
                </div>
            </div>

        </Dialog>
    )
}

export default DonateModal
