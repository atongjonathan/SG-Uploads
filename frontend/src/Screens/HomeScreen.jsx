import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import Banner from "../Components/Home/Banner";
import PopularMovies from "../Components/Home/PopularMovies";
import Promos from "../Components/Home/Promos";
import TopRated from "../Components/Home/TopRated";
import LoadingIcons from 'react-loading-icons'
import SgSlider from "../Components/Home/SgSlider";
import { BsCollectionFill, BsBookmarkStarFill } from "react-icons/bs";
import { MovieContext } from "../context/MovieContext";

const HomeScreen = () => {
  document.title = `SG Uploads | Home`;

  const { movies, isLoading, error } = useContext(MovieContext);

  let trending = []
  let topRated = []
  let popular = []
  let latest = []
  if (movies) {
    trending = movies.sort((a, b) => new Date(b.releaseDetailed.date) - new Date(a.releaseDetailed.date))
    topRated = movies.sort((a, b) => b.rating.star - a.rating.star)
    popular = movies.sort((a, b) => b.rating.count - a.rating.count)
    latest = movies.sort((a, b) => new Date(b.releaseDetailed.date) - new Date(a.releaseDetailed.date))




  }



  return (
    <Layout>

      <div className="container mx-auto min-h-screen px-2 mb-6">

          <>
            <Banner movies={latest} />
            <SgSlider movies={trending} title='Trending' Icon={BsCollectionFill} />
            <SgSlider movies={movies} title='Popular Movies' Icon={BsCollectionFill} />
            <SgSlider movies={topRated} title='Top Rated' Icon={BsBookmarkStarFill} />
            <Promos />
          </>

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
