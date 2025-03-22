import React, { useCallback, useContext, useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { Link, useParams } from 'react-router-dom'
import { FaCloud } from 'react-icons/fa'
import MyPlyrVideo from '../Components/Single/MyPlyrVideo'
import MovieRates from '../Components/Single/MovieRates'
import { BsCollectionFill } from 'react-icons/bs'
import AuthContext from '../context/AuthContext'
import { Button } from '@headlessui/react'
import { FaShareAlt, FaEdit, FaStar } from 'react-icons/fa'
import ShareMovieModal from '../Components/Modals/ShareMovieModal'
import { toast } from 'sonner'
import { MovieContext } from '../context/MovieContext'
import SgSlider from '../Components/Home/SgSlider'
import Skeleton from 'react-loading-skeleton'
import EditMovie from '../Components/Modals/EditMovie'
import { useLocation } from 'react-router-dom'
import NotFound from "./Error/NotFound"
import TrailerSlider from '../Components/Home/TrailerSlider'
import Characters from '../Components/Home/Characters'
import MovieInfo from '../Components/Single/MovieInfo'
import { IoMdCloudDownload } from "react-icons/io";
import { Helmet } from "react-helmet";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY

const WatchPage = () => {
    let { id } = useParams()
    const [movie, setMovie] = useState(null)
    let [present, setPresent] = useState(true)

    const { user } = useContext(AuthContext)
    const [isModalOpen, setisModalOpen] = useState(false)


    const { movies, isLoading } = useContext(MovieContext)


    let [isOpen, setIsOpen] = useState(false)


    const open = useCallback(function open() {
        setIsOpen(true)
    })


    const close = useCallback(
        function close() {
            setIsOpen(false)
        }
    )

    useEffect(() => {
        if (movies) setMovie(movies?.find((movie) => movie.title == id || movie.id == id))
        if (!movies && !isLoading) {
            setPresent(false)
        }



    }, [isLoading, id, movies])



    const setModal = useCallback((data) => {
        setisModalOpen(data)
    })

    const RelatesMovies = movies?.filter((m) => {
        return m.id !== movie?.id && m.genre.includes(movie?.genre[0]);
    });



    let title = `${movie?.title} (${movie?.year})`



    const { pathname } = useLocation()
    const [trailer, setTrailer] = useState([])
    const [casts, setCast] = useState([])



    async function getTrailer() {

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${movie.title}&year=${movie.year}`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
            },
            "method": "GET",
            "mode": "cors",
        })
            .then((res) => res.json())
            .then((data) => {
                let tmdb_id = data.results[0].id
                fetch(`https://api.themoviedb.org/3/movie/${tmdb_id}/videos?api_key=${TMDB_API_KEY}`, {

                    "method": "GET",
                    "mode": "cors",
                    "credentials": "omit"
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setTrailer(data.results)
                    })
                    .catch((err) => {
                        setTrailer(null)
                        console.log(err)
                    })
            })
            .catch((err) => {
                setTrailer(null)
                console.log(err)
            });

    }
    async function getCast() {
        let tmdb_id = movie?.link?.split("/").reverse()[0]
        fetch(`https://api.themoviedb.org/3/movie/${tmdb_id}/credits?api_key=${TMDB_API_KEY}`, {

            "method": "GET",
            "mode": "cors",
            "credentials": "omit"
        })
            .then((res) => res.json())
            .then((data) => {
                setCast(data.cast)
            })
            .catch((err) => {
                setCast(null)
                console.log(err)
            })



    }

    useEffect(() => {
        if (movie) {
            getTrailer(movie)
            getCast()

        }

    }, [pathname, movie, id])

    return (
        <>
            {
                present ?
                    <Layout>
                        {
                            movie &&
                            <Helmet>
                                <meta name="description" content={`${movie.title} (${movie?.year}) ⭐️ ${movie.rating.star} | ${movie.genre.join(",")} ${movie.runtime} | ${movie.contentRating}`} />

                                <title>{`${movie?.title} (${movie?.year})`}</title>
                                <meta property="og:image" content={movie.poster} />
                                <meta property="og:description" content={`${movie.title} (${movie?.year}) ⭐️ ${movie.rating.star}| ${movie.genre.join(",")} ${movie.runtime}| ${movie.contentRating}`} />
                                <meta property="twitter:description" content={`${movie.title} (${movie?.year}) ⭐️ ${movie.rating.star}| ${movie.genre.join(",")} ${movie.runtime}| ${movie.contentRating}`} />
                                <meta property="twitter:image" content={movie.poster} />
                            </Helmet>
                        }
                        <div className="container mx-auto bg-dry px-4 py-2 mb-2">
                            <EditMovie close={close} isOpen={isOpen} movie={movie}></EditMovie>

                            {
                                movie && <ShareMovieModal movie={movie} isModalOpen={isModalOpen} setisModalOpen={setModal}></ShareMovieModal>
                            }
                            {
                                movie && <div className="p-4 flex gap-2 ml-3 text-center">

                                    <h2 className="md:text-lg text-sm font-semibold">{movie.title} ({movie.year})</h2>

                                </div>
                            }

                            <div className="grid grid-cols-4 gap-2">
                                <div className="col-span-4 lg:col-span-3">
                                    {
                                        movie ?
                                            <MyPlyrVideo movie={movie}></MyPlyrVideo>
                                            : <Skeleton baseColor="rgb(22 28 63)" containerClassName="animate-pulse" className='animate-pulse' height={260}></Skeleton>
                                    }
                                    <div className="grid grid-cols-4 place-content-center justify-between gap-2 my-4">

                                        <div className="col-span-2 p-2 flex gap-2">

                                            {
                                                movie ?
                                                    movie.genre.slice(0, 2).map((item, idx) => (
                                                        <Button key={idx} className=" p-1 bg-white/10 hover:bg-white/10 active:bg-white/10 smoothie bubbly rounded text-sm lg:text-lg"> {item}</Button>
                                                    ))

                                                    : <Skeleton baseColor="rgb(22 28 63)" height={30} width={100} containerClassName="animate-pulse"></Skeleton>
                                            }


                                        </div>

                                        <div className="col-span-2 flex justify-end items-center gap-2">


                                            <Button onClick={() => setisModalOpen(true)} className="w-10 h-10 flex-colo rounded-lg bg-white bg-opacity-20"><FaShareAlt /></Button>


                                            {
                                                user ? <Link to={movie?.stream.replace("video", "dl")} className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-3 font-medium py-3 text-sm">
                                                    <IoMdCloudDownload></IoMdCloudDownload>
                                                </Link> : <Button onClick={() => toast.info("Only logged in users can download", { closeButton: true })} className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-3 font-medium py-3 text-sm">
                                                    <IoMdCloudDownload></IoMdCloudDownload>
                                                </Button>
                                            }
                                            {
                                                user?.is_superuser && (
                                                    <Button onClick={() => {
                                                        setMovie(movie)
                                                        open()
                                                    }} className='bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-3 font-medium py-3 text-sm'>
                                                        <FaEdit className='text-green-500'></FaEdit>
                                                    </Button>
                                                )
                                            }
                                        </div>

                                    </div>

                                    <Characters casts={casts} />
                                    <TrailerSlider movie={movie} trailers={trailer} />
                                </div>
                                <MovieInfo movie={movie}></MovieInfo>

                            </div>

                        </div>
                        <div className="container mx-auto px-2 my-6">

                            <MovieRates movie={movie}></MovieRates>

                            <div className="my-14">
                                <SgSlider movies={RelatesMovies} title="Recommended" Icon={BsCollectionFill}></SgSlider>

                            </div>
                        </div>
                    </Layout>

                    : <NotFound></NotFound>
            }
        </>

    )
}

export default WatchPage
