import { Button, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import { useEffect, useState, useContext } from 'react'
import { Input } from '../UserInputs'
import AuthContext from '../../context/AuthContext'
import { toast } from 'sonner'
import { IoClose } from 'react-icons/io5'
import { editMovie } from '../../utils/Backend'

export default function EditMovie({ close, isOpen, movie }) {

    const [currentMovie, setCurrentMovie] = useState(null)
    const { authTokens } = useContext(AuthContext)
    const auth = authTokens?.access

    useEffect(() => {
        setCurrentMovie(movie)
    }, [movie])


    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const formObject = Object.fromEntries(formData.entries())
        close()

        formObject.stream = formObject.stream.replace("dl", "video").replace("watch", "video")
        if (formObject.captions !== '[]' && formObject.captions !== '') {
            formObject.captions = [
                {
                    "label": "English",
                    "srclang": "en",
                    "src": formObject.captions.replace("video", "dl").replace("watch", "dl")
                }
            ]
        }
        else if (formObject.captions == '[]') {
            formObject.captions = []
        }
        for (const [key, value] of Object.entries(formObject)) {

            if (!value) {
                delete formObject[key]
            }
        }

        const response = await editMovie(auth, formObject, currentMovie.id)
        if (response.status == 200) {
            toast.success(movie.title + ' updated successfully')
        }
        else {
            toast.error(movie.title + ' addition failed')

        }






    }

    return (
        <>


            <Dialog open={isOpen} as="div" className="relative z-20 focus:outline-none" onClose={close}>
                <DialogBackdrop className="fixed inset-0 bg-main/50"></DialogBackdrop>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="relative w-full lg:w-3/5  space-y-4 border bg-main lg:p-5 text-text rounded-lg p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <Button onClick={close} className='absolute top-5 right-5 text-text hover:text-subMain transitions'><IoClose className="h-5 w-5"></IoClose></Button>

                            <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                                Edit "{currentMovie?.title}"
                            </DialogTitle>
                            <form className='flex flex-col gap-2 w-full' method='post' onSubmit={(e) => handleSubmit(e)}>
                                <Input label='Poster' name='poster' type='text' placeholder='Poster' required={false}></Input>
                                <Input label='Stream link' name='stream' type='text' placeholder='Stream Link' initialValue={movie.stream}  required={false}></Input>
                                <Input label='Caption' name='captions' type='text' placeholder='English Caption link'  required={false}></Input>
                                <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
                                    <Button type='submit' className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">Save</Button>
                                </div>
                            </form>

                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}