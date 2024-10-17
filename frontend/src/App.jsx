import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import AboutUs from './Screens/AboutUs';
import NotFound from './Screens/NotFound';
import ContactUs from './Screens/ContactUs';
import MoviesPage from './Screens/Movies';
import SingleMovie from './Screens/SingleMovie';
import WatchPage from './Screens/WatchPage';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Profile from './Screens/Profile';
import Aos from 'aos';
import Password from './Screens/Password';
import FavouriteMovies from './Screens/FavouriteMovies';
import MoviesList from './Screens/Dashboard/Admin/MoviesList';
import Dashboard from './Screens/Dashboard/Admin/Dashboard';
import Users from './Screens/Dashboard/Admin/Users';
import "aos";
import "aos/dist/aos.css";
import NotAllowed from './Screens/NotAllowed';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import SuperUserOutlet from './utils/SuperUserOutlet';
import AddMovie from './Screens/Dashboard/Admin/AddMovie';



const App = () => {
  Aos.init();
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected routes for superusers */}
        <Route element={<SuperUserOutlet fallbackPath='/403' />}>
          <Route path='/movieslist' element={<MoviesList />}></Route>
          <Route path='/users' element={<Users />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/addmovie' element={<AddMovie />}></Route>
    
        </Route>

        {/* Protected routes for authenticated users */}
        <Route element={<AuthOutlet fallbackPath='/login' />}>
          <Route path='/favourites' element={<FavouriteMovies />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
        </Route>

        {/* Public routes */}
        <Route path="/" element={<HomeScreen />}></Route>
        <Route path='/about-us' element={<AboutUs />}></Route>
        <Route path='/contact-us' element={<ContactUs />}></Route>
        <Route path='/movies' element={<MoviesPage />}></Route>
        <Route path='/movie/:id' element={<SingleMovie />}></Route>
        <Route path='/watch/:id' element={<WatchPage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/password' element={<Password />}></Route>
        <Route path='/403' element={<NotAllowed />}></Route>

        {/* Catch-all for not found */}
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
