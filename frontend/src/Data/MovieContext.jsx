import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { movies } from './movies';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  // const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getMovies() {
    // try {
    //   const response = await axios.get("https://api.safone.dev/imdb?query=Marvel");
    //   console.log(response.data.results)
    //   setMovies(response.data.results);
    // } catch (err) {
    //   setError(err.message);
    // } finally {
    //   setLoading(false);
    // }

  }

  // useEffect(() => {
  //   getMovies();
  // }, []);

  return (
    <MovieContext.Provider value={{ movies, loading, error }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
