import React from 'react'
import Layout from '../Layout/Layout'
import { useParams } from 'react-router-dom'
import MovieInfo from '../Components/Single/MovieInfo'
import { useMovies } from '../utils/SWR'
import LoadingIcons from 'react-loading-icons'


const SingleMovie = () => {
  const { id } = useParams()
  const { movies, isLoading } = useMovies()
  const movie = Array.isArray(movies)
    ? movies.find((movie) => movie.title === id)
    : null;  // Fallback if movies is not an array


  return (
    <Layout>
      {
        isLoading ?
          <div className="h-96 flex justify-center items-center">
            <LoadingIcons.Puff className="h-16 animate-pulse" speed={2} />
          </div> : movie ? <MovieInfo movie={movie}></MovieInfo>
            : <div className="h-96 flex flex-col justify-center items-center">
              <h3>Site down for planned maintenance...</h3>
              <p>We'll be back soon!</p>
            </div>

      }
    </Layout>
  )
}

export default SingleMovie
