import React, { useContext, useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import FlexMovieItems from "../FlexMovieItems";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import MovieContext from "../../Data/MovieContext";
import SGFaHeart from "../SGFaHeart";




const Banner = () => {

  const { movies } = useContext(MovieContext)

  return (
    <div className="relative w-full">
      <Swiper
        className="w-full xl:h-96 bg-dry lg:h-64 h-48"
        slidesPerView={1}
        loop={true}
        direction="horizontal"
        speed={1000}
        modules={[Autoplay]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}

      >
        {movies.slice(0, 6).map((movie, idx) => (
          <SwiperSlide key={idx} className="relative rounded overflow-hidden">
            <img
              src={movie.images[0]}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute linear-bg xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4">
              <h1 className="xl:text-4xl truncate capitalize font-sans sm:text-2xl text-xl font-bold">{movie.title}</h1>
              <div className="flex gap-5 items-center text-dryGray">
                <FlexMovieItems movie={movie}></FlexMovieItems>
              </div>
              <div className="flex gap-5 items-center">
                <Link
                  to={`/movie/${movie.title}`}
                  className="bg-subMain hover:text-main transitions text-white px-8 py-3 rounded font-medium sm:text-sm text-xs"
                >
                  Watch
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
