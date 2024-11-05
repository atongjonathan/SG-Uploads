import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import Banner from "../Components/Home/Banner";
import PopularMovies from "../Components/Home/PopularMovies";
import Promos from "../Components/Home/Promos";
import TopRated from "../Components/Home/TopRated";
import { useMovies } from "../utils/SWR";
import LoadingIcons from 'react-loading-icons'
import SgSlider from "../Components/Home/SgSlider";
import { MdOutlineNewReleases } from "react-icons/md";
import { BsCollectionFill } from "react-icons/bs";

const HomeScreen = () => {
  document.title = `SG Uploads | Home`;

  const { movies, isLoading, error } = useMovies(null);
  const [loaded, setLoaded] = useState(false);

  let trending = []
  if (movies) {
    console.log(movies)
    trending = movies.sort((a, b) => new Date(b.releaseDetailed.date) - new Date(a.releaseDetailed.date))

  }

  useEffect(() => {
    if (movies)
      setLoaded(true); // Mark as loaded when movies are fetched
  }, [movies, isLoading]);

  return (
    <Layout>

      {isLoading ? (
        <div
          className="h-96 flex justify-center items-center"
        >
          <LoadingIcons.Puff className="h-16 animate-pulse" speed={2} />
        </div>
      ) : (movies && loaded) ? (
        <div className="container mx-auto min-h-screen px-2 mb-6">
          <Banner movies={movies} />
          <SgSlider movies={trending} title='Trending' icon={BsCollectionFill} />
          <PopularMovies movies={movies} />
          <TopRated movies={movies} />
          <Promos />
        </div>
      ) :
        <div className="h-96 flex flex-col justify-center items-center">
          <h3>Site down for planned maintenance...</h3>
          <p>We'll be back soon!</p>
        </div>

      }
    </Layout>
  );
};

export default HomeScreen;
