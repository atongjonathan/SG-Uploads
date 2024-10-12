import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import React, { useRef } from 'react';
import { Fragment } from 'react';
import { IoClose } from 'react-icons/io5';

const MainModal = ({ modalOpen, setModalOpen, children }) => {
    const cancelButtonRef = useRef();

    return (
        <Transition show={modalOpen} as={Fragment} appear>
            <Dialog
                as='div'
                className="fixed inset-0 z-10 overflow-y-auto text-center"
                onClose={() => setModalOpen(false)}
                initialFocus={cancelButtonRef}
            >
                <div className="min-h-screen px-4 text-center">
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
                    </TransitionChild>

                    <span className="inline-block h-screen align-middle" aria-hidden="true">
                        &#8230;
                    </span>

                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            {children}
                            <div className="absolute right-5 top-5">
                                <button
                                    onClick={() => setModalOpen(false)}
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 text-base font-medium text-white bg-subMain border rounded-full hover:bg-white hover:text-subMain transition"
                                >
                                    <IoClose />
                                </button>
                            </div>
                        </div>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
};

export default MainModal;
