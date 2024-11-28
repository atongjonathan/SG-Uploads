import React, { useContext } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import FlexMovieItems from "../FlexMovieItems";
import { Link } from "react-router-dom";
import SGFaHeart from '../SGFaHeart'
import { BiPlay } from "react-icons/bi";
import Skeleton from 'react-loading-skeleton'
import { MovieContext } from "../../context/MovieContext";
import 'swiper/css';
import 'swiper/css/effect-fade';

const Banner = ({ movies }) => {

  let { isLoading } = useContext(MovieContext)

  return (
    <>
      {
        isLoading ?
          <div className="relative w-full">
            <div className="relative rounded-xl h-72 py-10 overflow-hidden bg-dry z-10">
              <div className="h-96"></div>

              <div className="lg:w-7/12 absolute linear-bg xl:pl-32 sm:pl-32 px-3 top-0 bottom-0 right-0 left-0 flex flex-col lg:pt-2 pt-10  lg:gap-7 md:gap-5 gap-4 z-20 md:h-96 min-h-80 max-h-96  rounded-xl">
                <Skeleton baseColor="rgb(22 28 63)" height={30} containerClassName="animate-pulse"></Skeleton>


                <div className="flex gap-5 items-center text-dryGray">
                  <Skeleton baseColor="rgb(22 28 63)" height={30} width={300} containerClassName="animate-pulse"></Skeleton>


                </div>
                <Skeleton baseColor="rgb(22 28 63)" height={70} containerClassName="animate-pulse"></Skeleton>


                <div className="flex gap-5 items-center">
                  <Skeleton baseColor="rgb(22 28 63)" height={35} width={100} containerClassName="animate-pulse"></Skeleton>



                  <Skeleton baseColor="rgb(22 28 63)" height={35} width={50} containerClassName="animate-pulse"></Skeleton>



                </div>
              </div>
            </div>
          </div>
          :
          <div className="relative w-full">

            <Swiper
              className="w-full md:h-96 min-h-80 max-h-96 bg-dry"
              slidesPerView={1}
              loop
              direction="horizontal"
              speed={1000}
              grabCursor
              keyboard
              modules={[Autoplay, EffectFade]}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
            >

              {
                movies?.slice(0, 6).sort(() => .5 - Math.random()).map((movie, idx) => (
                  <SwiperSlide key={idx} className="relative rounded-xl overflow-hidden">
                    <img
                      src={movie.poster}
                      alt={movie.title} title={movie.title}
                      className="w-full md:hidden h-100 object-contain"
                    />
                    <div style={{
                      background: `url('${movie?.poster}'`
                    }} className={`w-full md:inline-block hidden h-full object-cover blur-lg relative rounded-xl`}>

                    </div>


                    <img style={{
                      height: '140%',
                      bottom: '-81px'
                    }}
                      src={movie?.poster}
                      alt={movie.title} title={movie.title}
                      className="absolute right-28 z-10 object-contain w-100 rotate-12 hidden md:inline-block "
                    />
                    <div className="lg:w-7/12 absolute linear-bg xl:pl-32 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4 z-20 md:h-96 min-h-80 max-h-96  rounded-xl">
                      <h1 className="xl:text-4xl truncate capitalize font-sans sm:text-2xl text-xl font-bold">{movie.title}</h1>


                      <div className="flex gap-5 items-center text-dryGray">
                        <FlexMovieItems movie={movie}></FlexMovieItems>


                      </div>

                      <p className='text-white/90 text-sm text-left bg-main/10 py-3 px-1'>{movie.plot}</p>


                      <div className="flex gap-5 items-center">

                        <Link
                          to={`/watch/${movie.title}`}
                          className="bg-subMain hover:bg-main border-subMain transitions text-white px-8 py-3 rounded font-medium sm:text-sm text-xs flex justify-center items-center"
                        >
                          <BiPlay className="w-5 h-5 mx-auto"></BiPlay>
                          Watch
                        </Link>

                        <SGFaHeart movie={movie}></SGFaHeart>



                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>

          </div>
      }
    </>


  );
};

export default Banner;
