// utils/Refresh.js
import createRefresh from 'react-auth-kit/createRefresh';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const refreshApi = createRefresh({
  interval: 4 , // Increase the interval to reduce frequent refreshes
  refreshApiCallback: async ({ authUserState, refreshToken }) => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/token/refresh/`,
        { refresh: refreshToken },
        { withCredentials: true } 
      );

      let accessDecoded = jwtDecode(data.access);
      let refreshDecoded = jwtDecode(data.refresh);
      
      console.log("Token will expire on " + new Date(accessDecoded.exp * 1000).toString());

      return {
        isSuccess: true,
        newAuthToken: data.access,
        newAuthTokenExpireIn: accessDecoded.exp - Math.floor(Date.now() / 1000), // seconds until expiration
        newRefreshToken: data.refresh,
        newRefreshTokenExpiresIn: refreshDecoded.exp - Math.floor(Date.now() / 1000), // seconds until expiration
      };
    } catch (error) {
      console.error('Error refreshing token:', error);
      return {
        isSuccess: false,
      };
    }
  },
});

export default refreshApi;
