import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import Banner from "../Components/Home/Banner";
import PopularMovies from "../Components/Home/PopularMovies";
import Promos from "../Components/Home/Promos";
import TopRated from "../Components/Home/TopRated";
import { useMovies } from "../utils/SWR";
import Bars from "react-loading-icons/dist/esm/components/bars";

const HomeScreen = () => {
  document.title = `SG Uploads | Home`;

  const { movies, isLoading, error } = useMovies();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (movies)
      setLoaded(true); // Mark as loaded when movies are fetched
  }, [movies]);

  return (
    <Layout>
      {movies ? (
        <div className="container mx-auto min-h-screen px-2 mb-6">
          <Banner movies={movies} />
          <PopularMovies movies={movies} />
          <TopRated movies={movies} />
          <Promos />
        </div>
      ) : isLoading && !loaded ? (
        <div
          className="h-96 flex justify-center items-center"
        >
          <Bars className="h-16 animate-pulse" speed={2} />
        </div>
      ) : (
        <div className="text-center mt-4">Failed to load movies.</div>
      )}
    </Layout>
  );
};

export default HomeScreen;
