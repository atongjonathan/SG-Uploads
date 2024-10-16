import React, { useContext } from 'react'
import SideBar from './SideBar'
import Table from '../Components/Table'
import { useUser } from '../utils/SWR'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'

const FavouriteMovies = () => {
  const data = useContext(MovieContext)
  const auth = useAuthHeader()
  const user = useUser(auth)?.user
  const favourites = data.movies.filter((movie) => user.favourites.includes(movie.id))
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className='text-xl font-bold'>Favourite Movies</h2>
        </div>
        {
          favourites.length > 0 ? <Table data={ favourites} admin={false}></Table> : 
          (
            <div className="col-span-6 rounded bg-dry border border-gray-800 p-6 text-center"> <p>No Favourite Movies</p></div>
          )
        }

      </div>

    </SideBar>
  )
}

export default FavouriteMovies
