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

const App = () => {
  Aos.init();
  return (
    <BrowserRouter>
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
        <Route path='/403' element={<NotAllowed />}></Route>

        {/* Catch-all for not found */}
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
