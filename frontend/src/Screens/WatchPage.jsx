import React, { useContext, useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { Link, useParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { FaCloud, FaHeart, FaPlay } from 'react-icons/fa'
import MyPlyrVideo from './MyPlyrVideo'
import SGFaHeart from '../Components/SGFaHeart'
import { useMovies } from '../utils/SWR'
import MovieCasts from '../Components/Single/MovieCasts'
import MovieRates from '../Components/Single/MovieRates'
import Titles from '../Components/Titles'
import { BsCollectionFill } from 'react-icons/bs'
import Movie from '../Components/Movie';


const WatchPage = () => {
    let { id } = useParams()
    const { movies } = useMovies()
    const movie = movies?.find((movie) => movie.title == id)
    const [play, setPlay] = useState(false)

    const RelatesMovies = movies?.filter((m) => m.genre[0] = movie?.genre[0])

    useEffect(()=>{
        document.title = `Watch ${movie?.title} (${movie?.year})`

    }, [])

    return movie && (
        <Layout>
            <div className="container mx-auto bg-dry p-6 mb-12">
                <div className="flex-btn flex-wrap mb-6 gap-4 bg-main rounded border border-gray-800 p-6 ">
                    <Link to={`/movie/${movie?.title}`} className='text-lg flex gap-3 items-center font-bold text-dryGray'>
                        <BiArrowBack></BiArrowBack> {movie?.title}
                    </Link>
                    <div className="flex-btn sm:w-auto w-full gap-5">
                        <SGFaHeart movie={movie}></SGFaHeart>
                        <Link to='https://t.me/dont_be_soy' target="_blank" className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-3 font-medium py-3 text-sm">
                            <FaCloud></FaCloud> Download
                        </Link>
                    </div>
                </div>
                {
                    play && movie ?  (
                        <MyPlyrVideo play={play} movie={movie}></MyPlyrVideo>

                    ) : (
                        <div className="w-full h-screen rounded-lg overflow-hidden relative">
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
            <div className="container mx-auto min-h-screen px-2 my-6">
                {/* <MovieCasts movie={movie} /> */}
                <MovieRates movie={movie}></MovieRates>
                <div className="my-16">
                    <Titles title="Related Movies" Icon={BsCollectionFill}></Titles>
                    <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                        {
                            RelatesMovies?.map((movie, idx) => (
                                <Movie key={idx} movie={movie}></Movie>
                            ))
                        }
                    </div>
                </div>
            </div>


        </Layout>
    )
}

export default WatchPage
