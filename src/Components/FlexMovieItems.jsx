import React from "react";
import { FaRegCalendarAlt, FaHeart } from "react-icons/fa";
import { BiTime } from "react-icons/bi";

const FlexMovieItems = ({ movie }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{movie.genre.join(", ")}</span>
      </div>
      <div className="flex items-center gap-2">
        <FaRegCalendarAlt className="text-subMain w-3 h-3"></FaRegCalendarAlt>
        <span className="text-sm font-medium">{movie.year}</span>
      </div>
      <div className="flex items-center gap-2">
        <BiTime className="text-subMain w-3 h-3"></BiTime>
        <span className="text-sm font-medium">{movie.runtime}</span>
      </div>
     
    </>
  );
};

export default FlexMovieItems;
