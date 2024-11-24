import React, { useContext, useMemo, useState } from 'react';
import Layout from '../Layout/Layout';
import Filters from '../Components/Filters';
import Movie from '../Components/Movie';
import { useSearchParams } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from 'react-loading-skeleton';
import SiteDown from '../Screens/Error/SiteDown'

function toTitleCase(str) {
  return str.toLowerCase().split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

const MoviesPage = () => {
  const { movies: allMovies, isLoading } = useContext(MovieContext);
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(4);

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
      <div className="min-height-screen container mx-auto px-2 my-3">
        <Filters categories={genresTuple} />
        {

          (filteredMovies && genresTuple.length > 0) &&

          <InfiniteScroll
            className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 grid-cols-2 gap-6 overflow-hidden"
            dataLength={filteredMovies.slice(0, page).length}
            next={handleLoadingMore}
            hasMore={hasMore}
            loader={<Skeleton baseColor="rgb(22 28 63)" height={270} containerClassName='w-full animate-pulse'></Skeleton>}

          >
            {filteredMovies.slice(0, page).map((movie, idx) => (
              <Movie key={idx} movie={movie} />
            ))}
          </InfiniteScroll>

        }
        {!hasMore && (
          <div className="w-full flex-colo md:my-20 my-10">
            <p>No more movies to load!</p>
          </div>
        )}

        {
          (!allMovies && !isLoading) && <SiteDown></SiteDown>
        }

        {
          isLoading && <Skeleton baseColor="rgb(22 28 63)" className='animate-pulse' containerClassName="animate-pulse" height={250}></Skeleton>
        }
      </div>
    </Layout>
  );
};

export default MoviesPage;
