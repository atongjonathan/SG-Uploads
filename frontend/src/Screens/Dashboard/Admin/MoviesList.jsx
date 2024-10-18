import React, { useContext } from 'react'
import SideBar from '../../SideBar'
import Table from '../../../Components/Table'
import { useMovies } from '../../../utils/SWR'

const MoviesList = () => {
  const movies = useMovies().movies

  useEffect(()=>{
    document.title = `Movies List`

}, [])
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className='text-xl font-bold'>Movies List</h2>
          <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded">Delete All</button>
        </div>
        {movies && <Table data={movies} admin={true}></Table>}
      </div>

    </SideBar>
  )
}

export default MoviesList
