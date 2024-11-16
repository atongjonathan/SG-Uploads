import React, { useContext, useState } from 'react'
import SideBar from '../../SideBar'
import Table from '../../../Components/Table'
import { MovieContext } from '../../../context/MovieContext'
import { FaSearch } from 'react-icons/fa'

const MoviesList = () => {
  const movies = useContext(MovieContext).movies
  const [isResults, setResults] = useState(movies);


  document.title = `Movies List`

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (query == '') {
      setResults(movies)
    }
    else {
      const filtered = movies.filter(movie =>
        movie.title.toLowerCase().includes(query)
      );

      setResults(filtered);
    }

  };

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className='text-xl font-bold'>Movies List</h2>
          <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded">Delete All</button>
        </div>
        <form className="w-full text-sm bg-dryGray rounded flex-btn gap-4">
            <button type="button" className="bg-subMain w-12 flex-colo h-12 rounded text-white">
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search Movie Name from here"
              className="font-medium placeholder:text-border text-sm w-full h-12 bg-transparent border-none px-2 text-black"
              onInput={handleSearch}
            />
          </form>
        {isResults && <Table data={isResults} admin={true}></Table>}
      </div>

    </SideBar>
  )
}

export default MoviesList
