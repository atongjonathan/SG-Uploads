import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen'
import AboutUs from './Screens/AboutUs'
import NotFound from './Screens/NotFound'
import ContactUs from './Screens/ContactUs'

const App = () => {
  return (
  <Routes>
    <Route path="/" element={<HomeScreen/>}></Route>
    <Route path='/about-us' element={<AboutUs/>}></Route>
    <Route path='/contact-us' element={<ContactUs/>}></Route>
    <Route path='*' element={<NotFound/>}></Route>
  </Routes>
  )
}

export default App