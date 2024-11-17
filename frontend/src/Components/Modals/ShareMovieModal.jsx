import React from 'react'
import { FaFacebook, FaTelegram, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import { Dialog, DialogPanel, DialogTitle, DialogBackdrop, Button } from '@headlessui/react'
import { IoClose } from 'react-icons/io5'


const ShareMovieModal = ({ movie, isModalOpen, setisModalOpen }) => {
    const shareData = [
        {
            icon: FaWhatsapp,
            shareButton: WhatsappShareButton
        },
        {
            icon: FaFacebook,
            shareButton: FacebookShareButton
        },
        {
            icon: FaTwitter,
            shareButton: TwitterShareButton
        },
        {
            icon: FaTelegram,
            shareButton: TelegramShareButton
        },

    ]
    const url = `${window.location.protocol}//${window.location.host}/watch/${movie.title}`
    return (
        <Dialog open={isModalOpen} onClose={() => setisModalOpen(false)} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-main/50"></DialogBackdrop>
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">


                <DialogPanel className="relative max-w-lg space-y-4 border bg-main p-6 lg:p-10 text-text rounded-lg">
                    <Button onClick={() => setisModalOpen(false)} className='absolute top-5 right-5 text-text hover:text-subMain transitions'><IoClose className="h-5 w-5"></IoClose></Button>
                    <DialogTitle className="font-bold pt-3 text-center">Share "{movie.title}"</DialogTitle>
                    <form className='flex flex-rows flex-wrap gap-6 mt-6'>
                        {
                            shareData.map((data, idx) => (
                                <data.shareButton key={idx} url={url} quote='SG Uploads'>
                                    <div className="transitions hover:bg-subMain text-lg bg-white bg-opacity-30 text-white rounded p-4">
                                        <data.icon className='h-6 w-6 mx-auto text-white'></data.icon>
                                    </div>

                                </data.shareButton>
                            ))
                        }
                    </form>
                </DialogPanel>
            </div>
        </Dialog>

    )
}

export default ShareMovieModal
