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
import ErrorBoundary from "./Screens/Error/ErrorBoundary.jsx";




createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider >
        <MovieProvider>
          <App />
        </MovieProvider>
      </AuthProvider>
    </ErrorBoundary>

  </StrictMode>
);
