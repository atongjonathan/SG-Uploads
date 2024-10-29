import { useEffect, useState } from 'react';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const VITE_IMDB_API = import.meta.env.VITE_IMDB_API;

export function useUser(auth) {
    let user = null;
    let isLoading = false;
    let isError = false;

    const headers = { Authorization: `Bearer ${auth}` };

    axios.get(`${BACKEND_URL}/user`, { headers })
        .then((response) => {
            user = response.data
        })
        .catch((error) => {
            isError = true
            console.error('Error fetching user:', error);
            localStorage.removeItem('authTokens');
        });

    return { user, isLoading, isError };
}   

export function useUsers(auth) {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const headers = { Authorization: `Bearer ${auth}` };

        axios.get(`${BACKEND_URL}/users`, { headers })
            .then((response) => {
                setUsers(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsError(true);
                setIsLoading(false);
                console.error('Error fetching users:', error);
            });
    }, [auth]);

    return { users, isLoading, isError };
}

export function useMovies() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/movies`)
            .then((response) => {
                setMovies(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsError(true);
                setIsLoading(false);
                console.error('Error fetching movies:', error);
            });
    }, []);

    return { movies, isLoading, isError };
}

export function useSearchResults(query) {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (!query) return;

        axios.get(`${VITE_IMDB_API}/search/query?=${query}`)
            .then((response) => {
                setResults(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsError(true);
                setIsLoading(false);
                console.error('Error fetching search results:', error);
            });
    }, [query]);

    return { results, isLoading, isError };
}
