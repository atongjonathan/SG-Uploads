import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { MovieContext } from "../../context/MovieContext";
import TrailerModal from "../Modals/TrailerModal";
import { Button } from "@headlessui/react";


const TrailerSlider = ({ trailers, movie }) => {


    const { isLoading } = useContext(MovieContext)
    const [nextEl, setNextEl] = useState(null);
    const [prevEl, setPrevEl] = useState(null);

    const [endDisabled, setEndDisabled] = useState(false)
    const [startDisabled, setStartDisabled] = useState(true)

    function handleSliderChange(start, end) {
        if (end) {
          setEndDisabled(true)
        }
        else {
          setEndDisabled(false)
        }
        if (start) {
          setStartDisabled(true)
        }
        else {
          setStartDisabled(false)
        }
      }

    return trailers && (
        <div className="mt-5">
            <div className='w-full flex justify-between'>
                <div className="flex sm:gap-8 gap-4 items-center truncate">
                    <h2 className="text-lg font-semibold truncate">More Videos
                        {
                            trailers.length > 0 && <span> ({trailers.length})</span>
                        }   </h2>
                </div>
                <div className="px-2 flex justify-center gap-2">
                    <Button className={`transitions text-sm rounded w-7 h-7 flex-colo text-white ${startDisabled ? 'bg-dry' : 'bg-subMain hover:bg-dry'}`} ref={(node) => setPrevEl(node)} disabled={startDisabled}>
                        <FaArrowLeft />
                    </Button>
                    <Button className={`transitions text-sm rounded w-7 h-7 flex-colo text-white ${endDisabled ? 'bg-dry' : 'bg-subMain hover:bg-dry'}`} ref={(node) => setNextEl(node)} disabled={endDisabled}>
                        <FaArrowRight />
                    </Button>
                </div>



            </div>
            {
                trailers.length == 0 ? <Skeleton baseColor="rgb(22 28 63)" containerClassName="animate-pulse" className='my-3 animate-pulse' height={120}></Skeleton>
                    :
                    <div className="mt-5">
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={40}
                            autoPlay={true}
                            speed={500}
                            modules={[Navigation, Autoplay]}
                            navigation={{ nextEl, prevEl }}
                            onReachEnd={() => handleSliderChange(false, true)}
                            onReachBeginning={() => handleSliderChange(true, false)}
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
                                        spaceBetween: 30
                                    },
                                }
                            }
                        >
                            {trailers?.map((trailer, idx) => (
                                <SwiperSlide className="cursor-pointer h-fit" key={idx}>

                                    {
                                        isLoading ? <Skeleton baseColor="rgb(11 15 41)" containerClassName="animate-pulse" height={270}></Skeleton> :

                                            <TrailerModal movie={movie} trailer={trailer}></TrailerModal>


                                    }

                                </SwiperSlide>

                            ))}
                        </Swiper>

                    </div>
            }

        </div >
    );
};

export default TrailerSlider;
