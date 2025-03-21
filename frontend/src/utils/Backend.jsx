import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const MONGO_USERNAME = import.meta.env.VITE_MONGO_USERNAME;
const MONGO_PASSWORD = import.meta.env.VITE_MONGO_PASSWORD;
const IMDB_API = import.meta.env.VITE_IMDB_API

const Backend = () => {

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



    async function signUp(formObject) {
        const signUpUrl = `${BACKEND_URL}/create-user`;
        const reqOptions = createRequestOptions(signUpUrl, "POST", formObject);
        try {
            const response = await axios.request(reqOptions);
            return response;
        } catch (error) {
            return error.response;
        }
    }

    async function loginUser(username, password) {
        const tokenUrl = `${BACKEND_URL}/token/`;
        const reqOptions = createRequestOptions(tokenUrl, "POST", { username, password });
        try {
            const response = await axios.request(reqOptions);
            return response;
        } catch (error) {
            return error;
        }
    }

    const like = async (authHeader, id) => {
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


    const unlike = async (authHeader, id) => {
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

    const updateProfile = async (authHeader, data) => {
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

    const changePassword = async (authHeader, data) => {
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

    const refreshAccessToken = async (authTokens) => {
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


    const addMovie = (authHeader, data) => {
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

    const sendCaptions = (authHeader, data) => {
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

    const searchCaptions = (authHeader, data) => {
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

    async function getMongoToken() {
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

    const editMovie = (authHeader, data, id) => {
        const refreshUrl = `${BACKEND_URL}/edit/${id}`;
        const reqOptions = createRequestOptions(refreshUrl, "POST", data, authHeader);
        try {
            const response = axios.request(reqOptions);
            return response;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const updateReviews = async (accessToken, title, id) => {

        try {
            const response = await axios.get(`${IMDB_API}/reviews/${title}`)
            if (response.status === 200) {
                let reviewsData = response.data.reviews
                const updateResponse = await editMovie(accessToken, { reviews: reviewsData }, id)
                return updateResponse
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    return {
        signUp, loginUser, like, unlike, updateProfile, addMovie, BACKEND_URL, refreshAccessToken, sendCaptions, changePassword, searchCaptions,
        getMongoToken, editMovie, updateReviews
    };
};

export default Backend;
