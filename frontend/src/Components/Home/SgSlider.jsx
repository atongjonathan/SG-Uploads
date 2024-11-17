import React, { useContext, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { BsBookmarkStarFill, BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";
import Rating from "../Star";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import Movie from '../Movie'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { MovieContext } from "../../context/MovieContext";


const SgSlider = ({ movies, title, Icon }) => {


  const dummy = [1, 2, 3, 4, 5, 6]
  const { isLoading } = useContext(MovieContext)
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevEl] = useState(null);
  const navigate = useNavigate()

  if (isLoading) {
    movies = dummy
  }

  const classNames = 'hover:bg-dry transitions text-sm rounded w-7 h-7 flex-colo bg-subMain text-white';

  return movies && (
    <div className="my-16">
      <div className='w-full flex justify-between'>
        <div className="flex sm:gap-8 gap-4 items-center truncate">
          <Icon className="sm:w-6 sm:h-6 w-4 h-4 text-subMain"></Icon>
          <h2 className="sm:text-xl text-lg font-semibold truncate">{title}</h2>
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
          {movies?.slice(0, 6).sort(() => .5 - Math.random()).map((movie, idx) => (
            <SwiperSlide className="cursor-pointer" key={idx} onClick={() => navigate(`/watch/${movie.title}`)}>

              {
                isLoading ? <Skeleton baseColor="rgb(11 15 41)" containerClassName="animate-pulse" height={270}></Skeleton> :
                  <div className="relative group p-4 h-rate border border-border bg-dry rounded-lg overflow-hidden">
                    {/* Movie Poster */}

                    <div className="hover:scale-95 transitions relative rounded overflow-hidden">
                      <Link to={`/watch/${movie.title}`} className="w-full">

                        <LazyLoadImage effect="blur" wrapperProps={{
                          style: { transitionDelay: "0.6s" },
                        }} src={movie.poster} alt={movie.title} title={movie.title} className="w-full h-h-rate object-cover" />


                      </Link>
                      <div className="absolute flex flex-col gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
                        <h6 className="font-semibold truncate">{movie.title}</h6>
                        <div className="flex gap-2 text-star">
                          <Rating value={movie.rating.star / 2} />
                        </div>
                      </div>
                    </div>

                    {/* Overlay Content */}

                  </div>
              }

            </SwiperSlide>

          ))}
        </Swiper>

      </div>
    </div >
  );
};

export default SgSlider;
