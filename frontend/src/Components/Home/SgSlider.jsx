import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Button } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../utils/Backend";
import Movie from "../Movie";
import { LazyLoadComponent } from 'react-lazy-load-image-component';


const SgSlider = ({ params, title, Icon, scrollPosition }) => {

  const dummy = [1, 2, 3, 4, 5, 6, 7];

  const { isFetching, data, isSuccess } = useQuery({
    queryKey: ["sliderQuery", params],
    queryFn: () => {
      return getMovies({
        params
      })
    },
    staleTime: Infinity
  })
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevEl] = useState(null);
  const [endDisabled, setEndDisabled] = useState(false);
  const [startDisabled, setStartDisabled] = useState(false); // Initially at the start
  const navigate = useNavigate();

  let movies = []

  if (isFetching) {
    movies = dummy;
  }
  else if (data) {
    movies = data?.results
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

  const visibleTitles = ["Recently Added", "Latest Release"]



  return (
    <LazyLoadComponent scrollPosition={scrollPosition} visibleByDefault={visibleTitles.includes(title)}>
      <div className="lg:mt-8 mt-5">
        <div className="w-full flex justify-between">
          <div className="flex sm:gap-3 gap-2 items-center truncate">
            {
              isFetching ? <Skeleton /> : isSuccess && <>
                <Icon className="sm:w-5 sm:h-6 w-4 h-4 text-subMain" />
                <h2 className="text-sm font-semibold truncate">{title}</h2></>
            }

          </div>

          <div className="px-2 flex justify-center gap-2">
            <Button
              className={`transition duration-100 ease-in text-sm rounded-lg w-7 h-7 flex-colo text-white ${startDisabled ? "bg-dry" : "bg-subMain active:bg-dry"
                }`}
              ref={(node) => setPrevEl(node)}
              disabled={startDisabled}
            >
              <FaArrowLeft />
            </Button>
            <Button
              className={`transition duration-100 ease-in text-sm rounded-lg w-7 h-7 flex-colo text-white ${endDisabled ? "bg-dry" : "bg-subMain active:bg-dry"
                }`}
              ref={(node) => setNextEl(node)}
              disabled={endDisabled}
            >
              <FaArrowRight />
            </Button>
          </div>
        </div>

        <div className="mt-3">
          <Swiper id={title}
            navigation={{ nextEl, prevEl }}
            slidesPerView={3}
            spaceBetween={5}
            speed={500}
            className=""
            modules={[Navigation]}
            onSlideChange={onSlideChange} // Trigger this on every slide change
            onReachEnd={handleSliderChange} // End reached
            onReachBeginning={handleSliderChange} // Beginning reached
            onSwiper={(swiper) => {
              const isBeginning = swiper.isBeginning;
              const isEnd = swiper.isEnd;
              handleSliderChange(isBeginning, isEnd); // Assuming first param = atEnd, second = atStart
            }}
            breakpoints={{
              0: {
                slidesPerView: 3,
                spaceBetween: 10,
              },

              768: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
              992: {
                slidesPerView: 7,
                spaceBetween: 10,
              }


            }}
          >
            {movies.map((movie, idx) => (
              <SwiperSlide
                className="cursor-pointer"
                key={idx}
                onClick={() => navigate(`/watch/${movie.id}`)}

              >
                {isFetching ? (
                  <Skeleton
                    baseColor="rgb(11 15 41)"
                    className="rounded-lg w-full aspect-[216/319]"
                  />
                ) : (

                  <Movie movie={movie} />

                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </LazyLoadComponent>
  )

};

export default SgSlider;
