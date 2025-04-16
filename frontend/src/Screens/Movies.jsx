import React, { useContext, useMemo, useState } from 'react';
import Layout from '../Layout/Layout';
import { useSearchParams } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import Skeleton from 'react-loading-skeleton';
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
      <TanstackTable/>
    </Layout>
  );
};

export default MoviesPage;
