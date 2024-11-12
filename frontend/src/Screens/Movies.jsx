import React, { useContext, useEffect, useMemo, useState, useCallback } from 'react';
import Layout from '../Layout/Layout';
import Filters from '../Components/Filters';
import Movie from '../Components/Movie';
import { useSearchParams } from 'react-router-dom';
import LoadingIcons from 'react-loading-icons';
import { MovieContext } from '../context/MovieContext';
import InfiniteScroll from "react-infinite-scroll-component";

function toTitleCase(str) {
  return str.toLowerCase().split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

const MoviesPage = () => {
  const { movies: allMovies, isLoading } = useContext(MovieContext); // Destructure from SWR hook
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(4); // This is the number of movies to load

  // Extract genres as a unique tuple from all movies
  const genresTuple = useMemo(() => {
    if (!allMovies) return [];
    const genresList = allMovies.flatMap(movie => movie.genre);
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
      setPage(prevPage => prevPage + 4); // Increase the page count by 4 movies per load
    }, 1500);
  };

  // Dynamically check if there are more movies to load
  const hasMore = filteredMovies.length > page;

  document.title = 'All Movies';

  return (
    <Layout>
      {
        (filteredMovies && genresTuple.length > 0) &&
        (<div className="min-height-screen container mx-auto px-2 my-3">
          <Filters categories={genresTuple} />

          <p className='text-lg font-medium my-6'>
            Total <span className='font-bold text-subMain'>{filteredMovies.length}</span>
          </p>

          <InfiniteScroll
            className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 grid-cols-2 gap-6 overflow-hidden"
            dataLength={filteredMovies.slice(0, page).length}
            next={handleLoadingMore}
            hasMore={hasMore}
            loader={
              <div className="w-screen ml-4 bg-main flex justify-center items-center">
                <LoadingIcons.Puff className="h-16 animate-pulse" speed={2} />
              </div>}
          >
            {filteredMovies.slice(0, page).map((movie, idx) => (
              <Movie key={idx} movie={movie} />
            ))}
          </InfiniteScroll>

          {hasMore ? null : (
            <div className="w-full flex-colo md:my-20 my-10">
              <p>No more movies to load!</p>
            </div>
          )}
        </div>)
      }

      {
        !allMovies && <div className="h-96 flex flex-col justify-center items-center">
          <h3>Site down for planned maintenance...</h3>
          <p>We'll be back soon!</p>
        </div>
      }

    </Layout>
  );
};

export default MoviesPage;
