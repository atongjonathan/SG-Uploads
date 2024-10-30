import React from "react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import FlexMovieItems from "../FlexMovieItems";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaHeart } from "react-icons/fa";
import SGFaHeart from  '../SGFaHeart'
import { BiPlay } from "react-icons/bi";


const Banner = ({ movies }) => {

  let latest = []
  if (movies) {
    latest = movies.sort((a, b) => new Date(b.releaseDetailed.date) - new Date(a.releaseDetailed.date))

  }

  return movies && (
    <div className="relative w-full">
      <Swiper
        className="w-full md:h-96 min-h-80 max-h-96 bg-dry"
        slidesPerView={1}
        loop={true}
        direction="horizontal"
        speed={1000}
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}

      >
        {latest?.slice(0, 6).sort(() => .5 - Math.random()).map((movie, idx) => (
          <SwiperSlide key={idx} className="relative rounded overflow-hidden">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full md:hidden h-100 object-contain"
            />
            <div style={{
              background: `url('${movie?.poster}'`
            }} className={`w-full md:inline-block hidden h-full object-cover blur-lg relative`}>

            </div>
            <img style={{
              height: '130%',
              bottom:'-80px'
            }}
              src={movie?.poster}
              alt={movie.title}
              className="absolute right-36 z-10 object-contain w-100 rotate-12 hidden md:inline-block "
            />
            <div className="lg:w-7/12 absolute linear-bg xl:pl-32 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4 z-20 md:h-96 min-h-80 max-h-96">
              <h1 className="xl:text-4xl truncate capitalize font-sans sm:text-2xl text-xl font-bold">{movie.title}</h1>
              <div className="flex gap-5 items-center text-dryGray">
                <FlexMovieItems movie={movie}></FlexMovieItems>
              </div>
              <p className='text-text text-sm text-left'>{movie.plot}</p>
              <div className="flex gap-5 items-center">
                <Link
                  to={`/movie/${movie.title}`}
                  className="bg-subMain hover:bg-main border-subMain transitions text-white px-8 py-3 rounded font-medium sm:text-sm text-xs flex"
                >
                  <BiPlay className="w-5 h-5"></BiPlay>
                  Watch Now
                </Link>
                <SGFaHeart movie={movie}></SGFaHeart>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
