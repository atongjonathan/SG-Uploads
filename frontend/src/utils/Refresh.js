import createRefresh from 'react-auth-kit/createRefresh';

import axios from "axios";
const refreshApi = createRefresh(
    {
  interval: 1, // Refreshs the token in every 1 minutes
  refreshApiCallback: async ({
    // can be get all these details
    // authToken,
    // authTokenExpireAt,
    // refreshTokenExpiresAt,
    authUserState,
    refreshToken,
  }) => {
    console.log(authUserState,"authUserState");
    
    try {
      const { data } = await axios.post(
        "http://localhost:8000/token/refresh/",
        {
          token: refreshToken,
        }
      );
      // the token will be changed access token every minute also set the new authTokenExpireIn to
      // higher or near to refresh token expuration time
      // cookie will be deleted after 1 minute when the user again open the app after 1 minute he have to login again so make the time higher near to refresh token time
      return {
        isSuccess: true,
        newAuthToken: data.token,
        newAuthTokenExpireIn: 1,
        newRefreshTokenExpiresIn: 10,
        newRefreshToken: data.refresh,
        newAuthUserState: {
            token:data.token
        },
      };
    } catch (error) {
      console.error(error,"sad");
      return {
        isSuccess: false,
      };
    }
  },
});

export default refreshApi;
