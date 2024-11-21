import React, { useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { MovieContext } from "../../context/MovieContext";
import { BsCollectionFill } from "react-icons/bs";
import TrailerModal from "../../Screens/TrailerModal";


const TrailerSlider = ({ trailers, movie }) => {


    const { isLoading } = useContext(MovieContext)
    const [nextEl, setNextEl] = useState(null);
    const [prevEl, setPrevEl] = useState(null);


    const classNames = 'hover:bg-dry transitions text-sm rounded w-7 h-7 flex-colo bg-subMain text-white';

    return (
        <div className="my-16">
            <div className='w-full flex justify-between'>
                <div className="flex sm:gap-8 gap-4 items-center truncate">
                    <BsCollectionFill className="sm:w-6 sm:h-6 w-4 h-4 text-subMain"></BsCollectionFill>
                    <h2 className="sm:text-xl text-lg font-semibold truncate">More Videos</h2>
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
                        <SwiperSlide className="cursor-pointer" key={idx}>

                            {
                                isLoading ? <Skeleton baseColor="rgb(11 15 41)" containerClassName="animate-pulse" height={270}></Skeleton> :

                                        <TrailerModal movie={movie} trailer={trailer}></TrailerModal>


                            }

                        </SwiperSlide>

                    ))}
                </Swiper>

            </div>
        </div >
    );
};

export default TrailerSlider;
