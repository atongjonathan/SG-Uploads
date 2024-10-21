import React from 'react'
import { FaUserFriends } from 'react-icons/fa'
import Titles from '../Titles'


const MovieCasts = ({ movie }) => {
  return movie && (
    <div className="my-12">
      <Titles title="Cast" Icon={FaUserFriends}></Titles>
      <div className="mt-10">
        {
          movie?.actors?.map((actor, i) => (
            <div key={i} className="w-full p-3 italic text-xs text-text rounded flex-colo bg-dry border border-gray-800">
              <img src={movie.poster} alt={actor} className='w-full h-64 object-cover rounded mb-4' />
              <p>{actor}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MovieCasts
