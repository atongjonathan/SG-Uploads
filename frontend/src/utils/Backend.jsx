import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const MONGO_USERNAME = import.meta.env.VITE_MONGO_USERNAME;
const MONGO_PASSWORD = import.meta.env.VITE_MONGO_PASSWORD;
const IMDB_API = import.meta.env.VITE_IMDB_API
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY


export async function getMovies(config = {}) {
    return axios.get(BACKEND_URL + '/movies', config).then((res) => res.data)

}
export async function getTrending() {
    return await axios.get(BACKEND_URL + '/trending').then((res) => res.data)

}

export async function getIframeSrc(data) {
    return await axios.post(BACKEND_URL + '/pesapal/iframe', data).then((res) => res.data)
}

const tokens = localStorage.getItem("authTokens")
const authTokens = tokens ? JSON.parse(tokens) : null

const sortVideos = (videos = []) => {
    return videos.sort((a, b) => {
        const aScore = (a.type === "Trailer" ? 2 : 0) + (a.official ? 1 : 0);
        const bScore = (b.type === "Trailer" ? 2 : 0) + (b.official ? 1 : 0);
        return bScore - aScore;
    });
};
export const getTrailers = async (tmdb_id) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${tmdb_id}/videos?api_key=${TMDB_API_KEY}`, {
        "method": "GET",
        "mode": "cors",
        "credentials": "omit"
    })
    let data = await res.json()

    return sortVideos(data.results)
}
export const getCast = async (tmdb_id) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${tmdb_id}/credits?api_key=${TMDB_API_KEY}`, {

        "method": "GET",
        "mode": "cors",
        "credentials": "omit"
    })
    let data = await res.json()
    return data.cast
}
const createRequestOptions = (url, method, data = null, authHeader = null) => {
    let headers = {
        'Content-Type': 'application/json',
    };
    if (authHeader) {
        headers['Authorization'] = 'Bearer ' + authHeader
    }
    return {
        url,
        method,
        headers,
        data,
    };
};



export async function signUp(formObject) {
    const signUpUrl = `${BACKEND_URL}/create-user`;
    const reqOptions = createRequestOptions(signUpUrl, "POST", formObject);
    try {
        const response = await axios.request(reqOptions);
        return response;
    } catch (error) {
        return error.response;
    }
}

export async function loginUser(username, password) {
    const tokenUrl = `${BACKEND_URL}/token/`;
    const reqOptions = createRequestOptions(tokenUrl, "POST", { username, password });
    try {
        const response = await axios.request(reqOptions);
        return response;
    } catch (error) {
        return error;
    }
}

export const like = async (authHeader, id) => {
    const refreshUrl = `${BACKEND_URL}/like/${id}`;
    const reqOptions = createRequestOptions(refreshUrl, "POST", null, authHeader);
    try {
        const response = await axios.request(reqOptions);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};


export const unlike = async (authHeader, id) => {
    const refreshUrl = `${BACKEND_URL}/unlike/${id}`;
    const reqOptions = createRequestOptions(refreshUrl, "POST", null, authHeader);

    try {
        const response = await axios.request(reqOptions);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateProfile = async (authHeader, data) => {
    const refreshUrl = `${BACKEND_URL}/update-user`;
    const reqOptions = createRequestOptions(refreshUrl, "POST", data, authHeader);
    reqOptions.headers["Content-Type"] = 'multipart/form-data'
    try {
        const response = await axios.request(reqOptions);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const changePassword = async (authHeader, data) => {
    const refreshUrl = `${BACKEND_URL}/change-password`;
    const reqOptions = createRequestOptions(refreshUrl, "POST", data, authHeader);
    try {
        const response = await axios.request(reqOptions);
        return response.data;
    } catch (error) {
        // console.log(error);
        return error;
    }
};

export const refreshAccessToken = async (authTokens) => {
    const refreshUrl = `${BACKEND_URL}/token/refresh/`;
    const reqOptions = createRequestOptions(refreshUrl, "POST", { refresh: authTokens?.refresh });
    try {
        const response = await axios.request(reqOptions);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};


export const addMovie = (authHeader, data) => {
    const refreshUrl = `${BACKEND_URL}/create-movie`;
    const reqOptions = createRequestOptions(refreshUrl, "POST", data, authHeader);
    try {
        const response = axios.request(reqOptions);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const sendCaptions = (authHeader, data) => {
    const refreshUrl = `${BACKEND_URL}/captions`;
    const reqOptions = createRequestOptions(refreshUrl, "POST", data, authHeader);
    try {
        const response = axios.request(reqOptions);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const searchCaptions = (authHeader, data) => {
    const refreshUrl = `${BACKEND_URL}/search`;
    const reqOptions = createRequestOptions(refreshUrl, "POST", data, authHeader);
    try {
        const response = axios.request(reqOptions);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export async function getMongoToken() {
    let headersList = {
        "Content-Type": "application/json"
    }
    let bodyContent = JSON.stringify({
        "username": MONGO_USERNAME,
        "password": MONGO_PASSWORD
    });
    let reqOptions = {
        url: "https://eu-west-2.aws.services.cloud.mongodb.com/api/client/v2.0/app/data-kmyiqtw/auth/providers/local-userpass/login",
        method: "POST",
        headers: headersList,
        data: bodyContent,
    }

    let response = await axios.request(reqOptions);
    let access_token = response.data.access_token
    return access_token
}

export const editMovie = (authHeader, data, id) => {
    const reqOptions = createRequestOptions(`${BACKEND_URL}/edit/${id}`, "POST", data, authHeader);
    return axios.request(reqOptions); // returns a Promise
};

export const updateReviews = (accessToken, title, id) => {
    return axios.get(`${IMDB_API}/reviews/${title}`)
        .then((response) => {
            if (response.status === 200) {
                return editMovie(accessToken, { reviews: response?.data.reviews }, id);
            } else {
                return Promise.resolve(response);
            }
        })
        .catch((error) => {
            console.error('Failed to update reviews:', error);
            return Promise.reject(error);
        });
};





export const verifyEmail = async (access) => {
    return await axios.get(BACKEND_URL + "/verify", {
        headers: {
            Authorization: 'Bearer ' + access
        }
    })
}
export const verifyToken = async (uidb64, token, access) => {
    return await axios.get(BACKEND_URL + `/verify_email/${uidb64}/${token}`, {
        headers: {
            Authorization: 'Bearer ' + access
        }
    })
}

export const verifResetPassword = async (user, uidb64, token) => {
    return await axios.get(BACKEND_URL + `/verify_reset_password/${user}/${uidb64}/${token}`)
}

export const sendResetEmail = async (email) => {
    return await axios.post(BACKEND_URL + `/send_reset_token`, {
        email
    })
}

export const setPassword = async (data) => {
    return await axios.post(BACKEND_URL + `/reset_password`, data)
}