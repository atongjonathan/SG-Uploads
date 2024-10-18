import React, { useContext, useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import Filters from '../Components/Filters'
import Movie from '../Components/Movie'
import { useMovies } from '../utils/SWR';

const MoviesPage = () => {
  const movies = useMovies().movies

  const maxpage = 2
  const [page, setPage] = useState(maxpage)

  function HandleLoadingMore() {
    setPage(page + maxpage)

  }

  useEffect(()=>{
    document.title = `All Movies`

}, [])
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Filters />
        <p className='text-lg font-medium my-6'>
          Total <span className=' font-bold test-subMain'>{movies?.length}</span>
        </p>
        <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
          {
            movies?.slice(0, page)?.map((movie, idx) =>
            (
              <Movie key={idx} movie={movie}></Movie>
            ))
          }
        </div>
        <div className="w-full flex-colo md:my-20 my-10">
          <button onClick={HandleLoadingMore} className='flex-rows gap-3 text-white py-3 px-8 rounded font-semibold border-2 border-subMain'>
            Load More ? 
            {/* <CgSpinner className="animate-spin"></CgSpinner> */}
          </button>
        </div>
      </div>

    </Layout>
  )
}

export default MoviesPage
