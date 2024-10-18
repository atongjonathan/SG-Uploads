import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import Banner from '../Components/Home/Banner'
import PopularMovies from '../Components/Home/PopularMovies'
import Promos from '../Components/Home/Promos'
import TopRated from '../Components/Home/TopRated'
const HomeScreen = () => {
  useEffect(()=>{
    document.title = `SG Uploads | Home`

}, [])
  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-2 mb-6">
        <Banner></Banner>
        <PopularMovies></PopularMovies>
        <TopRated></TopRated>
        <Promos></Promos>
      </div>
    </Layout>
  );
};

export default HomeScreen;
