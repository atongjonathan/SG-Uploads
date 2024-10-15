import React, { useContext, useState } from 'react'
import Layout from '../Layout/Layout'
import { Link, useParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { FaCloud, FaHeart, FaPlay } from 'react-icons/fa'
import MyPlyrVideo from './MyPlyrVideo'
import SGFaHeart from '../Components/SGFaHeart'
import { useMovies } from '../utils/SWR'

const WatchPage = () => {
    let { id } = useParams()
    const { movies } = useMovies()
    const movie = movies.find((movie) => movie.title == id)
    const [play, setPlay] = useState(false)
    return (
        <Layout>
            <div className="container mx-auto bg-dry p-6 mb-12">
                <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6 ">
                    <Link to={`/movie/${movie?.title}`} className='md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray'>
                        <BiArrowBack></BiArrowBack> {movie?.title}
                    </Link>
                    <div className="flex-btn sm:w-auto w-full gap-5">
                        <SGFaHeart movie={movie}></SGFaHeart>
                        <button className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-8 font-medium py-3 text-sm">
                            <FaCloud></FaCloud> Download
                        </button>
                    </div>
                </div>
                {
                    play ? (
                        <MyPlyrVideo play={play} title={movie.titlem}></MyPlyrVideo>

                    ) : (
                        <div className="w-full h-screen rounded-lg overflow-hidden relative">
                            <div className="absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo">
                                <button onClick={() => setPlay(true)} className='bg-white text-subMain flex-colo border border-subMain rounded-full w-20 h-20 font-medium text-xl'>
                                    <FaPlay></FaPlay>
                                </button>
                            </div>
                            <img src={movie.images[0]} alt={movie.name} className='w-full h-full object-cover rounded-lg' />
                        </div>
                    )
                }
            </div>
        </Layout>
    )
}

export default WatchPage
