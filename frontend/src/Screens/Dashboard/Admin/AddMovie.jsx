import React, { useContext, useState } from 'react'
import { Input } from '../../../Components/UserInputs'
import SideBar from '../../SideBar'
import { FaSearch } from 'react-icons/fa'
import { CgSpinner } from 'react-icons/cg'
import Backend from '../../../utils/Backend'
import { toast, Toaster } from 'sonner'
import AuthContext from '../../../context/AuthContext'


const backend = Backend()
const VITE_IMDB_API = import.meta.env.VITE_IMDB_API
const AddMovie = () => {


    const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase"
    const Text = 'text-sm text-left leading-6 whitespace-nowrap px-5 py-3'
    const [movie, setMovie] = useState(null)


    const [isloading, setLoading] = useState(false)
    const [isresults, setResults] = useState([])
    const [query, setQuery] = useState('')
    const { SGUser, authTokens } = useContext(AuthContext)
    const auth = authTokens?.access
    const user = SGUser




    function searchMovie(e) {
        setQuery(query)
        fetch(`${VITE_IMDB_API}/search?query=${e.target.value}`)
            .then((res) => res.json())
            .then((data) => {
                setResults(data.results)
            })

    }


    async function sendSubs(id) {
        try {
            const response = await backend.sendCaptions(auth, { imdb_id: id });

            if (response.data.success) {
                toast.success(`Captions sent to your Telegram`, {
                    classNames: {
                        toast: 'bg-subMain',
                        title: 'text-white',
                    },
                    closeButton: true,
                });
            } else if (response.data.error) {
                toast.error(response.data.error, {
                    classNames: {
                        toast: 'bg-oldMain',
                        title: 'text-white',
                    },
                    closeButton: true,
                });
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
            console.error(error);
        }
    }



    function findMovie(link) {
        setLoading(true)
        let split = link.split("/")
        const title = split[split.length - 1]

        fetch(`${VITE_IMDB_API}/title/${title}`)
            .then((res) => res.json())
            .then((data) => {
                data.link = link
                setMovie(data)
                setLoading(false)
                sendSubs(title)
            })



    }


    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const formObject = Object.fromEntries(formData.entries())

        let movieData = movie
        movieData.stream = formObject.stream
        movieData.poster = movie.image
        movieData.captions = [
            {
                "label": "English",
                "srclang": "en",
                "src": formObject.caption
            }
        ]

        const response = await backend.addMovie(auth, movieData)
        if (response.data) {
            toast(movie.title + ' added successfully')
            setMovie(null)
        }
        else {
            toast(movie.title + ' addition failed')

        }

    }
    document.title = `Add Movie`

    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <div className="flex-btn gap-2">
                    <h2 className='text-xl font-bold'>Add Movie</h2>

                </div>
                {
                    movie && !isloading ?
                        <form className='xl:col-span-6 w-full' method='post' onSubmit={(e) => handleSubmit(e)}>

                            <div className={`text-3xl py-3 flex justify-start flex-wrap`}>
                                <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
                                    <img src={movie.image} alt={movie.title} title={movie.title} className='h-full w-full object-cover' />
                                </div>
                                <p className={Text}>{movie.title} -  {movie.year}</p>
                                <p className={Text}><a href={movie.imdb}>{movie.genre[0]} - {movie.contentType.toLocaleUpperCase()}</a></p>
                                <p className={Text}><a href={movie.imdb}>{movie.link}</a></p>

                            </div>
                            <Input regex='https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?' name='stream' type='text' placeholder='Stream Link'></Input>
                            <Input regex='https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?' name='caption' type='text' placeholder='English Caption link'></Input>
                            <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
                                {/* <button className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">Delete Account</button> */}
                                <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">Add Movie</button>
                            </div>
                        </form>
                        :
                        <div className="col-span-3">
                            <form className="w-full text-sm bg-dryGray rounded flex-btn gap-4">
                                <button
                                    type="submit"
                                    className="bg-subMain w-12 flex-colo h-12 rounded text-white"
                                >
                                    <FaSearch></FaSearch>
                                </button>
                                <input
                                    type="text"
                                    placeholder="Search Movie Name from here"
                                    className="font-medium placeholder:text-border text-sm w-full h-12 bg-transparent border-none px-2 text-black"
                                    onInput={(e) => searchMovie(e)}
                                ></input>
                            </form>
                            <div className="col-span-2 bg-dry border border-gray-800 p-1 rounded-md xl:mb-0 mb-5">


                                <table className='w-full table-auto border border-border divide-y divide-border'>

                                    <tbody className='bg-main divide-y divide-gray-800'>
                                        {
                                            isresults.slice(0, 3).map((movie, idx) => (
                                                <tr key={idx} className='hover:text-main hover:bg-dryGray hover:cursor-pointer' onClick={() => findMovie(movie.imdb)}>
                                                    <td key={movie.title} className={`${Text}`}>
                                                        <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
                                                            <img src={movie.image} alt={movie.title} title={movie.title} className='h-full w-full object-cover' />
                                                        </div>
                                                    </td>
                                                    <td className={Text}>{movie.title}</td>
                                                    <td className={Text}>{movie.year}</td>
                                                    <td className={Text}>{movie.type.toLocaleUpperCase()}</td>
                                                    <td className={Text}><a href={movie.imdb}>IMDB link</a></td>

                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                }
                {
                    isloading && <div className="col-span-3">
                        <CgSpinner size='20' className='animate-spin'></CgSpinner>
                    </div>
                }

            </div>

        </SideBar>
    )
}

export default AddMovie
