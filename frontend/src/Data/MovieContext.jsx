import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useMovies } from '../utils/SWR';
// import { movies } from './movies';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  // const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let movies = []
  const response = useMovies()
  if (response.movies) {
    movies = response.movies
    // setLoading(response.loading)
    // setError(response.error)
  }

  return (
    <MovieContext.Provider value={{ movies, loading, error }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
