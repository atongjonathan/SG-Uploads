import React, { createContext } from 'react'
import { useMovies } from '../utils/SWR'


export const MovieContext = createContext()
const MovieProvider = ({ children }) => {
    const { movies, isLoading } = useMovies()

    return (
        <MovieContext.Provider value={{ movies, isLoading }}>
            {children}
        </MovieContext.Provider>
    )
}

export default MovieProvider
