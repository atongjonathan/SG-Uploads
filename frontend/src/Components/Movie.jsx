import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const Movie = ({ movie }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="p-1 hover:scale-95 transition-transform relative rounded overflow-hidden">
      <Link to={`/watch/${movie.id}`} className="block w-full aspect-[216/319] relative">
        {!loaded && (
          <Skeleton
            baseColor="rgb(11 15 41)"
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            containerClassName="w-full h-full"
          />
        )}

        <LazyLoadImage
          onLoad={() => setLoaded(true)}
          src={movie.poster}
          alt={movie.title}
          title={movie.title}
          effect="opacity"
          className={`w-full h-full object-cover absolute top-0 left-0 rounded-lg transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </Link>
    </div>
  );
};

export default Movie
