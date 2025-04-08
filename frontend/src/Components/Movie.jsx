import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import { FaHeart } from "react-icons/fa";
import loader from '../../images/loading_image.gif'
import Skeleton from "react-loading-skeleton";


const Movie = ({ movie, scrollPosition }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div className="p-1 hover:scale-95 transitions relative rounded overflow-hidden">
        <Link to={`/watch/${movie.id}`} className="w-full">
          <LazyLoadImage onLoad={() => {
            // setTimeout(() => {
              setLoaded(true)
            // }, 300);

          }} placeholder={<Skeleton
            baseColor="rgb(20 117 159)"
            containerClassName="animate-pulse"
            height={270}
          />} placeholderSrc={<Skeleton
            baseColor="rgb(20 117 159)"
            containerClassName="animate-pulse"
            height={270}
          />} effect="blur" src={movie.poster} alt={movie.title} title={movie.title} className="w-full h-h-rate object-cover rounded-lg" />
        </Link>
        {
          loaded && <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
            <h6 className="font-semibold truncate">{movie.title}</h6>
          </div>
        }

      </div>
    </>
  );
};

export default trackWindowScroll(Movie);
