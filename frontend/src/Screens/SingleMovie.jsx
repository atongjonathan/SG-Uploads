import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import { useParams } from 'react-router-dom'
import MovieInfo from '../Components/Single/MovieInfo'
import { useMovies } from '../utils/SWR'

const SingleMovie = () => {
  const { id } = useParams()
  const { movies } = useMovies()
  const movie = Array.isArray(movies)
    ? movies.find((movie) => movie.title === id)
    : null;  // Fallback if movies is not an array


    useEffect(()=>{
      document.title = movie?.title

  }, [])

  return (
    <Layout>
      <MovieInfo movie={movie}></MovieInfo>
    </Layout>
  )
}

export default SingleMovie
