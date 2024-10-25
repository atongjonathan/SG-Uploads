import React, { useContext, useState } from 'react'
import FlexMovieItems from '../FlexMovieItems'
import { FaPlay, FaShareAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import { useUser } from '../../utils/SWR'
import AuthContext from '../../context/AuthContext'
import { Button } from '@headlessui/react'
import { toast } from 'sonner'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const MovieInfo = ({ movie }) => {
    const { authTokens } = useContext(AuthContext)
    const user = useUser(authTokens?.access)
    return movie && (
        <div className='w-full xl:h-screen relative text-white'>
            <LazyLoadImage src={movie.poster} alt={movie.title} className='w-full hidden xl:inline-block h-full object-cover' />
            <div className="xl:bg-main bg-dry flex-colo xl:bg-opacity-90 xl:absolute top-0 left-0 right-0 bottom-0">
                <div className="container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-3 flex-colo py-1 lg:py-20 gap-8">
                    <div className="xl:col-span-1 w-full h-header bg-dry border border-gray-800 rounded-lg overflow-hidden">
                        <LazyLoadImage src={movie.poster} alt={movie.title} />
                    </div>
                    <div className="col-span-2 md:grid grid-cols-5 gap-4 items-center">
                        <div className="col-span-3 flex flex-col gap-10">
                            <h1 className='xl:text-4xl capitalize font-sans text-2xl font-bold'>{movie.title}</h1>
                            <div className="flex items-center gap-4 font-medium text-dryGray">
                                <div className="flex-colo bg-subMain text-xs px-2 py-1">720p</div>
                                <FlexMovieItems movie={movie && movie}></FlexMovieItems>
                            </div>
                            <p className='text-text text-sm leading-7'>{movie.plot}</p>
                            <div className="grid sm:grid-cols-5 grid-cols-3 gap-4 p-6 bg-main border border-gray-800 rounded-lg">
                                <div className="col-span-1 flex-colo border-r border-border">
                                    <button className="w-10 h-10 flex-colo rounded-lg bg-white bg-opacity-20"><FaShareAlt /></button>

                                </div>
                                <div className="col-span-2 flex-colo font-medium text-sm">
                                    <p>Language: {' '} <span className='ml-2 truncate'>{movie.spokenLanguages[0].language}</span></p>
                                </div>
                                <div className="sm:col-span-2 col-span-3 flex justify-end font-medium text-sm">
                                    <Link style={{ flexDirection: 'row' }} to={`/watch/${movie.title}`} className='bg-dry py-4 hover:bg-subMain transitions border-2 border-subMain rounded-full flex flex-rows gap-4 w-full sm:py-3'>
                                        <FaPlay className='w-3 h-3'></FaPlay> Watch</Link>

                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 md:mt-0 mt-2 flex justify-end">
                            {
                                user ?
                                    (
                                        <Link to={movie.stream.replace('video', 'dl')}  className='md:w-1/4 w-full relative flex-colo bg-subMain hover:bg-transparent border-2 border-subMain transitions md:h-64 h-20 rounded font-medium'>
                                            <div style={{ flexDirection: 'row' }} className="flex-rows gap-4 text-md uppercase tracking-widest absolute md:rotate-90">
                                                Download <FiLogIn className='w-6 h-6' /></div>
                                        </Link>) : (
                                        <Button onClick={() => toast("Only logged in users can download",{closeButton:true}) } className='md:w-1/4 w-full relative flex-colo bg-subMain hover:bg-transparent border-2 border-subMain transitions md:h-64 h-20 rounded font-medium'>
                                            <div style={{ flexDirection: 'row' }} className="flex-rows gap-4 text-md uppercase tracking-widest absolute md:rotate-90">
                                                Download <FiLogIn className='w-6 h-6' /></div>
                                        </Button>
                                    )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieInfo
