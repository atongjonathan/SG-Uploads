import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import Promos from "../Components/Home/Promos";
import SgSlider from "../Components/Home/SgSlider";
import { BsCollectionFill, BsBookmarkStarFill } from "react-icons/bs";
import { PiFilmReelFill } from "react-icons/pi";
import Banner from "../Components/Home/Banner";
import { IoTime } from "react-icons/io5";
import { LazyLoadImage, trackWindowScroll }from 'react-lazy-load-image-component';


const HomeScreen = ({ children, scrollPosition }) => {
  document.title = `StreamGrid | Home`;

  let limit = 10
  const shuffle = true

  const sortedByDate = {
    ordering: "-releaseDate",
    limit

  }
  const RecentlyAdded = {
    ordering: "-created",
    limit

  }

  const sortedByRatingStar = {
    ordering: "-rating_star",
    limit
  }

  const actionMovies = {
    genre: "Action",
    limit,
    shuffle

  }
  const animation = {
    genre: "Animation",
    limit,
    shuffle

  }
  const horror = {
    genre: "Horror",
    limit,
    shuffle

  }


  return (
    <Layout>
      <div className="min-h-screen mb-6 lg:px-10 px-6">
        <>
          {children}
          <Banner />
          <SgSlider params={RecentlyAdded} title='Recently Added' Icon={IoTime} />
          <SgSlider params={sortedByDate} title='Latest Release' Icon={BsCollectionFill} />
          <SgSlider params={actionMovies} title='Action' Icon={PiFilmReelFill} />
          <SgSlider params={animation} title='Animation' Icon={PiFilmReelFill} />
          <SgSlider params={horror} title='Horror' Icon={PiFilmReelFill} />
          <SgSlider params={sortedByRatingStar} title='Top Rated' Icon={BsBookmarkStarFill} />
          <Promos />
        </>
      </div>

    </Layout>
  );
};

export default trackWindowScroll(HomeScreen);

