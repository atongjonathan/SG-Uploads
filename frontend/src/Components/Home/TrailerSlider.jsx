import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TrailerModal from "../Modals/TrailerModal";
import { Button } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { getTrailers } from "../../utils/Backend";

// Helper to sort trailers with "Trailer" type first


const TrailerSlider = ({ movie }) => {
  const split = movie?.link?.split("/") || [];
  const tmdb_id = split[split.length - 1];

  const { isFetching, data, error } = useQuery({
    queryKey: ["trailerQuery", tmdb_id],
    queryFn: () => getTrailers(tmdb_id),
    enabled: !!tmdb_id,
  });

  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevEl] = useState(null);
  const [startDisabled, setStartDisabled] = useState(true);
  const [endDisabled, setEndDisabled] = useState(false);

  const handleSliderChange = (atStart, atEnd) => {
    setStartDisabled(!!atStart);
    setEndDisabled(!!atEnd);
  };

  const onSlideChange = (swiper) => {
    handleSliderChange(swiper.isBeginning, swiper.isEnd);
  };

  return (
    <div className="mt-5">
      {
        data &&
        <div className="w-full flex justify-between items-center">
          <h2 className="text-lg font-semibold truncate">
            More Videos
            <span> {(`(${data?.length})`)}</span>
          </h2>

          <div className="flex gap-2">
            <Button
              className={`transition text-sm rounded w-7 h-7 flex items-center justify-center text-white ${startDisabled ? "bg-dry" : "bg-subMain active:bg-dry"
                }`}
              ref={setPrevEl}
              disabled={startDisabled}
            >
              <FaArrowLeft />
            </Button>
            <Button
              className={`transition text-sm rounded w-7 h-7 flex items-center justify-center text-white ${endDisabled ? "bg-dry" : "bg-subMain active:bg-dry"
                }`}
              ref={setNextEl}
              disabled={endDisabled}
            >
              <FaArrowRight />
            </Button>
          </div>

        </div>
      }

      {isFetching ? (
        <Skeleton
          baseColor="rgb(22 28 63)"
          containerClassName="animate-pulse my-3"
          height={120}
        />
      ) : (
        <div className="mt-5">
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            speed={500}
            navigation={{ nextEl, prevEl }}
            onSlideChange={onSlideChange}
            onReachEnd={() => handleSliderChange(false, true)}
            onReachBeginning={() => handleSliderChange(true, false)}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 10 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 4, spaceBetween: 30 },
            }}
          >
            {data?.map((trailer, idx) => (
              <SwiperSlide key={idx} className="cursor-pointer h-fit">
                <TrailerModal movie={movie} trailer={trailer} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default TrailerSlider;
