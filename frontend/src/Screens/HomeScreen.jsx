import React, { useContext } from "react";
import Layout from "../Layout/Layout";
import Banner from "../Components/Home/Banner";
import Promos from "../Components/Home/Promos";
import SgSlider from "../Components/Home/SgSlider";
import { BsCollectionFill, BsBookmarkStarFill } from "react-icons/bs";
import { MovieContext } from "../context/MovieContext";
import SiteDown from '../Screens/Error/SiteDown'
import { PiFilmReelFill } from "react-icons/pi";


const shuffle = (list) =>  list.sort(() => .5 - Math.random())


const HomeScreen = () => {
  document.title = `SG Uploads | Home`;

  const { movies, isLoading } = useContext(MovieContext);

  // Create sorted arrays
  const sortedByDate = movies ? [...movies].sort((a, b) => new Date(b.releaseDetailed.date) - new Date(a.releaseDetailed.date)) : [];
  const sortedByRatingCount = movies ? [...movies].sort((a, b) => b.rating.count - a.rating.count) : [];
  const sortedByRatingStar = movies ? [...movies].sort((a, b) => b.rating.star - a.rating.star) : [];
  const actionMovies = movies ? movies.filter((movie) => movie.genre.includes("Action")) : []

  return (
    <Layout>
      <div className="min-h-screen mb-6 lg:px-10 px-6">
        <>
          <Banner movies={sortedByDate} />
          <SgSlider movies={sortedByDate} title='Trending' Icon={BsCollectionFill} />
          <SgSlider movies={sortedByRatingStar} title='Top Rated' Icon={BsBookmarkStarFill} />
          <SgSlider movies={shuffle(actionMovies)} title='Action' Icon={PiFilmReelFill} />
          {/* <Promos /> */}
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
