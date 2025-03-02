import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { MovieContext } from "../../context/MovieContext";
import TrailerModal from "../Modals/TrailerModal";
import { Button } from "@headlessui/react";


const Characters = ({ casts }) => {


    const { isLoading } = useContext(MovieContext)
    const [nextEl, setNextEl] = useState(null);
    const [prevEl, setPrevEl] = useState(null);

    const [endDisabled, setEndDisabled] = useState(false)
    const [startDisabled, setStartDisabled] = useState(true)
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

    return casts && (
        <div className="mt-5">
            <div className='w-full flex justify-between'>
                <div className="flex sm:gap-8 gap-4 items-center truncate">
                    <h2 className="text-lg font-semibold truncate">Cast
                          </h2>
                </div>
                {/* <div className="px-2 flex justify-center gap-2">
                    <Button className={`transitions text-sm rounded w-7 h-7 flex-colo text-white ${startDisabled ? 'bg-dry' : 'bg-subMain active:bg-dry'}`} ref={(node) => setPrevEl(node)} disabled={startDisabled}>
                        <FaArrowLeft />
                    </Button>
                    <Button className={`transitions text-sm rounded w-7 h-7 flex-colo text-white ${endDisabled ? 'bg-dry' : 'bg-subMain active:bg-dry'}`} ref={(node) => setNextEl(node)} disabled={endDisabled}>
                        <FaArrowRight />
                    </Button>
                </div> */}



            </div>
            {
                casts.length == 0 ? <Skeleton baseColor="rgb(22 28 63)" containerClassName="animate-pulse" className='my-3 animate-pulse' height={120}></Skeleton>
                    :
                    <div className="mt-5">
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={40}
                            autoPlay={true}
                            speed={500}
                            modules={[Navigation, Autoplay]}
                            navigation={{ nextEl, prevEl }}
                            onSlideChange={onSlideChange}
                            onReachEnd={() => handleSliderChange(false, true)}
                            onReachBeginning={() => handleSliderChange(true, false)}
                            breakpoints={
                                {
                                    0: {
                                        slidesPerView: 2,
                                        spaceBetween: 10
                                    },
                                    768: {
                                        slidesPerView: 4,
                                        spaceBetween: 20
                                    },
                                  
                                }
                            }
                        >
                            {casts?.map((cast, idx) => (
                                <SwiperSlide className="cursor-pointer h-fit" key={idx}>

                                    {
                                        isLoading ? <Skeleton baseColor="rgb(11 15 41)" containerClassName="animate-pulse" height={270}></Skeleton> :

                                            <div className="flex flex-col gap-2">
                                               
                                                <div className="flex flex-wrap gap-3">
                                                    <div title={`${cast.character} - ${cast.original_name}`} className="w-full flex gap-1 h-20 rounded-xl overflow-hidden bg-white/10 hover:bg-white/5 smoothie shrink-0">
                                                        <div className="h-full flex rounded-xl overflow-hidden shrink-0">
                                                            <span className=" lazy-load-image-background opacity lazy-load-image-loaded" >
                                                                <img width="100%" height="100%" src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`} className="size-full object-cover object-center !select-none shrink-0 undefined" /></span>
                                                        </div>
                                                        <div className="flex flex-col px-2 pt-1 flex-grow shrink">
                                                            <span className="tracking-wider font-medium text-[.85rem] text-gray-200 !line-clamp-2 !leading-tight">{cast.character}</span>
                                                            <span className="tracking-wider text-gray-300 my-auto text-[.85rem] !line-clamp-2 !leading-tight">{cast.original_name}</span>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>


                                    }

                                </SwiperSlide>

                            ))}
                        </Swiper>

                    </div>
            }

        </div >
    );
};

export default Characters;
