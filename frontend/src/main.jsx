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
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { NotificationProvider } from "./Components/Notifications/NotificationContext.jsx";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    }
  }
})

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="bg-main text-white relative h-[100vh] flex items-center justify-center p-5">
      <div className="max-w-xl text-center">
        <h2 className="font-semibold text-lg mb-2">This site is no longer active</h2>
        <p className="text-sm mb-4">
          After careful consideration, we’ve made the difficult decision to sunset this project. This choice was not made lightly.
        </p>
        <p className="text-sm mb-4">
          If you have questions, thoughts, or would like to discuss ways to continue the work, please don’t hesitate to reach out.
        </p>
        <p className="text-sm mb-4">
          Contact us at <a className="underline" href="mailto:sunsetting@streamgrid.stream">sunsetting@streamgrid.stream</a>
        </p>
        <p className="">Thank you!</p>
      </div>
    </div>

  </StrictMode>
);
