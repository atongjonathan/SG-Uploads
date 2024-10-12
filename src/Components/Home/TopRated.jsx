import React, { useContext, useState } from "react";
import Titles from "../Titles";
import { BsBookmarkStarFill, BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Rating from "../Star";
import MovieContext from "../../Data/MovieContext";

const TopRated = () => {
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevEl] = useState(null);

  const { movies } = useContext(MovieContext)

  const classNames = 'hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white';



  return (
    <div className="my-16">
      <Titles title="Top Rated" Icon={BsBookmarkStarFill} />
      <div className="mt-10">
        <Swiper
          navigation={{ nextEl, prevEl }}
          slidesPerView={3}
          spaceBetween={40}
          autoplay={true}
          speed={1000}
          loop={true}
          modules={[Navigation, Autoplay]}
          breakpoints={
            {
              0: {
                slidesPerView: 1,
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
                slidesPerView: 4,
                spaceBetween: 40
              },
            }
          }
        >
          {movies.map((movie, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative group p-4 h-rate border border-border bg-dry rounded-lg overflow-hidden">
                {/* Movie Poster */}
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-lg"
                />

                {/* Overlay Content */}
                <div className="px-4 flex-colo gap-6 text-center absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 transitions duration-300">
                  {/* Like Button */}
                  <button className="w-12 h-12 flex-colo transitions hover:bg-subMain rounded-full bg-white bg-opacity-30 text-white">
                    <FaHeart />
                  </button>

                  {/* Movie Title */}
                  <Link
                    to={`/movie/${movie.title}`}
                    className="font-semibold text-xl truncated line-clamp-2"
                  >
                    {movie.title}
                  </Link>

                  {/* Rating */}
                  <div className="flex gap-2 text-star">
                    <Rating value={movie.rating.star / 2} />
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
