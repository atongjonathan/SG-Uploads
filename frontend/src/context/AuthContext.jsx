import React, { createContext, useEffect, useState, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import { jwtDecode } from 'jwt-decode'; // Fixed import
import axios from 'axios';
import { BACKEND_URL } from './MovieContext';
import { refreshAccessToken } from '../utils/Backend';

const AuthContext = createContext({});

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const tokens = localStorage.getItem('authTokens');
    return tokens ? JSON.parse(tokens) : null;
  });

  const [user, setUser] = useState(null); // Initial state for user
  const intervalRef = useRef(null); // Store interval ID

  const [loading, setLoading] = useState(true)



  const logoutUser = useCallback(() => {
    localStorage.removeItem('authTokens');
    setAuthTokens(null);
    setUser(null);
    if (intervalRef.current) clearInterval(intervalRef.current); // Clear interval on logout
  }, []);

  // Fetch user data only if tokens exist
  const fetchUser = useCallback(async (tokens) => {
    try {
      const headers = { Authorization: `Bearer ${tokens.access}` };
      const response = await axios.get(`${BACKEND_URL}/user`, { headers });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      logoutUser(); // Logout if fetching user fails (e.g., token invalid)
    }
  }, [logoutUser]);

  const saveAuthTokens = useCallback((tokens) => {
    setAuthTokens(tokens);
    localStorage.setItem('authTokens', JSON.stringify(tokens));
    fetchUser(tokens); // Fetch user data on login
  }, [fetchUser]);


  const saveNewTokens = useCallback(
    async (tokens) => {
      try {
        const response = await refreshAccessToken(tokens);
        if (response.data) {
          saveAuthTokens(response.data); // Save new tokens and fetch user
          return true;
        }
      } catch (error) {
        if (error?.response?.status === 401) logoutUser(); // Handle unauthorized error
        else toast.error('An error occurred during token refresh.');
      }
      return false;
    },
    [saveAuthTokens, logoutUser]
  );

  useEffect(() => {
    if (!authTokens) return; // No tokens, skip fetching user

    fetchUser(authTokens); // Fetch user on component mount

    const refreshTokens = async () => {
      const decoded = jwtDecode(authTokens.access);
      const leeway = 1000 * 60 * 4.5; // 4.5 minutes
      const timeToExpire = decoded.exp * 1000 - Date.now();

      if (timeToExpire < leeway) {
        const success = await saveNewTokens(authTokens);
        if (!success) clearInterval(intervalRef.current); // Stop interval if refresh fails
      }
    };

    // Set interval to check token expiration every 30 seconds
    intervalRef.current = setInterval(refreshTokens, 60 * 1000 * 0.5);

    // Cleanup on unmount or when tokens change
    return () => clearInterval(intervalRef.current);
  }, [authTokens, fetchUser, saveNewTokens]);

  return (
    <AuthContext.Provider
      value={{
        user,
        authTokens,
        logoutUser,
        saveAuthTokens,
        loading,
        setLoading,
        fetchUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
