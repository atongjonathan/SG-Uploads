import React, { useState } from "react";
import Titles from "../Titles";
import { BsBookmarkStarFill, BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";
import Rating from "../Star";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaArrowRight, FaHeart } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";


const TopRated = ({ movies }) => {
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevEl] = useState(null);
  const navigate = useNavigate()
  let topRated = []
  if (movies) {
  }


  const classNames = 'hover:bg-dry transitions text-sm rounded w-7 h-7 flex-colo bg-subMain text-white';



  return movies && (
    <div className="my-16">
      <div className='w-full flex justify-between'>
        <div className="flex sm:gap-8 gap-4 items-center">
          <BsBookmarkStarFill className="sm:w-6 sm:h-6 w-4 h-4 text-subMain"></BsBookmarkStarFill>
          <h2 className="sm:text-xl font-bold text-lg">Top Rated</h2>
        </div>


        <div className="px-2 flex justify-center gap-2">
          <button className={classNames} ref={(node) => setPrevEl(node)}>
            <FaArrowLeft />
          </button>
          <button className={classNames} ref={(node) => setNextEl(node)}>
            <FaArrowRight />
          </button>
        </div>
      </div>
      <div className="mt-10">
        <Swiper
          navigation={{ nextEl, prevEl }}
          slidesPerView={3}
          spaceBetween={40}
          autoPlay={true}
          speed={1000}
          loop={true}
          modules={[Navigation, Autoplay]}
          breakpoints={
            {
              0: {
                slidesPerView: 2,
                spaceBetween: 10
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 30
              },
            }
          }
        >
          {topRated?.slice(0, 6).sort(() => .5 - Math.random()).map((movie, idx) => (
            <SwiperSlide className="cursor-pointer" key={idx} onClick={() => navigate(`/watch/${movie.title}`)}>
              <div className="relative group p-4 h-rate border border-border bg-dry rounded-lg overflow-hidden">
                {/* Movie Poster */}
                <LazyLoadImage
                  effect="blur"
                  wrapperProps={{
                    style: { transitionDelay: "0.6s" },
                  }}
                  src={movie.poster}
                  alt={movie.title} title={movie.title}
                  className="w-full h-full object-cover rounded-lg"
                />

                {/* Overlay Content */}
                <div style={{
                  boxSizing: 'border-box',
                  height: '25%'

                }} className="flex-colo gap-1 py-2 text-center absolute bg-black bg-opacity-70 left-0 right-0 bottom-0 opacity-100 transition duration-300">
                  {/* Rating */}
                  <div className="flex gap-2 text-star">
                    <Rating value={movie.rating.star / 2} />
                  </div>

                  {/* Movie Title */}
                  <div
                    className="text-md line-clamp-2 truncate"
                  >
                    {movie.title}
                  </div>


                </div>
              </div>
            </SwiperSlide>

          ))}
        </Swiper>
     
      </div>
    </div >
  );
};

export default TopRated;
