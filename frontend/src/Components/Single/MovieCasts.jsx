import React from 'react'
import { FaUserFriends } from 'react-icons/fa'
import { Autoplay } from 'swiper/modules'
import { SwiperSlide, Swiper } from 'swiper/react'
import Titles from '../Titles'


const MovieCasts = ({movie}) => {
  return movie && (
    <div className="my-12">
        <Titles title="Casts" Icon={FaUserFriends}></Titles>
        <div className="mt-10">
          <Swiper Autoplay={{
            display: 100,
            disableOnInteration: false,
          }} loop={true} speed={1000} modules={[Autoplay]} spaceBetween={10}
          breakpoints={
            {
              0:{
                slidesPerView:1,
              },
              400:{
                slidesPerView:2,  
              },
              768:{
                slidesPerView:3,
              },
              1024:{
                slidesPerView:4,
              },
              1280:{
                slidesPerView: 5
              }
              
            }
          }>

            {
              movie?.actors?.map((actor, i)=> (
                <SwiperSlide key={i}>
                  <div className="w-full p-3 italic text-xs text-text rounded flex-colo bg-dry border border-gray-800">
                    <img src={movie.poster} alt={actor} className='w-full h-64 object-cover rounded mb-4' />
                    <p>{actor}</p>  
                  </div>  
                </SwiperSlide>  
              ))
            }
          </Swiper>
        </div>
      </div>
  )
}

export default MovieCasts
