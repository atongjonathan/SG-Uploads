import React from 'react'
import { Link } from "react-router-dom";
import SGFaHeart from '../SGFaHeart'
import { BiPlay } from "react-icons/bi";
import FlexMovieItems from "../FlexMovieItems";


const BannerItem = ({movie}) => {
    return (
        <>
            {/* Small Screen */}
            <img
                src={movie.poster}
                alt={movie.title} title={movie.title}
                className="w-full md:hidden max-h-100 object-cover"
            />


            {/* Large Screen */}
            <div style={{
                background: `url('${movie?.poster}'`,
                animation: 'pulse 7s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }} className={`w-full md:inline-block hidden h-full object-cover blur-lg relative animate-pulse`}>

            </div>



            <img style={{
                height: '140%',
                bottom: '-81px'
            }}
                src={movie?.poster}
                alt={movie.title} title={movie.title}
                className="absolute right-28 z-10 object-contain w-100 rotate-12 hidden md:inline-block "
            />
            <div className="lg:w-7/12 absolute linear-bg xl:pl-32 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4 z-20 md:h-96 min-h-80 ">
                <h1 className="xl:text-4xl truncate capitalize font-sans sm:text-2xl text-xl font-bold">{movie.title}</h1>


                <div className="flex gap-5 items-center text-dryGray">
                    <FlexMovieItems movie={movie}/>


                </div>

                <p className='text-white/90 text-sm text-left bg-main/10 py-3 px-1'>{movie.plot}</p>


                <div className="flex gap-5 items-center">

                    <Link
                        to={`/watch/${movie.id}`}
                        className="bg-subMain hover:bg-main border-subMain transitions text-white px-8 py-3 rounded font-medium sm:text-sm text-xs flex justify-center items-center"
                    >
                        <BiPlay className="w-5 h-5 mx-auto"></BiPlay>
                        Watch
                    </Link>

                    <SGFaHeart movie={movie}></SGFaHeart>



                </div>
            </div>
        </>
    )
}

export default BannerItem
