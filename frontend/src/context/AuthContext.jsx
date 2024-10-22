import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState, useRef } from 'react';
import { createContext } from 'react';
import Backend from '../utils/Backend';
import { toast } from 'sonner';

const AuthContext = createContext({});
const backend = Backend()

export default AuthContext;
export const AuthProvider = ({ children }) => {

    const [authTokens, setAuthTokens] = useState(() => {
        // Initialize from localStorage if available
        const tokens = localStorage.getItem('authTokens');
        return tokens ? JSON.parse(tokens) : null;
    });

    const [SGUser, setUser] = useState(() => {
        // Decode token to extract SGUser info
        return authTokens ? jwtDecode(authTokens?.access) : null;
    });




    const intervalRef = useRef(null); // Store the interval ID here



    // Refresh token function
    async function saveNewTokens(authTokens) {
        const response = await backend.refreshAccessToken(authTokens)

        if (response.data) {
            const newTokens = response.data
            saveAuthTokens(newTokens)
            // let decoded = jwtDecode(newTokens.access);
            // console.log("New Tokens will expire on " + new Date(decoded.exp * 1000).toString());
            return true
        }
        else if (response?.status == 401) {
            console.log('Failed to refresh token', response);
            logoutUser();
        }
        else {
            toast("An error occured during token refresh")
        }
        return false
    }


    function logoutUser() {
        localStorage.removeItem('authTokens');
        setAuthTokens(null);
        setUser(null);
        toast("Please sign in to continue.");
    }


    function saveAuthTokens(tokens) {
        setAuthTokens(tokens);
        setUser(jwtDecode(tokens.access));
        localStorage.setItem('authTokens', JSON.stringify(tokens));
    }





    useEffect(() => {
        const accessToken = authTokens?.access;

        if (accessToken) {
            intervalRef.current = setInterval(() => {
                const decodedToken = jwtDecode(accessToken);
                let leeway_time = 1000 * 60 * 4.5;
                let time_to_expire = decodedToken.exp * 1000;
                // console.log("Token will expire on " + new Date(time_to_expire).toString());

                let time_rem = time_to_expire - Date.now();
                // console.log("Time remaining is", time_rem / (1000 * 60) + ' mins');
                if (time_rem < leeway_time) {
                    if (!saveNewTokens(authTokens)) {
                        clearInterval(intervalRef.current); // Clear the interval on failure
                    };
                }

            }, 60 * 1000 * 0.5);

            // Cleanup interval on unmount
            return () => clearInterval(intervalRef.current);
        }
    }, [authTokens]);



    return (
        <AuthContext.Provider value={{
            SGUser, authTokens, logoutUser, setUser, saveAuthTokens
        }}>
            {children}
        </AuthContext.Provider>
    );
}

