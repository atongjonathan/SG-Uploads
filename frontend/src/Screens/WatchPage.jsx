import React, { useCallback, useContext, useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { Link, useParams } from 'react-router-dom'
import MyPlyrVideo from '../Components/Single/MyPlyrVideo'
import MovieRates from '../Components/Single/MovieRates'
import { BsCollectionFill } from 'react-icons/bs'
import AuthContext from '../context/AuthContext'
import { Button } from '@headlessui/react'
import { FaShareAlt, FaEdit, FaShare } from 'react-icons/fa'
import ShareMovieModal from '../Components/Modals/ShareMovieModal'
import SgSlider from '../Components/Home/SgSlider'
import Skeleton from 'react-loading-skeleton'
import EditMovie from '../Components/Modals/EditMovie'
import NotFound from "./Error/NotFound"
import TrailerSlider from '../Components/Home/TrailerSlider'
import Characters from '../Components/Home/Characters'
import MovieInfo from '../Components/Single/MovieInfo'
import { IoMdCloudDownload } from "react-icons/io";
import { Helmet } from "react-helmet";
import { useQuery } from '@tanstack/react-query'
import { getMovie } from '../utils/Backend'
import DonateBtn from '../Components/DonateBtn'
import SGFaHeart from '../Components/SGFaHeart'
import WebShare, { handleShare } from '../Components/WebShare'



const WatchPage = () => {
    let { id } = useParams()

    const { user } = useContext(AuthContext)
    const [isModalOpen, setisModalOpen] = useState(false)


    const [movie, setMovie] = useState(null);


    let [isOpen, setIsOpen] = useState(false)



    const { data, error, isFetching } = useQuery({
        queryKey: ["movieQuery", id],
        queryFn: async () => {
            return getMovie(id)
        },
        enabled: Boolean(id),
        retry: false
    })


    useEffect(() => {
        setMovie(data)

    }, [data]);


    const split = movie?.link?.split("/") || [];
    const tmdb_id = split[split.length - 1];
    const open = useCallback(function open() {
        setIsOpen(true)
    })


    const close = useCallback(
        function close() {
            setIsOpen(false)
        }
    )




    const setModal = useCallback((data) => {
        setisModalOpen(data)
    })




    function clearLocalStorageByValue(valueToMatch) {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let value = localStorage.getItem(key);

            if (value === valueToMatch) {
                localStorage.removeItem(key);
            }
        }
    }

    clearLocalStorageByValue('{"time":"0"}');



    if (error?.status === 404) return <NotFound />

    return (
        <>
            {
                <Layout>
                    {
                        movie &&
                        <Helmet>
                            <meta name="description" content={`${movie.title} (${movie?.year}) ⭐️ ${movie.rating_star} | ${movie.genre?.join(",")} ${movie.runtime} | ${movie.contentRating}`} />

                            <title>{`${movie?.title} (${movie?.year})`}</title>
                            <meta property="og:image" content={movie.poster} />
                            <meta property="og:description" content={`${movie.title} (${movie?.year}) ⭐️ ${movie.rating_star}| ${movie.genre.join(",")} ${movie.runtime}| ${movie.contentRating}`} />
                            <meta property="twitter:description" content={`${movie.title} (${movie?.year}) ⭐️ ${movie.rating_star}| ${movie.genre.join(",")} ${movie.runtime}| ${movie.contentRating}`} />
                            <meta property="twitter:image" content={movie.poster} />
                        </Helmet>
                    }
                    <div className="container mx-auto bg-dry px-4 py-2 mb-2">
                        {
                            movie && <>
                                <EditMovie close={close} isOpen={isOpen} movie={movie} setMovie={setMovie} />
                                <ShareMovieModal movie={movie} isModalOpen={isModalOpen} setisModalOpen={setModal} />
                                <div className="p-4 flex gap-2 ml-3 justify-between">

                                    <h2 className="md:text-lg text-sm font-semibold">{movie.title} ({movie.year})</h2>
                                    <Link to={"/contact-us/#details"} className="ring-1 ring-gray-500 lg:ring-gray-400 hover:bg-white/5 px-3 rounded-full py-1 text-xs 2xl:text-sm text-white xl:font-medium my-auto transitions truncate">Report a Problem ?</Link>

                                </div>

                            </>
                        }


                        <div className="grid grid-cols-4 gap-2">
                            <div className="col-span-4 lg:col-span-3">
                                {
                                    isFetching ? <Skeleton baseColor="rgb(22 28 63)" containerClassName="" className='' height={260}></Skeleton>
                                        : <> {

                                            movie && <MyPlyrVideo movie={movie}></MyPlyrVideo>
                                        } </>

                                }
                                <div className="grid grid-cols-4 place-content-center justify-between gap-2 my-2">

                                    <div className="hidden md:flex col-span-2 p-2 gap-2">
                                        {
                                            isFetching ?
                                                <Skeleton baseColor="rgb(22 28 63)" height={30} width={100} containerClassName=""></Skeleton>
                                                : <>
                                                    {
                                                        movie && (
                                                            <p className={`p-2 w-max   bg-white/10 font-semibold border-b-white rounded-full text-sm ${movie.contentRating === "N/A" ? "invisible" : "visible"}`}> {movie.contentRating}</p>
                                                        )
                                                    }
                                                </>
                                        }
                                    </div>

                                    <div className="md:col-span-2 col-span-4 overflow-x-auto flex items-center justify-center">
                                        {
                                            movie && (
                                                <div className='flex md:justify-end justify-between w-max min-w-full gap-2'>
                                                    <p className={`md:hidden w-max whitespace-nowrap  p-2 font-semibold bg-white/10  rounded-full text-sm ${movie.contentRating === "N/A" ? "invisible" : "visible"}`}> {movie.contentRating}</p>
                                                    <div className="flex justify-end items-center gap-2 ">
                                                        <SGFaHeart movie={movie} />
                                                        <DonateBtn />
                                                        {/* <WebShare title={movie.title} id={movie.id}/> */}
                                                        <Button onClick={() => setisModalOpen(true)} className={`relative select-none outline-none transitions data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-sm  px-2 py-1 gap-2 flex items-center rounded-lg hover:bg-white/20 cursor-pointer mb-[.1rem] text-white ${isModalOpen ? 'bg-white/30' : "bg-white/10"}`}>
                                                            <FaShare />
                                                            Share
                                                        </Button>
                                                        {
                                                            user?.is_superuser && (
                                                                <Button onClick={() => {
                                                                    open()
                                                                }} className={`relative select-none outline-none transitions data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-sm  px-2 py-1 gap-2 flex items-center rounded-lg hover:bg-white/20 cursor-pointer mb-[.1rem] text-white ${isModalOpen ? 'bg-white/30' : "bg-white/10"}`}>
                                                                    <FaEdit className='text-green-500'></FaEdit>
                                                                    Edit
                                                                </Button>
                                                            )
                                                        }
                                                    </div>
                                                </div>

                                            )
                                        }
                                    </div>

                                </div>


                                <Characters movieIsFetching={isFetching} tmdb_id={tmdb_id} />
                                <TrailerSlider movieIsFetching={isFetching} movie={movie} />
                            </div>

                            <MovieInfo movieIsFetching={isFetching} movie={movie} />

                        </div>

                    </div>
                    <div className="container mx-auto px-2 my-6">

                        <MovieRates movie={movie}></MovieRates>

                        <div className="my-14">
                            {
                                movie && <SgSlider params={{
                                    genre: movie?.genre[0],
                                    ordering: "-rating_star",
                                    limit: 10,
                                    shuffle: true
                                }} title="Recommended" Icon={BsCollectionFill} excludeID={movie.id}></SgSlider>
                            }

                        </div>
                    </div>

                </Layout>

            }

        </>

    )
}

export default WatchPage
