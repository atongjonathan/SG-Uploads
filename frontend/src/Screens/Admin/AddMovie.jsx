import React, { useCallback, useContext, useState } from 'react'
import { Input } from '../../Components/UserInputs'
import Backend from '../../utils/Backend'
import { toast } from 'sonner'
import AuthContext from '../../context/AuthContext'
import SgCombo from './SgCombo'
import SgDropdown from './SgDropdown'
import axios from 'axios'
import Layout from '../../Layout/Layout'
import Skeleton from 'react-loading-skeleton'
import { Button } from '@headlessui/react'

const backend = Backend()
const VITE_IMDB_API = import.meta.env.VITE_IMDB_API
const AddMovie = () => {


    const Text = 'text-sm text-left leading-6 whitespace-nowrap px-5 py-3'
    const [movie, setMovie] = useState(null)
    const [subs, setSubs] = useState(null)
    const [caption, setCaption] = useState(null)


    const [isloading, setLoading] = useState(false)
    const [isresults, setResults] = useState([])
    const [query, setQuery] = useState('')
    const { authTokens } = useContext(AuthContext)
    const auth = authTokens?.access



    const searchMovie = useCallback(function searchMovie(e) {
        if (e.target.value) {
            setQuery(query)
            fetch(`${VITE_IMDB_API}/search?query=${e.target.value}`)
                .then((res) => res.json())
                .then((data) => {
                    setResults(data.results)
                })
        }


    })


    const searchSubs = useCallback(async function searchSubs(id) {
        try {
            const response = await backend.searchCaptions(auth, { imdb_id: id });

            if (response.data) {
                setSubs(response.data.sort((a, b) => b.download_count - a.download_count))
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
        finally {
            setLoading(false)
        }
    }
    )

    const sendSubs = useCallback(async function sendSubs(caption) {
        setCaption(caption)
        try {
            const response = await backend.sendCaptions(auth, caption);

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
    })




    const findMovie = useCallback(function findMovie(link) {

        if (link) {
            setLoading(true)
            let split = link?.split("/")
            const title = split[split.length - 1]

            fetch(`${VITE_IMDB_API}/title/${title}`)
                .then((res) => res.json())
                .then((data) => {
                    data.link = link
                    setMovie(data)
                    searchSubs(title)
                })
        }




    })




    async function makeOptions(movie) {

        let token = await Backend().getMongoToken()
        let headersList = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }

        let bodyContent = JSON.stringify({
            "collection": "movies",
            "database": "F2LxBot",
            "dataSource": "Cluster0",
            "document": movie
        });

        let reqOptions = {
            url: "https://eu-west-2.aws.data.mongodb-api.com/app/data-kmyiqtw/endpoint/data/v1/action/insertOne",
            method: "POST",
            headers: headersList,
            data: bodyContent,
        }

        return reqOptions

    }

    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const formObject = Object.fromEntries(formData.entries())

        let movieData = movie
        movieData.stream = formObject.stream.replace("dl", "video").replace("watch", "video")
        movieData.poster = movie.image
        movieData.captions = [
            {
                "label": "English",
                "srclang": "en",
                "src": formObject.caption.replace("video", "dl").replace("watch", "dl")
            }
        ]

        const reqOptions = await makeOptions(movieData)

        const responses = await Promise.all([backend.addMovie(auth, movieData), axios.request(reqOptions)])

        if (responses[0].status == 201 || responses[1].status == 201) {
            toast(movie.title + ' added successfully')
            setMovie(null)
            setCaption(null)
            setSubs(null)
        }
        else {
            toast(movie.title + ' addition failed')

        }

    }
    document.title = `Add Movie`



    return (
        <Layout>
            <div className="w-full min-h-screen container mx-auto">

                <div className="w-full items-start md:py-12 py-6">

                    <div
                        data-aos="fade-up" data-aos-duration="1000" data-aos-delay="10" data-aos-offset="100"

                        className="rounded bg-dry border border-gray-800 p-6">
                        <div className="flex flex-col gap-6">
                            <div className="flex-btn gap-2">
                                <h2 className='text-xl font-bold'>Add Movie</h2>

                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-end">
                                    {
                                        (movie || caption || subs) && <Button
                                            onClick={() => {
                                                setMovie(null)
                                                setCaption(null)
                                                setSubs(null)

                                            }}
                                            className="flex-rows gap-3 text-white py-3 px-4 rounded border-2 border-subMain mr-2 hover:bg-subMain hover:border-main transitions"
                                        >
                                            Clear
                                        </Button>
                                    }

                                </div>

                                {
                                    movie && (
                                        <div className={`text-3xl py-3 flex justify-start flex-wrap`}>
                                            <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
                                                <img src={movie.image} alt={movie.title} title={movie.title} className='h-full w-full object-cover' />
                                            </div>
                                            <p className={Text}>{movie.title} -  {movie.year}</p>
                                            <p className={Text}><a href={movie.imdb}>{movie.genre[0]} - {movie.contentType.toLocaleUpperCase()}</a></p>
                                            <p className={Text}><a href={movie.imdb}>{movie.link}</a></p>

                                        </div>
                                    )
                                }

                                {
                                    caption && (
                                        <p className='flex gap-2 text-md'> Chosen subtitles:
                                            <div className="text-sm/6 text-white">{caption.release} ({caption.year})</div>
                                            <kbd className="ml-auto font-sans text-xs text-white/50">{caption.download_count}</kbd></p>
                                    )
                                }
                                {
                                    movie && !isloading && caption ?
                                        <form className='xl:col-span-6 w-full' method='post' onSubmit={(e) => handleSubmit(e)}>


                                            <Input name='stream' type='text' placeholder='Stream Link'></Input>
                                            <Input name='caption' type='text' placeholder='English Caption link'></Input>
                                            <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
                                                {/* <button className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">Delete Account</button> */}
                                                <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">Add Movie</button>
                                            </div>
                                        </form>
                                        : subs && !caption && !isloading ?
                                            <SgDropdown subs={subs} sendSubs={sendSubs}></SgDropdown>

                                            : !movie &&
                                            <div className="col-span-3">

                                                <div className="col-span-2 bg-dry border border-gray-800 p-1 rounded-md xl:mb-0 mb-5">
                                                    <SgCombo movies={isresults} searchMovie={searchMovie} findMovie={findMovie}></SgCombo>
                                                </div>
                                            </div>
                                }
                                {
                                    isloading && <div className="col-span-3">
                                        <Skeleton baseColor="rgb(22 28 63)" height={30} containerClassName="animate-pulse"></Skeleton>
                                    </div>
                                }
                            </div>


                        </div>

                    </div>

                </div>
            </div>


        </Layout>
    )
}

export default AddMovie
