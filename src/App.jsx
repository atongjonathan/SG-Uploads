import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen'
import AboutUs from './Screens/AboutUs'
import NotFound from './Screens/NotFound'
import ContactUs from './Screens/ContactUs'
import MoviesPage from './Screens/Movies'
import SingleMovie from './Screens/SingleMovie'
import WatchPage from './Screens/WatchPage'
import Login from './Screens/Login'
import Register from './Screens/Register'
import Profile from './Screens/Profile'
import Aos from 'aos'
import Password from './Screens/Password'
import FavouriteMovies from './Screens/FavouriteMovies'
import MoviesList from './Screens/Dashboard/Admin/MoviesList'
import Dashboard from './Screens/Dashboard/Admin/Dashboard'
import Categories from './Screens/Dashboard/Admin/Categories'
import Users from './Screens/Dashboard/Admin/Users'


const App = () => {
  Aos.init();
  return (
  <Routes>
    <Route path="/" element={<HomeScreen/>}></Route>
    <Route path='/about-us' element={<AboutUs/>}></Route>
    <Route path='/contact-us' element={<ContactUs/>}></Route>
    <Route path='/movies' element={<MoviesPage/>}></Route>
    <Route path='/movie/:id' element={<SingleMovie/>}></Route>
    <Route path='/watch/:id' element={<WatchPage  />}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/profile' element={<Profile/>}></Route>
    <Route path='/password' element={<Password/>}></Route>
    <Route path='/favourites' element={<FavouriteMovies/>}></Route>
    <Route path='/movieslist' element={<MoviesList/>}></Route>
    <Route path='/dashboard' element={<Dashboard/>}></Route>
    <Route path='/categories' element={<Categories/>}></Route>
    <Route path='/users' element={<Users/>}></Route>
    <Route path='*' element={<NotFound/>}></Route>
  </Routes>
  )
}

export default App