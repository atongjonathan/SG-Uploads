import React, { useContext, useEffect } from 'react'
import Layout from '../Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import MovieInfo from '../Components/Single/MovieInfo'
import LoadingIcons from 'react-loading-icons'
import { MovieContext } from '../context/MovieContext'
import Skeleton from 'react-loading-skeleton'


const SingleMovie = () => {
  const { id } = useParams()
  const { movies, isLoading } = useContext(MovieContext)
  const movie = Array.isArray(movies)
    ? movies.find((movie) => movie.title === id)
    : null;  // Fallback if movies is not an array

  const navigate = useNavigate()
  useEffect(() => {
    navigate("/watch/" + id)

  })

  return (
    <Layout>
      {
        movie ? <MovieInfo movie={movie}></MovieInfo>
          :
          <Skeleton baseColor="rgb(22 28 63)" className='' height={300} containerClassName=""></Skeleton>


      }
    </Layout>
  )
}

export default SingleMovie
