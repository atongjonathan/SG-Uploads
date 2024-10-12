import React, { useContext, useState } from 'react'
import Layout from '../Layout/Layout'
import { Link, useParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import MovieContext from '../Data/MovieContext'
import { FaCloud, FaHeart, FaPlay } from 'react-icons/fa'

const WatchPage = () => {
    let {id} = useParams()
    const {movies} = useContext(MovieContext)
    const movie = movies.find((movie)=>movie.title == id)
    const [play, setPlay] = useState(false)
  return (
    <Layout>
      <div className="container mx-auto bg-dry p-6 mb-12">
        <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6 ">
            <Link to={`/movie/${movie?.title}`} className='md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray'>     
                       <BiArrowBack></BiArrowBack> {movie?.title}
            </Link>
            <div className="flex-btn sm:w-auto w-full gap-5">
                <button className='bg-white hover:text-subMain transitions bg-opacity-30 text-white rounded px-4 py-3 text-sm'>
                    <FaHeart></FaHeart>
                </button>
                <button className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-8 font-medium py-3 text-sm">
                    <FaCloud></FaCloud> Download
                </button>
            </div>
        </div>
        {
            play? (
                <video  controls controlsList="nodownload" autoPlay={play} className='w-full h-full rounded' src='https://other-cecilia-atong-jonathan-04e43c80.koyeb.app/dl/670a0fcdb020015cf937cc7c'>
                    <source src='https://other-cecilia-atong-jonathan-04e43c80.koyeb.app/dl/670a0fcdb020015cf937cc7c' type='video/mp4' title={movie.title}/>
                    <track label="English" kind="subtitles" srcLang="en" src="/subs/LE SSERAFIM (르세라핌) 'Smart' OFFICIAL MV [KNexS61fjus].en.vtt" default></track>

                </video>

                ):(
                <div className="w-full h-screen rounded-lg overflow-hidden relative">
                    <div className="absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo">
                        <button onClick={()=> setPlay(true)} className='bg-white text-subMain flex-colo border border-subMain rounded-full w-20 h-20 font-medium text-xl'>
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
