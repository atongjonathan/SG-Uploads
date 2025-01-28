import React, { createContext, useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import Backend from '../utils/Backend';

// import { useMovies } from '../utils/SWR'


export const MovieContext = createContext()

const MovieProvider = ({ children }) => {

    const [movies, setMovies] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    async function fetchDBMovies() {
        axios.get(Backend().BACKEND_URL + '/movies')
            .then((response) => {
                let movies = response.data  
                const sortedByRatingStar = movies ? [...movies].sort((a, b) => b.rating.star - a.rating.star) : [];
                setMovies(sortedByRatingStar);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsError(true);
                setIsLoading(false);
                console.error('Error fetching movies:', error);
            });
    }




    async function fetchMovies() {
        let token = await Backend().getMongoToken()
        let headersList = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }

        let bodyContent = JSON.stringify({
            "collection": "movies",
            "database": "F2LxBot",
            "dataSource": "Cluster0",
        });

        let reqOptions = {
            url: "https://eu-west-2.aws.data.mongodb-api.com/app/data-kmyiqtw/endpoint/data/v1/action/find",
            method: "POST",
            headers: headersList,
            data: bodyContent,
        }

        axios.request(reqOptions)
            .then((response) => {
                setMovies(response.data.documents);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsError(true);
                setIsLoading(false);
                console.error('Error fetching movies:', error);
            });
    }

    useEffect(() => {
        fetchDBMovies()
    }, []);

    // const { movies, isLoading } = useMovies()

    return (
        <MovieContext.Provider value={{ movies, isLoading, setMovies, setIsLoading, setIsError }}>
            {children}
        </MovieContext.Provider>
    )
}

export default MovieProvider
