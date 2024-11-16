import React, { useCallback, useContext, useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { Link, useParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { FaCloud } from 'react-icons/fa'
import MyPlyrVideo from './MyPlyrVideo'
import MovieCasts from '../Components/Single/MovieCasts'
import MovieRates from '../Components/Single/MovieRates'
import { BsCollectionFill } from 'react-icons/bs'
import AuthContext from '../context/AuthContext'
import { Button } from '@headlessui/react'
import { FaShareAlt } from 'react-icons/fa'
import ShareMovieModal from '../Components/Modals/ShareMovieModal'
import { toast } from 'sonner'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { MovieContext } from '../context/MovieContext'
import SGFaHeart from '../Components/SGFaHeart'
import SgSlider from '../Components/Home/SgSlider'
import Skeleton from 'react-loading-skeleton'

const WatchPage = () => {
    let { id } = useParams()
    const [movie, setMovie] = useState(null)
    const [play, setPlay] = useState(false)

    const { user } = useContext(AuthContext)
    const [isModalOpen, setisModalOpen] = useState(false)


    const { movies, isLoading } = useContext(MovieContext)

    useEffect(() => {
        setMovie(movies?.find((movie) => movie.title == id))

    }, [isLoading])



    const setModal = useCallback((data) => {
        setisModalOpen(data)
    })

    const RelatesMovies = movies?.filter((m) => {
        // Ensure we're not comparing the current movie with itself (m.id !== movie.id)
        return m.id !== movie?.id && m.genre.some(genre => movie?.genre.includes(genre));
    });



    let title = `${movie?.title} (${movie?.year})`

    document.title = movie ? title : 'SG Uplaods | Watch'

    return (
        <Layout>


            <>
                <div className="container mx-auto bg-dry px-4 py-2 mb-2">

                    {
                        movie && <ShareMovieModal movie={movie} isModalOpen={isModalOpen} setisModalOpen={setModal}></ShareMovieModal>
                    }



                    <div className="flex-btn flex-row mb-2 gap-4bg-main rounded border border-gray-800 py-4 px-2 lg:px-6">
                        <Link to={window.location.pathname.replace("watch", "movie")} className='md:text-lg text-sm  flex gap-3 items-center font-bold text-dryGray'>
                            {
                                movie ?
                                    <><BiArrowBack></BiArrowBack> <p className=''>{`${movie?.title} (${movie.year})`}</p></>
                                    : <Skeleton baseColor="rgb(22 28 63)" className='animate-pulse' containerClassName="animate-pulse"></Skeleton>
                            }

                        </Link>



                    </div>


                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-4 lg:col-span-3">
                            {
                                movie ?
                                    <MyPlyrVideo play={play} movie={movie}></MyPlyrVideo>
                                    : <Skeleton baseColor="rgb(22 28 63)" containerClassName="animate-pulse" className='animate-pulse' height={300}></Skeleton>
                            }
                            <div className="grid grid-cols-3 justify-between gap-2 my-4">
                                <div className="col-span-1 pt-3">
                                    <Button className=" p-1 bg-white/10 hover:bg-white/10 active:bg-white/10 smoothie bubbly rounded"> {movie?.contentRating}</Button>
                                </div>
                                <div className="col-span-2 flex justify-end items-center gap-2">
                                    <Button onClick={() => setisModalOpen(true)} className="w-10 h-10 flex-colo rounded-lg bg-white bg-opacity-20"><FaShareAlt /></Button>
                                    {
                                        movie ?
                                            <SGFaHeart movie={movie}></SGFaHeart> : <Skeleton baseColor="rgb(22 28 63)" containerClassName="animate-pulse"></Skeleton>
                                    }

                                    {
                                        user ? <Link to={movie.stream.replace("video", "dl")} className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-3 font-medium py-3 text-sm">
                                            <FaCloud></FaCloud> Download
                                        </Link> : <Button onClick={() => toast("Only logged in users can download", { closeButton: true })} className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-3 font-medium py-3 text-sm">
                                            <FaCloud></FaCloud> Download
                                        </Button>
                                    }
                                </div>

                            </div>
                        </div>
                        <div className="col-span-4 lg:col-span-1">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="border border-border p-1 transitions relative rounded overflow-hidden lg:col-span-2">
                                    {
                                        movie ?
                                            <LazyLoadImage effect="blur" wrapperProps={{
                                                style: { transitionDelay: "0.6s" },
                                            }} src={movie.poster} alt={movie.title} title={movie.title} className="object-cover lg:h-64 mx-auto" />
                                            : <Skeleton baseColor="rgb(22 28 63)" height={250} containerClassName="animate-pulse"></Skeleton>
                                    }

                                    <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
                                        <h6 className="font-semibold truncate">{movie?.title}</h6>
                                    </div>
                                </div>
                                <div className="lg:col-span-2 flex flex-col gap-5 flex-grow justify-center pl-7 py-2 text-white shrink-0 text-sm 2xl:text-base !tracking-wider w-full">
                                    {
                                        movie ?
                                            <>
                                                <div className="flex gap-1 flex-col tracking-wider">
                                                    <span className="font-light text-gray-200 !shrink-0 tracking-wider">Status</span>
                                                    <span className='capitalize'>{movie?.productionStatus}</span>

                                                </div>
                                                <div className="flex gap-2 flex-col tracking-wider">
                                                    <span className="font-light text-gray-200 !shrink-0 tracking-wider">Spoken Language(s)</span>
                                                    <button className=" smoothie bubbly rounded flex-grow-0 size-fit">{movie?.spokenLanguages.map((l) => l.language).join(", ")}</button>
                                                </div>
                                                <div className="flex flex-col gap-1 tracking-wider">
                                                    <span className="font-light text-gray-200 !shrink-0 tracking-wider">Aired</span>
                                                    <span>{`${movie?.releaseDetailed.day}/${movie?.releaseDetailed.month}/${movie?.releaseDetailed.year}`}</span>
                                                </div>
                                            </>
                                            : <Skeleton baseColor="rgb(22 28 63)" height={200} containerClassName="animate-pulse"></Skeleton>
                                    }


                                </div>

                            </div>



                        </div>

                    </div>






                </div>
                {/* <MovieCasts movie={movie} /> */}

                <div className="container mx-auto min-h-screen px-2 my-6">

                    <MovieRates movie={movie} play={play}></MovieRates>
                    <div className="my-14">
                        <SgSlider movies={RelatesMovies} title="Related Movies" Icon={BsCollectionFill}></SgSlider>

                        {/* </div> */}
                    </div>
                </div>
            </>




        </Layout>




    )
}

export default WatchPage
