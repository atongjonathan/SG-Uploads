import React from 'react'
import { FaHeart } from 'react-icons/fa'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useUser } from '../utils/SWR';
import Backend from '../utils/Backend';

const backend = Backend()

const SGFaHeart = ({ movie }) => {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  let user = null;
  let response = null;

  if (auth) {
    response = useUser(authHeader);
    user = response.user;
  }

  const like = async (id) => {
      const response = await backend.like(authHeader, id);
      console.log(response)
      alert("Liked");
      console.log(id);

  }

  const unlike = async (id) => {
    try {
      await backend.unlike(authHeader, id);
      alert("Unliked");
      console.log(id);
    } catch (error) {
      console.error("Error unliking the movie:", error);
      alert("An error occurred while unliking the movie.");
    }
  }

  if (response?.error) {
    return (
      <button onClick={() => alert("An error occurred")} className="bg-white hover:text-subMain transitions text-white px-4 py-3 rounded text-sm bg-opacity-30">
        <FaHeart />
      </button>
    );
  }

  if (!user) {
    return (
      <button onClick={() => alert("Login to save favourites")} className="bg-white hover:text-subMain transitions text-white px-4 py-3 rounded text-sm bg-opacity-30">
        <FaHeart />
      </button>
    );
  }

  return (
    <>
      {user?.favourites?.includes(movie?.id) ? (
        <button
          onClick={() => unlike(movie?.id)} title='Remove from Favourites'
          className="bg-white hover:text-white transitions text-subMain px-4 py-3 rounded text-sm bg-opacity-30"
        >
          <FaHeart />
        </button>
      ) : (
        <button
          onClick={() => like(movie?.id)} title='Add to Favourites'
          className="bg-white hover:text-subMain transitions text-white px-4 py-3 rounded text-sm bg-opacity-30"
        >
          <FaHeart /> 
        </button>
      )}
    </>
  );
}

export default SGFaHeart;
