import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import Banner from "../Components/Home/Banner";
import PopularMovies from "../Components/Home/PopularMovies";
import Promos from "../Components/Home/Promos";
import TopRated from "../Components/Home/TopRated";
import LoadingIcons from 'react-loading-icons'
import SgSlider from "../Components/Home/SgSlider";
import { BsCollectionFill } from "react-icons/bs";
import { MovieContext } from "../context/MovieContext";

const HomeScreen = () => {
  document.title = `SG Uploads | Home`;

  const { movies, isLoading, error } = useContext(MovieContext);

  let trending = []
  if (movies) {
    trending = movies.sort((a, b) => new Date(b.releaseDetailed.date) - new Date(a.releaseDetailed.date))

  }



  return (
    <Layout>

      <div className="container mx-auto min-h-screen px-2 mb-6">

        {movies && (
          <>
            <Banner movies={movies} />
            <SgSlider movies={trending} title='Trending' icon={BsCollectionFill} />
            <PopularMovies movies={movies} />
            <TopRated movies={movies} />
            <Promos />
          </>

        )}
      </div>

      {
        (!movies && !isLoading) &&
        <div className="container mx-auto min-h-screen px-2 mb-6 flex flex-col justify-center items-center bg-ma">
          <h3>Site down for planned maintenance...</h3>
          <p>We'll be back soon!</p>
        </div>

      }
    </Layout>
  );
};

export default HomeScreen;
