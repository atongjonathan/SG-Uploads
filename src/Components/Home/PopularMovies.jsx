import React, { useContext, useEffect, useState } from "react";
import Titles from "../Titles";
import { BsCollectionFill } from "react-icons/bs";
import Movie from "../Movie";
import axios from "axios";
import MovieContext from "../../Data/MovieContext";

const PopularMovies = () => {
  const {movies} = useContext(MovieContext)
  return (
    <div className="my-14">
      <Titles title="Popular Movies" Icon={BsCollectionFill}></Titles>
      <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {movies.slice(0, 8).map((movie, idx) => (
          <Movie key={idx} movie={movie}></Movie>
        ))}
      </div>
    </div>
  );
};

export default PopularMovies;
