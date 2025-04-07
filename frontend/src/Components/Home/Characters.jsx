import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useQuery } from "@tanstack/react-query";
import { getCast } from "../../utils/Backend";
import { LazyLoadImage } from "react-lazy-load-image-component";


const Characters = ({ tmdb_id }) => {


  


    const { isFetching, data } = useQuery({
        queryKey: ["castQuery", tmdb_id],
        queryFn: () => getCast(tmdb_id)
    });





    return data && (
        <div className="mt-5">
            <div className='w-full flex justify-between'>
                <div className="flex sm:gap-8 gap-4 items-center truncate">
                    <h2 className="text-lg font-semibold truncate">Cast
                    </h2>
                </div>
    



            </div>
            {
                data.length == 0 ? <Skeleton baseColor="rgb(22 28 63)" containerClassName="animate-pulse" className='my-3 animate-pulse' height={120}></Skeleton>
                    :
                    <div className="mt-5">
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={40}
                            autoPlay={true}
                            speed={500}
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
                            {data?.map((cast, idx) => (
                                <SwiperSlide className="cursor-pointer h-fit" key={idx}>

                                    {
                                        isFetching ? <Skeleton baseColor="rgb(11 15 41)" containerClassName="animate-pulse" height={270}></Skeleton> :

                                        <div className="flex flex-col gap-2">

                                            <div className="flex flex-wrap gap-3">
                                                <div title={`${cast.character} - ${cast.original_name}`} className="w-full flex gap-1 h-20 rounded-xl overflow-hidden bg-white/10 hover:bg-white/5 smoothie shrink-0">
                                                    <div className="h-full flex rounded-xl overflow-hidden shrink-0">
                                                        <span className=" lazy-load-image-background opacity lazy-load-image-loaded" >
                                                            {
                                                                cast.profile_path ? <LazyLoadImage width="100%" height="100%" src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`} className="size-full object-cover object-center !select-none shrink-0" placeholder={ <Skeleton
                                                                    baseColor="rgb(11 15 41)"
                                                                    containerClassName="animate-pulse"
                                                                    height={270}
                                                                  />} />:
                                                                <div className="size-full object-cover object-center !select-none shrink-0" />
                                                                
                                                            }
                                                        </span>
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
