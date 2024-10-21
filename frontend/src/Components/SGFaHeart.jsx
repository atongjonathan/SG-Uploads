import React, { useState, useEffect, useContext } from 'react';
import { FaHeart } from 'react-icons/fa';
import Backend from '../utils/Backend';
import { toast } from 'sonner';
import AuthContext from '../context/AuthContext';
import { useUser } from '../utils/SWR';

const backend = Backend();

const SGFaHeart = ({ movie }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const { authTokens } = useContext(AuthContext)

  const user = useUser(authTokens?.access)?.user;


  // Effect to sync component state with user's favourites from the backend
  useEffect(() => {
    if (user && movie) {
      setIsFavourite(user.favourites?.includes(movie));
    }
  }, [user]);

  const like = async (id) => {
    const response = await backend.like(authTokens?.access, movie?.id);
    if (response.data) {
      toast(`Added '${movie?.title}' to favourites`, {
        classNames: {
          toast: 'bg-subMain',
          title: 'text-white',
          closeButton: 'bg-subMain text-white hover:text-subMain',
        },
        closeButton:true
      });
      setIsFavourite(true); // Update state to re-render
    }
    else {
      unlike(id)
    }
  };

  const unlike = async (id) => {
    const response = await backend.unlike(authTokens?.access, movie?.id);
    if (response.data) {
      toast(`Removed '${movie?.title}' from favourites`, {
        classNames: {
          toast: 'bg-subMain',
          title: 'text-white',
          closeButton: 'bg-subMain text-white hover:text-subMain',
        },
        closeButton:true

      },
    );
      setIsFavourite(false);
    }
    else {
      like(id)
    }
  };



  return (
    <>
      {
        !user ? (
          <button
            onClick={() =>
              toast('Login to be able to save favourites', {
                classNames: {
                  toast: 'bg-subMain',
                  title: 'text-white',
                  closeButton: 'bg-subMain text-white hover:text-subMain',
                },
                closeButton:true
              })
            }
            className="bg-white hover:text-subMain transitions text-white px-4 py-3 rounded text-sm bg-opacity-30"
          >
            <FaHeart />
          </button>
        ) : isFavourite ? (
          <button
            onClick={() => unlike(movie)}
            title="Remove from Favourites"
            className="bg-white hover:text-white transitions text-subMain px-4 py-3 rounded text-sm bg-opacity-30"
          >
            <FaHeart />
          </button>
        ) : (
          <button
            onClick={() => like(movie)}
            title="Add to Favourites"
            className="bg-white hover:text-subMain transitions text-white px-4 py-3 rounded text-sm bg-opacity-30"
          >
            <FaHeart />
          </button>
        )
      }

    </>
  );
};

export default SGFaHeart;
