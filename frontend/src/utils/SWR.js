import axios from 'axios';
import useSWR from 'swr';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const VITE_IMDB_API = import.meta.env.VITE_IMDB_API;

export function useUser(auth) {
    if (auth) {
        let headers = {
            Authorization: 'Bearer ' + auth
        };
        const fetcher = (...args) => fetch(...args, {
            headers: headers
        }).then(res => res.json());

        const { data, error, isLoading } = useSWR(`${BACKEND_URL}/user`, fetcher);

        if (!data?.username && !isLoading) {
            localStorage.removeItem('authTokens');
            window.location.reload()
        }

        return {
            user: data,
            isLoading,
            isError: error
        };
    }

}

export function useUsers(auth) {
    let headers = {
        Authorization: 'Bearer ' + auth
    };
    const fetcher = (...args) => fetch(...args, {
        headers: headers
    }).then(res => res.json());

    const { data, error, isLoading } = useSWR(`${BACKEND_URL}/users`, fetcher);

    return {
        users: data,
        isLoading,
        isError: error
    };
}

export function useMovies() {
    const fetcher = async () => {
        const response = await axios.request({
            method: 'GET',
            url: `${BACKEND_URL}/movies`
        });
        return response.data; // Return the data from the response
    };

    const { data, error, isLoading } = useSWR(`${BACKEND_URL}/movies`, fetcher);

    return {
        movies: data,
        isLoading,
        isError: error
    };
}

export function useSearchResults(query) {
    const fetcher = async () => {
        const response = await axios.request({
            method: 'GET',
            url: `${VITE_IMDB_API}/search/query?=${query}`
        });
        return response.data; // Return the data from the response
    };

    const { data, error, isLoading } = useSWR(`${BACKEND_URL}/movies`, fetcher);

    return {
        results: data,
        isLoading,
        isError: error
    };
}
