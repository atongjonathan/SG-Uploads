import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import AboutUs from './Screens/AboutUs';
import NotFound from './Screens/Error/NotFound';
import ContactUs from './Screens/ContactUs';
import MoviesPage from './Screens/Movies';
import WatchPage from './Screens/WatchPage';
import Profile from './Screens/User/Profile';
import Aos from 'aos';
import FavouriteMovies from './Screens/User/FavouriteMovies';
import MoviesList from './Screens/Admin/MoviesList';
import "aos";
import "aos/dist/aos.css";
import NotAllowed from './Screens/Error/NotAllowed';
import AddMovie from './Screens/Admin/AddMovie';
import PrivateRoute from './context/PrivateRoute'
import { SuperRoute } from './context/PrivateRoute'
import ScrollToTop from './ScrollToTop';
import 'react-loading-skeleton/dist/skeleton.css'
import SingleMovie from './Screens/SingleMovie';
import {Helmet} from "react-helmet";


const App = () => {
  Aos.init();
  return (
    <BrowserRouter>
    <Helmet>
    <meta name="description" content="Your free movie website search is over. With SG Uploads you can watch free movies online and TV shows without any account."/>
    <meta name="theme-color" content="#080A1A"/>
    <meta property="og:site_name" content="SG Uploads"/>
    <meta property="og:title" content="SG Uploads"/>
    <meta property="og:image" content="https://raw.githubusercontent.com/atongjonathan/SG-Uploads/refs/heads/main/frontend/src/images/4x3.jpg"/>
    <meta property="og:description" content="Your free movie website search is over. With SG Uploads you can watch free movies online and TV shows without any account." />
    <meta property="og:url" content="https://movies.atongjona.com/"/>
    <meta property="twitter:image" content="https://raw.githubusercontent.com/atongjonathan/SG-Uploads/refs/heads/main/frontend/src/images/4x3.jpg"/>
    <meta property="twitter:card" content="summary_large_image"/>
    <meta property="twitter:title" content="SG Uploads"/>
    <meta property="twitter:description" content="Your free movie website search is over. With SG Uploads you can watch free movies online and TV shows without any account."/>
    <meta property="og:image" content="https://raw.githubusercontent.com/atongjonathan/SG-Uploads/refs/heads/main/frontend/src/images/4x3.jpg"/>
    <meta property="fb:app_id" content="1401813654536816"/>
    <meta name="keywords" content="movie, download, stream, video phone, free, upload"/> 
         </Helmet>
    <ScrollToTop></ScrollToTop>
      <Routes>
        {/* Protected routes for superusers */}
        <Route path='/movieslist' element={<PrivateRoute><SuperRoute><MoviesList /></SuperRoute></PrivateRoute>}></Route>
        <Route path='/addmovie' element={<PrivateRoute><SuperRoute><AddMovie /></SuperRoute></PrivateRoute>}></Route>

        {/* Protected routes for authenticated users */}

        <Route path='/favourites' element={<PrivateRoute><FavouriteMovies /></PrivateRoute>}></Route>
        <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>}></Route>

        {/* Public routes */}
        <Route path="/" element={<HomeScreen />}></Route>
        <Route path='/about-us' element={<AboutUs />}></Route>
        <Route path='/contact-us' element={<ContactUs />}></Route>
        <Route path='/movies' element={<MoviesPage />}></Route>
        <Route path='/watch/:id' element={<WatchPage />}></Route>
        <Route path='/movie/:id' element={<SingleMovie />}></Route>
        <Route path='/403' element={<NotAllowed />}></Route>

        {/* Catch-all for not found */}
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
