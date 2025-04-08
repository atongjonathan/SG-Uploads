import React, { useContext, useMemo, useState } from 'react';
import Layout from '../Layout/Layout';
import Filters from '../Components/Filters';
import Movie from '../Components/Movie';
import { useSearchParams } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from 'react-loading-skeleton';
import SiteDown from '../Screens/Error/SiteDown'
import { FaHeart } from 'react-icons/fa';
import loader from '../../images/loading_image.gif'
import TanstackTable from '../Layout/TanstackTable';

function toTitleCase(str) {
  return str.toLowerCase().split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

const Loader = () => {
  return (
    Array.from({ length: 6 }, (x, i) => i).map((item) => (
       <Skeleton
          baseColor="rgb(11 15 41)"
          containerClassName="absolute top-0 left-0 w-full h-full animate-pulse rounded-lg "
          height={200}
        />
    ))
  )
}

const MoviesPage = () => {
  const { movies: allMovies, isLoading } = useContext(MovieContext);
  const [searchParams] = useSearchParams();
  const moviesNo = 6
  const [page, setPage] = useState(moviesNo);

  // Extract genres as a unique tuple from all movies
  const genresTuple = useMemo(() => {
    // if (!allMovies) return [];
    const genresList = allMovies?.flatMap(movie => movie.genre);
    return [...new Set(genresList)];
  }, [allMovies]);

  // Parse search params into an object
  const params = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);

  // Filter movies based on search parameters
  const filteredMovies = useMemo(() => {
    if (!allMovies) return [];

    let movies = [...allMovies];

    if (params.category && !params.category.includes("Sort")) {
      movies = movies.filter(m => m.genre.includes(toTitleCase(params.category)));
    }
    if (params.rates && !params.rates.includes("Sort")) {
      movies = movies.filter(m => Math.ceil(m.rating.star / 2).toString() === params.rates);
    }
    if (params.year && !params.year.includes("Sort")) {
      movies = movies.filter(m => m.year.toString() === params.year);
    }
    if (params.times && !params.times.includes("Sort")) {
      const maxTime = parseFloat(params.times.replace('< ', ''));
      movies = movies.filter(m => {
        const movieTimeInHours = m.runtimeSeconds / 3600;
        return movieTimeInHours < maxTime && movieTimeInHours > maxTime - 1;
      });
    }

    return movies;
  }, [allMovies, params]);

  const handleLoadingMore = () => {
    // Simulating an API call to load more data
    setTimeout(() => {
      setPage(prevPage => prevPage + 6); // Increase the page count by 4 movies per load
    }, 1500);
  };

  // Dynamically check if there are more movies to load
  const hasMore = filteredMovies?.length > page

  document.title = 'All Movies';

  return (
    <Layout>
      {/* <div className="min-height-screen container mx-auto px-2 my-3">
        <Filters categories={genresTuple} />
        {

          (filteredMovies && genresTuple.length > 0) &&

          <InfiniteScroll
            className="grid sm:mt-10 mt-6 xl:grid-cols-6 lg:grid-cols-6 md:grid-cols-5 grid-cols-3 gap-6 overflow-hidden"
            dataLength={filteredMovies.slice(0, page).length}
            next={handleLoadingMore}
            hasMore={hasMore}
            loader={
              <Loader />
            }

          >
            {filteredMovies.slice(0, page).map((movie, idx) => (
              <Movie key={idx} movie={movie} />
            ))}
          </InfiniteScroll>

        }


        {
          (!allMovies && !isLoading) && <SiteDown></SiteDown>
        }

     
        {!hasMore && allMovies?.length > 0 && (
          <div className="w-full flex-colo md:my-20 my-10">
            <p>No more movies to load!</p>
          </div>
        )}
      </div> */}
      <TanstackTable/>
    </Layout>
  );
};

export default MoviesPage;
