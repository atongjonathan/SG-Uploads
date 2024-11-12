import React, { useCallback, useContext, useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { Link, useParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { FaCloud, FaHeart, FaPlay } from 'react-icons/fa'
import MyPlyrVideo from './MyPlyrVideo'
import MovieCasts from '../Components/Single/MovieCasts'
import MovieRates from '../Components/Single/MovieRates'
import MovieInfo from '../Components/Single/MovieInfo'
import Titles from '../Components/Titles'
import { BsCollectionFill } from 'react-icons/bs'
import Movie from '../Components/Movie';
import AuthContext from '../context/AuthContext'
import { Button } from '@headlessui/react'
import { FiLogIn } from 'react-icons/fi'
import { FaShareAlt } from 'react-icons/fa'
import ShareMovieModal from '../Components/Modals/ShareMovieModal'
import { toast } from 'sonner'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import FlexMovieItems from '../Components/FlexMovieItems'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LoadingIcons from 'react-loading-icons'
import { MovieContext } from '../context/MovieContext'

const WatchPage = () => {
    let { id } = useParams()
    const [movie, setMovie] = useState(null)
    const [play, setPlay] = useState(false)

    const [isModalOpen, setisModalOpen] = useState(false)


    const { movies, isLoading } = useContext(MovieContext)

    useEffect(() => {
        setMovie(movies?.find((movie) => movie.title == id))

    }, [isLoading])



    const setModal = useCallback((data) => {
        setisModalOpen(data)
    })

    const RelatesMovies = movies?.filter((m) => {
        let present = false
        m.genre.forEach(element => {
            present = movie?.genre.includes(element) && !movie.id === m.id
        });
        return present
    })


    let title = `${movie?.title} (${movie?.year})`

    document.title = movie ? title : 'SG Uplaods | Watch'

    return (
        <Layout>

            {(movie) ?
                (<>
                    <div className="container mx-auto bg-dry p-6 mb-2">

                        {/* <div className="flex-btn flex-row mb-6 gap-4bg-main rounded border border-gray-800 p-6"> */}
                        {/* <Link to={`/`} className='md:text-lg  flex gap-3 items-center font-bold text-dryGray'>
        <BiArrowBack></BiArrowBack> <p className='hidden lg:inline-block'>{`${movie?.title} (${movie.year})`}</p>
    </Link> */}
                        {/* <div className="flex flex-btn gap-5">
        <FaHeart movie={movie}></FaHeart>
        {
            user ? <Link to={movie.stream.replace("video", "dl")}  className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-3 font-medium py-3 text-sm">
                <FaCloud></FaCloud> Download
            </Link> : <Button onClick={() => toast("Only logged in users can download", { closeButton: true })}  className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-3 font-medium py-3 text-sm">
                <FaCloud></FaCloud> Download
            </Button>
        }

    </div> */}
                        {/* </div> */}


                        <MyPlyrVideo play={play} movie={movie}></MyPlyrVideo>


                        <div className="items-center mt-4">
                            <div className="col-span-3 flex flex-col gap-5">
                                <h1 className='xl:text-2xl capitalize font-sans text-lg font-bold'>{movie.title}</h1>

                                <div className="grid grid-cols-3 gap-4 p-6 bg-main border border-gray-800 rounded-lg">
                                    <div className="col-span-2 flex-colo font-medium text-sm border-r border-border">
                                        <p>Language: {' '} <span className='ml-2 truncate'>{movie.spokenLanguages.length > 0 ? movie.spokenLanguages[0].language : 'Foreign Language'}</span></p>
                                    </div>
                                    <div className="col-span-1 flex-colo ">
                                        <button onClick={() => setisModalOpen(true)} className="w-10 h-10 flex-colo rounded-lg bg-white bg-opacity-20"><FaShareAlt /></button>

                                    </div>
                                    <ShareMovieModal movie={movie} isModalOpen={isModalOpen} setisModalOpen={setModal}></ShareMovieModal>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <MovieCasts movie={movie} /> */}

                    <div className="container mx-auto min-h-screen px-2 my-6">

                        <MovieRates movie={movie} play={play}></MovieRates>
                        <div className="my-14">
                            <Titles title="Related Movies" Icon={BsCollectionFill}></Titles>
                            {
                                RelatesMovies.length > 0 ? (
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
                                                    <LazyLoadImage src={movie.poster} alt={movie.title} title={movie.title} className='w-full h-rate object-cover rounded mb-4' />
                                                    <h3>{movie.title}</h3>
                                                </Link>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                ) : <div className="w-full mt-10 mx-auto rounded bg-dry border border-gray-800 p-6 text-center"> <p>"{movie.title}" is quite unique!</p></div>

                            }

                            {/* </div> */}
                        </div>
                    </div>
                </>
                )
                : <div className="h-96 flex flex-col justify-center items-center">
                    <h3>Site down for planned maintenance...</h3>
                    <p>We'll be back soon!</p>
                </div>
            }

        </Layout>




    )
}

export default WatchPage
