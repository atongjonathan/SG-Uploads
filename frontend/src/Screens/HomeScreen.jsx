import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import Banner from "../Components/Home/Banner";
import PopularMovies from "../Components/Home/PopularMovies";
import Promos from "../Components/Home/Promos";
import LoadingIcons from 'react-loading-icons'
import SgSlider from "../Components/Home/SgSlider";
import { BsCollectionFill, BsBookmarkStarFill } from "react-icons/bs";
import { MovieContext } from "../context/MovieContext";
import SiteDown from '../Screens/SiteDown'

const HomeScreen = () => {
  document.title = `SG Uploads | Home`;

  const { movies, isLoading } = useContext(MovieContext);




  return (
    <Layout>

      <div className="container mx-auto min-h-screen px-2 mb-6">

          <>
            <Banner movies={movies?.toSorted((a, b) => new Date(b.releaseDetailed.date) - new Date(a.releaseDetailed.date))} />
            <SgSlider movies={movies?.toSorted((a, b) => new Date(b.releaseDetailed.date) - new Date(a.releaseDetailed.date))} title='Trending' Icon={BsCollectionFill} />
            <SgSlider movies={movies?.toSorted((a, b) => b.rating.count - a.rating.count)} title='Popular Movies' Icon={BsCollectionFill} />
            <SgSlider movies={movies?.toSorted((a, b) => b.rating.star - a.rating.star)} title='Top Rated' Icon={BsBookmarkStarFill} />
            <Promos />
          </>

      </div>

      {
        (!movies && !isLoading) &&
        <SiteDown></SiteDown>

      }
    </Layout>
  );
};

export default HomeScreen;
