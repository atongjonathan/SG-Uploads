import React from 'react'
import { FaHeart } from 'react-icons/fa'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useUser } from '../utils/SWR';
import Backend from '../utils/Backend';
import { toast } from 'sonner'


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
    toast("Liked", {
      classNames: {
        toast: 'bg-subMain',
        title: 'text-white',
        closeButton: 'bg-subMain text-white hover:text-subMain',
      },
    });

  }

  const unlike = async (id) => {
    await backend.unlike(authHeader, id);
    toast("Unliked", {
      classNames: {
        toast: 'bg-subMain',
        title: 'text-white',
        closeButton: 'bg-subMain text-white hover:text-subMain',
      },
    });

  }


    if (response?.error) {
      return (
        <button onClick={() => toast("An error occurred")} className="bg-white hover:text-subMain transitions text-white px-4 py-3 rounded text-sm bg-opacity-30">
          <FaHeart />
        </button>
      );
    }

    if (!user) {
      return (
        <button onClick={() => toast("Login to be able to save favourites", {
          classNames: {
            toast: 'bg-subMain',
            title: 'text-white',
            closeButton: 'bg-subMain text-white hover:text-subMain',
          }
        })} className="bg-white hover:text-subMain transitions text-white px-4 py-3 rounded text-sm bg-opacity-30">
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
