import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react'
import { useState } from 'react'
import { TrailerVideo } from './MyPlyrVideo'
import { LazyLoadImage } from 'react-lazy-load-image-component';

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

            <div className="h-32">
                <div style={{
                    backgroundImage: `url('${movie.poster}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'

                }} onClick={open} className='w-100 h-full relative group p-4 h-rate border border-border bg-dry rounded-lg overflow-hidden'>


                </div>
            </div>

            <div className="flex size-full justify-end gap-1 z-10 flex-col p-2 px-3 mobile-hero-gradient">
                <div className="flex sm:text-sm !line-clamp-2 font-medium !leading-tight">
                    {trailer.name}
                </div>
                <div className="flex !leading-tight !line-clamp-1 items-center text-xs !tracking-wider text-gray-300">
                    {trailer.type}<span className="shrink-0 mx-1 font-semibold text-centerundefined">•</span>
                    {`${new Date(trailer.published_at).getDate()}/${new Date(trailer.published_at).getMonth()}/${new Date(trailer.published_at).getFullYear()}`}
                </div>
            </div>


            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none w-screen" onClose={close}>
                <DialogBackdrop className="fixed inset-0 bg-main/50" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-screen max-w-prose rounded-xl bg-main/5 p-6 backdrop-blur-3xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <TrailerVideo trailer={trailer}></TrailerVideo>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}