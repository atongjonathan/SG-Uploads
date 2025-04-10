import React, { createContext, useContext } from 'react'
import axios from 'axios';
import { useDevToolsStatus } from '../utils/useDevToolsStatus';
import {
    useQuery,
} from '@tanstack/react-query'
// import { useMovies } from '../utils/SWR'

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
export const MovieContext = createContext(null)

const MovieProvider = ({ children }) => {


    const moviesQuery = useQuery({
        queryKey: ["moviesQuery"],
        queryFn: () => {
            return axios.get(BACKEND_URL + '/movies?limit=500').then((res) => res.data)
        }
    })




    return (
        <MovieContext.Provider value={{ ...moviesQuery, movies: moviesQuery.data?.results ?? [] }}>
            {children}
        </MovieContext.Provider>
    )
}
export const useMovies = () => {
    const context = useContext(MovieContext);
    if (!context) {
        throw new Error(
            "useMovies must be used within an MoviesProvider. Make sure you are rendering MoviesProvider at the top level of your application."
        );
    }

    return context;
}

export default MovieProvider
