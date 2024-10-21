import React from 'react'
import { FaUserFriends } from 'react-icons/fa'
import Titles from '../Titles'


const MovieCasts = ({ movie }) => {
  return movie && (
    <div className="my-2">
      <div className='w-full flex sm:gap-5 gap-4 justify-start items-center'>
        <FaUserFriends className="sm:w-6 sm:h-6 w-4 h-4 text-subMain"></FaUserFriends>
        <h2 className="hidden font-bold text-lg lg:inline-block">Staring:</h2>
        <div className="flex">
          {
            movie?.actors?.map((actor, i) => (
              <div key={i} className="p-3 italic text-xs lg-text-xl text-text rounded flex-rows bg-dry border border-gray-800">
                <p>{actor}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default MovieCasts
