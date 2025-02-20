import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage, trackWindowScroll  } from 'react-lazy-load-image-component';
import { FaHeart } from "react-icons/fa";
import loader from '../../images/loading_image.gif'


const Movie = ({ movie, scrollPosition  }) => {
  return (
    <>
      <div className="border border-border p-1 hover:scale-95 transitions relative rounded overflow-hidden">
        <Link to={`/watch/${movie.title}`} className="w-full">
          <img src={movie.poster} alt={movie.title} title={movie.title} className="w-full h-h-rate object-cover" />
        </Link>
        <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
          <h6 className="font-semibold truncate">{movie.title}</h6>
        </div>
      </div>
    </>
  );
};

export default trackWindowScroll(Movie);
