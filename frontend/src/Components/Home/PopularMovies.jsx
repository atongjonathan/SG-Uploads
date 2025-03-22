import React from "react";
import Titles from "../Titles";
import { BsCollectionFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const PopularMovies = ({ movies }) => {
  let popular = []
  if (movies)
  {
    popular = movies.sort((a, b)=> b.rating.count - a.rating.count)

  }
  return movies && (
    <div className="my-14">
      <Titles title="Popular Movies" Icon={BsCollectionFill}></Titles>
      <Swiper className='mt-6'
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode]}
        breakpoints={
          {
            0: {
              slidesPerView: 2,
            },
            400: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5
            }

          }}
      >

        {popular?.slice(0, 8).sort(() => .5 - Math.random()).map((movie, idx) => (
          <SwiperSlide key={idx}>
            <Link to={`/watch/${movie.id}`} className="w-full truncate p-3 text-text flex-colo bg-dry border border-gray-800 hover:scale-95 transitions relative rounded overflow-hidden">
              <LazyLoadImage effect="blur"   src={movie.poster} alt={movie.title} title={movie.title} className='w-full h-rate object-cover rounded mb-4' />
              <h3 className="truncate">{movie.title}</h3>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* </div> */}
    </div>
  );
};

export default PopularMovies;
