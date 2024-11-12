import React, { useContext, useEffect, useState } from 'react'
import FlexMovieItems from '../FlexMovieItems'
import { FaPlay, FaShareAlt } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import AuthContext from '../../context/AuthContext'
import { Button } from '@headlessui/react'
import { toast } from 'sonner'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import MyPlyrVideo, { TrailerVideo } from '../../Screens/MyPlyrVideo'
import axios from 'axios'
import Backend from '../../utils/Backend'
import movieTrailer from 'movie-trailer';


const MovieInfo = ({ movie }) => {
    const { pathname } = useLocation()
    const [trailer, setTrailer] = useState(null)



    async function getTrailer() {
        if (pathname.includes("/movie") && movie) {
            let url = `${Backend().BACKEND_URL}/itunes?search=${movie.title}`
            let headersList = {
                "Accept": "*/*",
                "Content-Type": 'application/json'
            }

            let reqOptions = {
                url: url,
                method: "GET",
                headers: headersList,
            }

            let response = await axios.request(reqOptions);
            if (response?.data?.results.length > 0) {
                let result = response.data.results.find((item) => item.trackName == movie.title && item.releaseDate.split("T")[0] == movie.releaseDetailed.date.split("T")[0])
                if (result) {
                    setTrailer(result.previewUrl)
                }

            }
            else {
                movieTrailer(movie.title, { multi: true, year: movie.year }).then((res) => {
                    console.log(res)
                    setTrailer(res)
                });
            }
        }
    }

    useEffect(() => {
        if (movie) {
            getTrailer(movie)

        }

    }, [pathname, movie])
    return movie && (
        <div style={{
            backgroundImage: `url('${movie.poster}')`,
        }} className='w-full xl:h-96 relative text-white'>
            {/* <LazyLoadImage src={movie.poster} alt={movie.title} title={movie.title} className='w-full hidden xl:inline-block h-100 object-cover' /> */}
            <div className="xl:bg-main bg-dry flex-colo xl:bg-opacity-90 xl:absolute top-0 left-0 right-0 bottom-0">
                <div className="container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-3 flex-colo py-1 lg:py-20 gap-8">
                    <div className="xl:col-span-1 w-full h-header bg-dry border border-gray-800 rounded-lg overflow-hidden">
                        {(pathname.includes("movie") && trailer) ? <TrailerVideo movie={movie} trailer={trailer} /> : <LazyLoadImage src={movie.poster} className='max-h-96 object-cover mx-auto' alt={movie.title} title={movie.title} />}
                    </div>
                    <div className="col-span-2 md:grid grid-cols-5 gap-4 items-center">
                        <div className="col-span-3 flex flex-col gap-10">
                            <h1 className='xl:text-3xl capitalize font-sans text-xl font-bold'>Preview: {movie.title} ({movie.year})</h1>
                            <div className="sm:col-span-2 col-span-3 flex justify-end font-medium text-sm">
                                <Link style={{ flexDirection: 'row' }} to={`/watch/${movie.title}`} className='bg-dry py-4 hover:bg-subMain transitions border-2 border-subMain rounded-full flex flex-rows gap-4 w-full sm:py-3'>
                                    <FaPlay className='w-3 h-3'></FaPlay> Start Watching</Link>

                            </div>
                            <div className="flex items-center gap-4 font-medium text-dryGray">
                                <div className="flex-colo bg-subMain text-xs px-2 py-1">720p</div>
                                <FlexMovieItems movie={movie && movie}></FlexMovieItems>
                            </div>
                            <p className='text-text text-sm leading-7'>{movie.plot}</p>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieInfo
