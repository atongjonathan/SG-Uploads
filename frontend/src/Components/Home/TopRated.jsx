import React, { useState } from "react";
import Titles from "../Titles";
import { BsBookmarkStarFill, BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";
import Rating from "../Star";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaHeart } from "react-icons/fa";


const TopRated = ({ movies }) => {
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevEl] = useState(null);
  const navigate = useNavigate()
  let topRated = []
  if (movies) {
    topRated = movies.sort((a, b) => b.rating.star - a.rating.star)
  }


  const classNames = 'hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white';



  return movies && (
    <div className="my-16">
      <Titles title="Top Rated" Icon={BsBookmarkStarFill} />
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
            <SwiperSlide className="cursor-pointer" key={idx} onClick={() => navigate(`/movie/${movie.title}`)}>
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
                <div className="h-1/5 flex-colo gap-1 py-1 text-center absolute bg-black bg-opacity-70 left-0 right-0 bottom-0 opacity-100 transition duration-300">
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
        <div className="w-full px-1 flex justify-center gap-6 pt-12">
          <button className={classNames} ref={(node) => setPrevEl(node)}>
            <BsCaretLeftFill />
          </button>
          <button className={classNames} ref={(node) => setNextEl(node)}>
            <BsCaretRightFill />
          </button>
        </div>
      </div>
    </div >
  );
};

export default TopRated;
