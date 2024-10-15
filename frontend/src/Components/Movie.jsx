import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import SGFaHeart from "./SGFaHeart";


const Movie = ({ movie }) => {
  return (
    <>
      <div className="border border-border p-1 hover:scale-95 transitions relative rounded overflow-hidden">
        <Link to={`/movie/${movie.title}`} className="w-full">
          <img src={movie.poster} alt={movie.title} className="w-full h-64 object-cover" />
        </Link>
        <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
          <h3 className="font-semibold truncate">{movie.title}</h3>
          <SGFaHeart movie={movie}></SGFaHeart>
        </div>
      </div>
    </>
  );
};

export default Movie;