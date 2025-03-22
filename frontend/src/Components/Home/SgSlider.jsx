import React, { useContext, useEffect, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";
import Rating from "../Star";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { MovieContext } from "../../context/MovieContext";
import { Button } from "@headlessui/react";
import loader from '../../../images/loading_image.gif'


const SgSlider = ({ movies, title, Icon }) => {
  useEffect(() => {
    handleSliderChange(true, false); // Initial setup, assuming we're not at the start
  }, []);

  const dummy = [1, 2, 3, 4, 5, 6];
  const { isLoading } = useContext(MovieContext);
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevEl] = useState(null);
  const [endDisabled, setEndDisabled] = useState(false);
  const [startDisabled, setStartDisabled] = useState(true); // Initially at the start
  const navigate = useNavigate();

  if (isLoading) {
    movies = dummy;
  }

  // Reset button states based on slider position
  const handleSliderChange = (start, end) => {
    if (end) {
      setEndDisabled(true);
      setStartDisabled(false); // Reset startDisabled when reaching the end
    } else if (start) {
      setStartDisabled(true);
      setEndDisabled(false); // Reset endDisabled when reaching the start
    } else {
      setStartDisabled(false);
      setEndDisabled(false); // Neither start nor end
    }
  };

  // Handle slide change to reset button states
  const onSlideChange = (swiper) => {
    const isAtStart = swiper.isBeginning;
    const isAtEnd = swiper.isEnd;

    if (isAtStart && !isAtEnd) {
      handleSliderChange(true, false); // At the beginning
    } else if (isAtEnd && !isAtStart) {
      handleSliderChange(false, true); // At the end
    } else {
      handleSliderChange(false, false); // Neither at start nor end
    }
  };

  return (
    <div className="lg:my-16 my-7">
      <div className="w-full flex justify-between">
        <div className="flex sm:gap-8 gap-4 items-center truncate">
          <Icon className="sm:w-6 sm:h-6 w-4 h-4 text-subMain" />
          <h2 className="sm:text-xl text-lg font-semibold truncate">{title}</h2>
        </div>

        <div className="px-2 flex justify-center gap-2">
          <Button
            className={`transition duration-100 ease-in text-sm rounded w-7 h-7 flex-colo text-white ${startDisabled ? "bg-dry" : "bg-subMain active:bg-dry"
              }`}
            ref={(node) => setPrevEl(node)}
            disabled={startDisabled}
          >
            <FaArrowLeft />
          </Button>
          <Button
            className={`transition duration-100 ease-in text-sm rounded w-7 h-7 flex-colo text-white ${endDisabled ? "bg-dry" : "bg-subMain active:bg-dry"
              }`}
            ref={(node) => setNextEl(node)}
            disabled={endDisabled}
          >
            <FaArrowRight />
          </Button>
        </div>
      </div>

      <div className="lg:mt-10 mt-7">
        <Swiper
          navigation={{ nextEl, prevEl }}
          slidesPerView={3}
          spaceBetween={40}
          speed={500}
          modules={[Navigation]}
          onSlideChange={onSlideChange} // Trigger this on every slide change
          onReachEnd={() => handleSliderChange(false, true)} // End reached
          onReachBeginning={() => handleSliderChange(true, false)} // Beginning reached
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            576: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1400: {
              slidesPerView: 6,
              spaceBetween: 20,
            },

          }}
        >
          {movies?.slice(0, 11).map((movie, idx) => (
            <SwiperSlide
              className="cursor-pointer"
              key={idx}
              onClick={() => navigate(`/watch/${movie.id}`)}
            >
              {isLoading ? (
                <Skeleton
                  baseColor="rgb(11 15 41)"
                  containerClassName="animate-pulse"
                  height={270}
                />
              ) : (
                <div className="relative group p-4 border border-border bg-dry rounded-lg overflow-hidden">
                  {/* Movie Poster */}
                  <div className="hover:scale-95 transitions relative rounded overflow-hidden">
                    <Link to={`/watch/${movie.id}`} className="w-full">
                      <LazyLoadImage placeholderSrc={loader} effect="blur" src={movie.poster} alt={movie.title} title={movie.title} className="w-full aspect-[216/319]" />
                    </Link>
                    <div className="absolute flex flex-col gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white py-3 items-center">
                      <h6 className="font-semibold line-clamp-1">{movie.title}</h6>
                      <div className="flex gap-2 text-star line-clamp-1">
                        <Rating value={movie.rating.star / 2} />
                      </div>
                    </div>
                  </div>
                  {/* Overlay Content */}
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )

};

export default SgSlider;
