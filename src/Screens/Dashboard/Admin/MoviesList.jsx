import React, { useContext } from 'react'
import SideBar from '../../SideBar'
import Table from '../../../Components/Table'
import MovieContext from '../../../Data/MovieContext'

const MoviesList = () => {
  const data = useContext(MovieContext)
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className='text-xl font-bold'>Movies List</h2>
          <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded">Delete All</button>
        </div>
        <Table data={data.movies} admin={true}></Table>

      </div>

    </SideBar>
  )
}

export default MoviesList
