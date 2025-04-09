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
      <div className="p-1 hover:scale-95 transitions relative rounded overflow-hidden aspect-[216/319]">
        <Link to={`/watch/${movie.id}`} className="w-full">
        {!loaded && (
        <Skeleton
          baseColor="rgb(11 15 41)"
          containerClassName="absolute top-0 left-0 w-full h-full animate-pulse rounded-lg "
          height={200}
        />
      )}
      <LazyLoadImage
        onLoad={() => setLoaded(true)}
        src={movie.poster}
        alt={movie.title}
        title={movie.title}
        effect="blur"
        className={`w-full object-cover rounded-lg transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
        </Link>
      

      </div>
    </>
  );
};

export default trackWindowScroll(Movie);
