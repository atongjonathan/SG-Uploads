import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "swiper/css";
import "aos";
import "aos/dist/aos.css";
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { AuthProvider } from "./context/AuthContext.jsx";
import MovieProvider from "./context/MovieContext.jsx";
import 'react-lazy-load-image-component/src/effects/blur.css';




createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider >
      <MovieProvider>
        <App />
      </MovieProvider>
    </AuthProvider>
  </StrictMode>
);
