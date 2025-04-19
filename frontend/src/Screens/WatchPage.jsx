import React, { useCallback, useContext, useState } from 'react'
import Layout from '../Layout/Layout'
import { Link, useParams } from 'react-router-dom'
import MyPlyrVideo from '../Components/Single/MyPlyrVideo'
import MovieRates from '../Components/Single/MovieRates'
import { BsCollectionFill } from 'react-icons/bs'
import AuthContext from '../context/AuthContext'
import { Button } from '@headlessui/react'
import { FaShareAlt, FaEdit } from 'react-icons/fa'
import ShareMovieModal from '../Components/Modals/ShareMovieModal'
import { toast } from 'sonner'
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



const WatchPage = () => {
    let { id } = useParams()

    const { user } = useContext(AuthContext)
    const [isModalOpen, setisModalOpen] = useState(false)


    let [isOpen, setIsOpen] = useState(false)



    const { error, data, isSuccess, isFetching } = useQuery({
        queryKey: ["movieQuery", id],
        queryFn: async () => {
            return getMovie(id)
        },
        enabled: Boolean(id)
    })


    const movie = data
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


    if (isSuccess && !movie) return <NotFound />

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
                                <EditMovie close={close} isOpen={isOpen} movie={movie} />
                                <ShareMovieModal movie={movie} isModalOpen={isModalOpen} setisModalOpen={setModal} />
                                <div className="p-4 flex gap-2 ml-3 text-center">

                                    <h2 className="md:text-lg text-sm font-semibold">{movie.title} ({movie.year})</h2>

                                </div>
                            </>
                        }


                        <div className="grid grid-cols-4 gap-2">
                            <div className="col-span-4 lg:col-span-3">
                                {
                                    isFetching ? <Skeleton baseColor="rgb(22 28 63)" containerClassName="animate-pulse" className='animate-pulse' height={260}></Skeleton>
                                        : <> {

                                            movie && <MyPlyrVideo movie={movie}></MyPlyrVideo>
                                        } </>

                                }
                                <div className="grid grid-cols-4 place-content-center justify-between gap-2 my-4">

                                    <div className="col-span-2 p-2 flex gap-2">

                                        {
                                            isFetching ?


                                                <Skeleton baseColor="rgb(22 28 63)" height={30} width={100} containerClassName="animate-pulse"></Skeleton>

                                                : <>
                                                    {
                                                        movie && movie.genre.slice(0, 2).map((item, idx) => (
                                                            <Button key={idx} className=" p-1 bg-white/10 hover:bg-white/10 active:bg-white/10 smoothie bubbly rounded text-sm lg:text-lg"> {item}</Button>
                                                        ))
                                                    }
                                                </>
                                        }


                                    </div>

                                    <div className="col-span-2 flex justify-end items-center gap-2">
                                        <SGFaHeart movie={movie} />
                                        <DonateBtn />


                                        <Button onClick={() => setisModalOpen(true)} className="w-10 h-10 flex-colo rounded-lg bg-subMain"><FaShareAlt /></Button>



                                        {
                                            user?.is_superuser && (
                                                <Button onClick={() => {
                                                    open()
                                                }} className='bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-3 font-medium py-3 text-sm'>
                                                    <FaEdit className='text-green-500'></FaEdit>
                                                </Button>
                                            )
                                        }
                                    </div>

                                </div>

                                {
                                    tmdb_id && <Characters tmdb_id={tmdb_id} />
                                }

                                <TrailerSlider movie={movie} />


                            </div>

                            <MovieInfo movie={movie}></MovieInfo>

                        </div>

                    </div>
                    <div className="container mx-auto px-2 my-6">

                        <MovieRates movie={movie}></MovieRates>

                        <div className="my-14">
                            {
                                movie && <SgSlider params={{
                                    genre: movie?.genre[0],
                                    ordering: "-rating_star",
                                    limit: 10
                                }} title="Recommended" Icon={BsCollectionFill}></SgSlider>
                            }

                        </div>
                    </div>

                </Layout>


            }

        </>

    )
}

export default WatchPage
