import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "swiper/css";
import "aos";
import "aos/dist/aos.css";
import { BrowserRouter } from "react-router-dom";
import { MovieProvider } from "./Data/MovieContext.jsx"; // Import MovieProvider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MovieProvider> {/* Use MovieProvider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MovieProvider>
  </StrictMode>
);
