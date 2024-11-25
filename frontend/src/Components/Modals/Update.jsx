import React, { useCallback, useContext, useState } from 'react'
import Backend from '../../utils/Backend'
import { toast } from 'sonner'
import AuthContext from '../../context/AuthContext'
import Uploader from '../../Components/Uploader'
import { Input } from '../../Components/UserInputs'
import { CgSpinner } from 'react-icons/cg'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { IoClose } from 'react-icons/io5'


const Update = ({ isUpdateOpen, updateClose }) => {

    const backend = Backend()
    const [loading, setLoading] = useState(false)


    const { authTokens } = useContext(AuthContext)


    const [image, setFileResponse] = useState(null)




    const handleDataFromChild = useCallback((data) => {
        setFileResponse(data)
    })

    const handleSubmit = async (e) => {
        updateClose()
        setLoading(true)
        e.preventDefault(); // Prevent form from being submitted the default way

        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData.entries())

        if (image) {
            formObject['image'] = image      // Append the actual file object
        }
        const toastOptions = {
            classNames: {
                toast: 'bg-subMain',
                title: 'text-white',
                closeButton: 'bg-subMain text-white hover:text-subMain',
            },
        }
        try {
            const response = await backend.updateProfile(authTokens.access, formObject);
            if (response.data) {
                toast("Profile Updated", toastOptions)
                window.location.assign("/")
            }
            else {

                toastOptions.classNames.toast = 'bg-oldMain'
                toast("Profile update failed, Try again later", toastOptions)

            }

        } catch (error) {
            console.error('Error uploading profile:', error); // Handle any errors
        }
        setLoading(false)
    };
    return (

        <Dialog open={isUpdateOpen} as="div" className="relative z-20 focus:outline-none" onClose={updateClose}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel transition className="relative max-w-lg space-y-4 border bg-main p-6 lg:p-10 text-text rounded-lg  backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                        <Button onClick={updateClose} className='absolute top-5 right-5 text-text hover:text-subMain transitions'><IoClose className="h-5 w-5"></IoClose></Button>

                        <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                            Update Profile
                        </DialogTitle>

                        <div className="mt-4">
                            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-6" action='' method='post' encType='multipart/form-data'>

                                <Uploader updateParentFile={handleDataFromChild}></Uploader>
                                <Input label="Full Name" placeholder='SG Uploads' type='text' bg name='name' required={false}></Input>
                                <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4"                                >
                                    <Button type='submit'
                                        className="bg-subMain inline-flex items-center gap-2 rounded-md  py-3 px-6 text-sm/6 font-semibold text-white shadow-inner shadow-subMain/30 focus:outline-none data-[hover]:bg-main data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-main transitions"
                                    >Update Profile {loading && <CgSpinner className='animate-spin ml-4'></CgSpinner>}
                                    </Button>
                                </div>


                            </form>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>

    )
}

export default Update
