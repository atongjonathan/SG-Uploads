import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import Promos from "../Components/Home/Promos";
import SgSlider from "../Components/Home/SgSlider";
import { BsCollectionFill, BsBookmarkStarFill } from "react-icons/bs";
import { PiFilmReelFill } from "react-icons/pi";
import Banner from "../Components/Home/Banner";
import { useLocation } from "react-router-dom";



const HomeScreen = () => {
  document.title = `StreamGrid | Home`;

  let limit = 10

  const sortedByDate = {
    ordering: "-releaseDate",
    limit

  }

  const sortedByRatingStar = {
    ordering: "-rating_star",
    limit
  }

  const actionMovies = {
    genre: "Action",
    limit

  }
  const animation = {
    genre: "Animation",
    limit

  }
  const horror = {
    genre: "Horror",
    limit

  }


  return (
    <Layout>
      <div className="min-h-screen mb-6 lg:px-10 px-6">
        <>
          <Banner />
          <SgSlider params={sortedByDate} title='Trending' Icon={BsCollectionFill} />
          <SgSlider params={sortedByRatingStar} title='Top Rated' Icon={BsBookmarkStarFill} />
          <SgSlider params={actionMovies} title='Action' Icon={PiFilmReelFill} />
          <SgSlider params={animation} title='Animation' Icon={PiFilmReelFill} />
          <SgSlider params={horror} title='Horror' Icon={PiFilmReelFill} />
          <Promos />
        </>
      </div>

    </Layout>
  );
};

export default HomeScreen;
