// utils/Refresh.js
import createRefresh from 'react-auth-kit/createRefresh';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const refreshApi = createRefresh({
  interval: 2, // Increase the interval to reduce frequent refreshes
  refreshApiCallback: async (param) => {
    console.log(param)
    try {
      const response = await axios.post(BACKEND_URL + "/token/refresh/", {
        headers: { 'Authorization': `Bearer ${param.authToken}` },
        refresh: param.refreshToken
      })

      let accessDecoded = jwtDecode(response.access);
      let refreshDecoded = jwtDecode(response.refresh);

      console.log("Token will expire on " + new Date(accessDecoded.exp * 1000).toString());

      return {
        isSuccess: true,
        newAuthToken: response.access,
        newAuthTokenExpireIn: accessDecoded.exp - Math.floor(Date.now() / 1000), // seconds until expiration
        newRefreshTokenExpiresIn: refreshDecoded.exp - Math.floor(Date.now() / 1000), // seconds until expiration,
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
