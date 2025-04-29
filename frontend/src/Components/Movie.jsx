import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import { FaStar } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";


const Movie = ({ movie }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div className="p-1 hover:scale-95 transitions relative rounded overflow-hidden aspect-[216/319]">
        {/* {
          loaded && <span className="bg-main p-[.1rem] px-1 gap-1 rounded-md flex items-center absolute z-10 top-0 right-0 m-2 text-xs lg:text-sm">

            <FaStar className="lucide lucide-star text-star" />
            {movie.rating_star === 0 ? 'New' : movie.rating_star}
          </span>
        } */}

        <Link to={`/watch/${movie.id}`} className="w-full">
          {!loaded && (
            <Skeleton
              baseColor="rgb(11 15 41)"
              className="rounded-lg w-full aspect-[216/319]"
            />
          )}
          <LazyLoadImage
            onLoad={() => setLoaded(true)}
            src={movie.poster}
            alt={movie.title}
            title={movie.title}
            effect="opacity"
            className={`w-full object-cover transition-opacity duration-300 aspect-[216/319] h-64 rounded-lg ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />

        </Link>


      </div>
    </>
  );
};

export default trackWindowScroll(Movie);
