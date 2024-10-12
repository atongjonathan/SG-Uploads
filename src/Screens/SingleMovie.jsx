import React, { useContext } from 'react'
import Layout from '../Layout/Layout'
import { useParams } from 'react-router-dom'
import MovieContext from '../Data/MovieContext'
import MovieInfo from '../Components/Single/MovieInfo'
import MovieCasts from '../Components/Single/MovieCasts'
import MovieRates from '../Components/Single/MovieRates'
import Titles from '../Components/Titles'
import { BsCollectionFill } from 'react-icons/bs'
import Movie from '../Components/Movie';

const SingleMovie = () => {
  const { id } = useParams()
  const { movies } = useContext(MovieContext)
  const movie = Array.isArray(movies)
    ? movies.find((movie) => movie.title === id)
    : null;  // Fallback if movies is not an array

  const RelatesMovies = movies.filter((m) => m.genre[0] = movie.genre[0])
  return (
    <Layout>
      <MovieInfo movie={movie}></MovieInfo>
      <div className="container mx-auto min-h-screen px-2 my-6">
        <MovieCasts movie={movie} />
        <MovieRates movie={movie}></MovieRates>
        <div className="my-16">
          <Titles title="Related Movies" Icon={BsCollectionFill}></Titles>
          <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
            {
              RelatesMovies.map((movie, idx) => (
                <Movie key={idx} movie={movie}></Movie>
              ))
            }
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default SingleMovie
