import React, { useCallback, useContext, useState, useEffect } from 'react'
import { Input } from '../../Components/UserInputs'
import { addMovie, getMongoToken, searchCaptions, sendCaptions } from '../../utils/Backend'
import { toast } from 'sonner'
import { useAuth } from '../../context/AuthContext'
import SgCombo from './SgCombo'
import SgDropdown from './SgDropdown'
import axios from 'axios'
import Layout from '../../Layout/Layout'
import Skeleton from 'react-loading-skeleton'
import { Button } from '@headlessui/react'
import { CgSpinner } from 'react-icons/cg'
import { useMutation, useQueries, useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

const VITE_IMDB_API = import.meta.env.VITE_IMDB_API
const AddMovie = () => {
    const Text = 'text-sm text-left leading-6 whitespace-nowrap px-5 py-3'
    const [subs, setSubs] = useState(null)
    const [caption, setCaption] = useState(null)
    const { authTokens } = useAuth()
    const [movie, setMovie] = useState(null);


    const auth = authTokens?.access

    const [searchQuery, setSearchQuery] = useState("");
    const [link, setLink] = useState(null);


    const queryMovie = async (query) => {
        const searchTypes = {
            title: {
                pathname: `title/${query}`,
                postFn: (data) => {
                    return [data]
                }
            },
            value: {
                pathname: `search?query=${query}`,
                postFn: (data) => data.results?.filter((movie) => movie.type === "movie")
            }
        }
        let searchType = searchTypes.value
        if (query.startsWith("tt")) {
            searchType = searchTypes.title
        }
        return axios.get(`${VITE_IMDB_API}/${searchType.pathname}`).then((res) => res.data).then((data) => searchType.postFn(data ?? []))
    }

    const searchMovieQuery = useQuery({
        queryKey: ["searchMovieQuery", searchQuery],
        queryFn: () => queryMovie(searchQuery),
        enabled: !!searchQuery,
        retry: false
    })




    function handleSearch(e) {
        let value = e.target.value
        setSearchQuery(value)
    }


    const subsQuery = useQuery({
        queryKey: ["subsQuery", link],
        enabled: !!link,
        queryFn: () => {
            let split = link?.split("/")
            console.log(link);
            const imdb_id = split[split.length - 1]
            return searchCaptions(auth, { imdb_id })
        },
        retry: false
    })



    const sendSubsQuery = useQuery({
        queryKey: ["sendSubsQuery", caption],
        queryFn: () => sendCaptions(auth, caption),
        enabled: !!caption
    })






    const findMovieQuery = useQuery({
        queryKey: ["findMovieQuery", link],
        enabled: !!link,
        queryFn: async () => {
            let split = link?.split("/")
            const title = split[split.length - 1]
            return await axios.get(`${VITE_IMDB_API}/title/${title}`).then((res) => res.data)
        }
    })

    useEffect(() => {
        if (findMovieQuery.data) setMovie({link, ...findMovieQuery.data})
        if (subsQuery.data) setSubs(subsQuery.data)
        if (searchMovieQuery.error) toast.error(searchMovieQuery.error.message)
        if (subsQuery.error) toast.info(subsQuery.error.status === 400 ? "No Subs found" : subsQuery.error.message)
        if (sendSubsQuery.error) toast.error(sendSubsQuery.error.message)
        if (sendSubsQuery.isSuccess) toast.success(`Captions sent to you in Telegram`)
    }, [findMovieQuery.data, subsQuery.data, searchMovieQuery.error, subsQuery.error, sendSubsQuery.error, sendSubsQuery.isSuccess]);




    async function makeOptions(movie) {

        let token = await getMongoToken()
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


    const addMovieMutation = useMutation({
        mutationKey: ["addMovieMutation", link],
        mutationFn: (movieData) => addMovie(auth, movieData),
        onSuccess: () => {
            toast.success(movie.title + ' added successfully')
            setMovie(null)
            setCaption(null)
            setSubs(null)
            setLink(null)
        },
        onError: (err) => {
            console.log(err);
            toast.error(err.response?.data?.title || movie.title + ' addition failed')
        }
    })

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

        // const reqOptions = await makeOptions(movieData)
        addMovieMutation.mutate(movieData)

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
                                                setLink(null)

                                            }}
                                            className="flex-rows gap-3 text-white py-3 px-4 rounded border-2 border-subMain mr-2 hover:bg-subMain hover:border-main transitions"
                                        >
                                            Clear
                                        </Button>
                                    }

                                </div>


                                {findMovieQuery.isLoading ?
                                    <div className="col-span-3">
                                        <Skeleton baseColor="rgb(22 28 63)" height={30} containerClassName="animate-pulse"></Skeleton>
                                    </div> :
                                    movie && (
                                        <div className={`text-3xl py-3 flex justify-start flex-wrap`}>
                                            <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
                                                <img src={movie.image} alt={movie.title} title={movie.title} className='h-full w-full object-cover' />
                                            </div>
                                            <Link to={movie.imdb} className={Text}><p className='underline my-auto'>{movie.title} -  {movie.year}</p></Link>
                                            <p className={Text}>{movie.genre[0]} - {movie.contentType.toLocaleUpperCase()}</p>
                                            <p className={Text}>{movie.link}</p>

                                        </div>
                                    )
                                }

                                {
                                    caption && (
                                        <p className='flex gap-2 text-md'> Chosen subtitles:
                                            <span className="text-sm/6 text-white">{caption.release} ({caption.year})</span>
                                            <kbd className="ml-auto font-sans text-xs text-white/50">{caption.download_count}</kbd></p>
                                    )
                                }
                                {
                                    movie && (caption || subsQuery.error?.status === 400) ?
                                        <form className='xl:col-span-6 w-full' onSubmit={handleSubmit}>

                                            <Input name='stream' type='text' placeholder='Stream Link'></Input>
                                            <Input name='caption' type='text' placeholder='English Caption link' initialValue={subsQuery.error?.status === 400 ? "[]" : undefined}></Input>
                                            <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
                                                {/* <button className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">Delete Account</button> */}
                                                <Button type='submit' className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto flex gap-2 items-center justify-center">Add Movie
                                                    {addMovieMutation.isPending && <CgSpinner className='animate-spin'></CgSpinner>}
                                                </Button>
                                            </div>
                                        </form>
                                        : subs && !caption ?
                                            <SgDropdown subs={subs} sendSubs={setCaption}></SgDropdown>

                                            : !movie &&
                                            <div className="col-span-3">

                                                <div className="col-span-2 bg-dry border border-gray-800 p-1 rounded-md xl:mb-0 mb-5">
                                                    <SgCombo searchMovieQuery={searchMovieQuery} searchMovie={handleSearch} findMovie={setLink}></SgCombo>
                                                </div>
                                            </div>
                                }
                                {
                                    subsQuery.isLoading && <div className="col-span-3">
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
