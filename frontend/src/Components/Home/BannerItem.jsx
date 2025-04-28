import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import SGFaHeart from '../SGFaHeart';
import { BiPlay } from "react-icons/bi";
import FlexMovieItems from "../FlexMovieItems";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSwiperSlide } from 'swiper/react';

const BannerItem = ({ movie }) => {
    const swiperSlide = useSwiperSlide();
    const isActive = swiperSlide.isActive;

    const [phases, setPhases] = useState({
        title: false,
        info: false,
        plot: false,
        buttons: false,
    });

    useEffect(() => {
        let timers = [];

        if (isActive) {
            timers.push(setTimeout(() => setPhases(prev => ({ ...prev, title: true })), 500));
            timers.push(setTimeout(() => setPhases(prev => ({ ...prev, info: true })), 1500));
            timers.push(setTimeout(() => setPhases(prev => ({ ...prev, plot: true })), 2500));
            timers.push(setTimeout(() => setPhases(prev => ({ ...prev, buttons: true })), 3500));
        } else {
            setPhases({ title: false, info: false, plot: false, buttons: false });
        }

        return () => timers.forEach(timer => clearTimeout(timer));
    }, [isActive]);

    return (
        <>
            {/* Small Screen */}
            <div className="w-full md:hidden max-h-100 relative overflow-hidden">
                <LazyLoadImage
                    effect="blur"
                    src={movie.poster}
                    alt={movie.title}
                    title={movie.title}
                    delayTime={3000}
                    className={`w-full md:hidden max-h-100 object-cover transition-opacity duration-1000 ${swiperSlide.isActive ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>

            {/* Large Screen */}
                <div
                    style={{
                        backgroundImage: `url('${movie?.poster}')`,
                        animation: 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    }}
                    className={`w-full hidden md:block h-full bg-cover bg-center blur-lg relative transition-opacity duration-1000  ${swiperSlide.isActive ? 'opacity-100' : 'opacity-0'}`}
                />

            {/* Movie Poster */}
            <LazyLoadImage
                style={{
                    height: '140%',
                    bottom: '-81px'
                }}
                src={movie?.poster}
                alt={movie.title}
                title={movie.title}
                delayTime={3000}
                className={`absolute right-28 z-10 object-contain w-100 rotate-12 hidden md:inline-block transition-opacity duration-1000  ${swiperSlide.isActive ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Metadata Phases */}
            {isActive && (
                <div className="lg:w-7/12 absolute linear-bg xl:pl-32 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4 z-20 md:h-96 min-h-80">
                    {/* Title */}
                    <h1 className={`xl:text-4xl sm:text-2xl text-xl font-bold truncate capitalize font-sans transition-opacity duration-700 ${phases.title ? 'opacity-100' : 'opacity-0'}`}>
                        {movie.title}
                    </h1>

                    {/* Flex Movie Items */}
                    <div className={`flex gap-5 items-center text-dryGray transition-opacity duration-700 ${phases.info ? 'opacity-100' : 'opacity-0'}`}>
                        <FlexMovieItems movie={movie} />
                    </div>

                    {/* Plot */}
                    <p className={`text-white/90 text-sm text-left bg-main/10 py-3 px-1 transition-opacity duration-700 ${phases.plot ? 'opacity-100' : 'opacity-0'}`}>
                        {movie.plot}
                    </p>

                    {/* Buttons */}
                    <div className={`flex gap-5 items-center transition-opacity duration-700 ${phases.buttons ? 'opacity-100' : 'opacity-0'}`}>
                        <Link
                            to={`/watch/${movie.id}`}
                            className="bg-subMain hover:bg-main border-subMain transitions text-white px-8 py-3 rounded font-medium sm:text-sm text-xs flex justify-center items-center"
                        >
                            <BiPlay className="w-5 h-5 mx-auto" />
                            Watch
                        </Link>

                        <SGFaHeart movie={movie} />
                    </div>
                </div>
            )}
        </>
    );
};

export default BannerItem;
