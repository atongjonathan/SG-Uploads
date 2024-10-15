import createRefresh from 'react-auth-kit/createRefresh';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
// import jwtDecode from 'jwt-decode';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const refreshApi = createRefresh({
  interval: 1 , // Increase the interval to reduce frequent refreshes
  refreshApiCallback: async ({ authUserState, refreshToken }) => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/token/refresh/`,
        {
          refresh: refreshToken,
        }
      );

      let accessDecoded = jwtDecode(data.access);
      let refreshDecoded = jwtDecode(data.refresh);
      let time_to_expire = accessDecoded.exp * 1000;
      console.log("Token will expire on " + new Date(time_to_expire).toString());

      // Return the updated tokens and state
      return {
        isSuccess: true,
        newAuthToken: data.access,
        newAuthTokenExpireIn: accessDecoded.exp, // Ensure this matches expected time format
        newRefreshToken: data.refresh,
        newRefreshTokenExpiresIn: refreshDecoded.exp, // Ensure this matches expected time format
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
