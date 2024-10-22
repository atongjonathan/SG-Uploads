import React, { useCallback, useContext, useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { Link, useParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { FaCloud, FaHeart, FaPlay } from 'react-icons/fa'
import MyPlyrVideo from './MyPlyrVideo'
import SGFaHeart from '../Components/SGFaHeart'
import { useMovies, useUser } from '../utils/SWR'
import MovieCasts from '../Components/Single/MovieCasts'
import MovieRates from '../Components/Single/MovieRates'
import Titles from '../Components/Titles'
import { BsCollectionFill } from 'react-icons/bs'
import Movie from '../Components/Movie';
import AuthContext from '../context/AuthContext'
import { Button } from '@headlessui/react'
import { FiLogIn } from 'react-icons/fi'
import { toast } from 'sonner'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';

const WatchPage = () => {
    let { id } = useParams()
    const { movies } = useMovies()
    const movie = movies?.find((movie) => movie.title == id)
    const [play, setPlay] = useState(false)


    const RelatesMovies = movies?.filter((m) => m.genre[0] = movie?.genre[0])

    const { authTokens } = useContext(AuthContext)
    const user = useUser(authTokens?.access)

    useEffect(() => {
        document.title = `Watch ${movie?.title} (${movie?.year})`

    }, [])

    return movie && (
        <Layout>
            <div className="container mx-auto bg-dry p-6 mb-2">

                <div className="flex-btn flex-row mb-6 gap-4bg-main rounded border border-gray-800 p-6">
                    <Link to={`/`} className='md:text-lg  flex gap-3 items-center font-bold text-dryGray'>
                        <BiArrowBack></BiArrowBack> <p className='hidden lg:inline-block'>{`${movie?.title} (${movie.year})`}</p>
                    </Link>
                    <div className="flex flex-btn gap-5">
                        <SGFaHeart movie={movie}></SGFaHeart>
                        {
                            user ? <Link to={movie.stream.replace("video", "dl")} target="_blank" className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-3 font-medium py-3 text-sm">
                                <FaCloud></FaCloud> Download
                            </Link> : <Button onClick={() => toast("Only logged in users can download", { closeButton: true })} target="_blank" className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-3 font-medium py-3 text-sm">
                                <FaCloud></FaCloud> Download
                            </Button>
                        }

                    </div>
                </div>
                <div className="w-full flex sm:gap-5 gap-4 justify-start items-center">
                    <p className='w-full md:text-lg  flex gap-3 items-center font-bold text-dryGra text-center mb-3 lg:hidden'>{`${movie?.title} (${movie.year})`}</p>

                </div>

                {
                    play && movie ? (
                        <MyPlyrVideo play={play} movie={movie}></MyPlyrVideo>

                    ) : (
                        <div className="w-full h-rate rounded-lg overflow-hidden relative">
                            <div className="absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo">
                                <button onClick={() => setPlay(true)} className='bg-white text-subMain flex-colo border border-subMain rounded-full w-20 h-20 font-medium text-xl'>
                                    <FaPlay></FaPlay>
                                </button>
                            </div>
                            <img src={movie?.images[0]} alt={movie?.name} className='w-full h-full object-cover rounded-lg' />
                        </div>
                    )
                }
            </div>
            {/* <MovieCasts movie={movie} /> */}

            <div className="container mx-auto min-h-screen px-2 my-6">

                <MovieRates movie={movie} play={play}></MovieRates>
                <div className="my-14">
                    <Titles title="Related Movies" Icon={BsCollectionFill}></Titles>
                    <Swiper className='mt-6'
                        slidesPerView={3}
                        spaceBetween={30}
                        freeMode={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[FreeMode, Pagination]}
                        breakpoints={
                            {
                                0: {
                                    slidesPerView: 2,
                                },
                                400: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                1024: {
                                    slidesPerView: 4,
                                },
                                1280: {
                                    slidesPerView: 5
                                }

                            }}
                    >

                        {RelatesMovies?.slice(0, 8).map((movie, idx) => (
                            <SwiperSlide key={idx}>
                                <Link to={`/movie/${movie.title}`} className="w-full truncate p-3 text-text flex-colo bg-dry border border-gray-800 hover:scale-95 transitions relative rounded overflow-hidden">
                                    <img src={movie.poster} alt={movie.title} className='w-full h-rate object-cover rounded mb-4' />
                                    <h3>{movie.title}</h3>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {/* </div> */}
                </div>
            </div>


        </Layout>
    )
}

export default WatchPage
