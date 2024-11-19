import { Button, Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react'
import { useState } from 'react'
import { TrailerVideo } from './MyPlyrVideo'
import { PiFilmReel } from "react-icons/pi";
import { FaCloud } from 'react-icons/fa'

export default function TrailerModal({ movie, trailer }) {
    let [isOpen, setIsOpen] = useState(false)

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    return (
        <>
            <Button
                onClick={open}
                className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-3 font-medium py-3 text-sm"
            >
                <PiFilmReel></PiFilmReel>
            </Button>

            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none w-screen" onClose={close}>
                <DialogBackdrop className="fixed inset-0 bg-main/50" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-screen max-w-prose rounded-xl bg-main/5 p-6 backdrop-blur-3xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <TrailerVideo movie={movie} trailer={trailer}></TrailerVideo>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}