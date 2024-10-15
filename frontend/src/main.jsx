import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "swiper/css";
import "aos";
import "aos/dist/aos.css";
import { MovieProvider } from "./Data/MovieContext.jsx"; // Import MovieProvider
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';
import refreshApi from "./utils/Refresh.js";


const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
  refresh:refreshApi
}); 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider store={store}>  
      <MovieProvider> 
          <App />
      </MovieProvider>
    </AuthProvider>
  </StrictMode>
);
