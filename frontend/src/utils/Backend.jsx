import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Backend = () => {

    const createRequestOptions = (url, method, data = null, authTokens = null) => {
        let headers = {
            'Content-Type': 'application/json',
        };
        if (authTokens) {
            headers['Authorization'] = 'Bearer ' + authTokens?.access;
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


    return { signUp, loginUser,  refreshAccessToken};
};

export default Backend;
