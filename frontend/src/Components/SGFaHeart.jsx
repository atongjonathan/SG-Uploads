import React, { useState, useEffect, useContext, useCallback } from 'react';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'sonner';
import AuthContext from '../context/AuthContext';
import { Button } from '@headlessui/react';


const SGFaHeart = ({ movie }) => {
  const { authTokens, user } = useContext(AuthContext);

  const [isFavourite, setIsFavourite] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for managing button loading

  // Effect to sync state with the backend
  useEffect(() => {
    if (user && movie) {
      setIsFavourite(user.favourites?.includes(movie.id));
    }
  }, [user, movie]);

  const handleResponse = useCallback((response, successMessage, isFav) => {
    if (response.data) {
      toast.success(successMessage, {
        classNames: {
          toast: 'bg-subMain',
          title: 'text-white',
          closeButton: 'bg-subMain text-white hover:text-subMain',
        },
        closeButton: true,
      });
      setIsFavourite(isFav);
    } else {
      toast.error('Action failed. Please try again.', {
        classNames: {
          toast: 'bg-red-500',
          title: 'text-white',
          closeButton: 'bg-red-500 text-white hover:text-subMain',
        },
        closeButton: true,
      });
    }
    setIsLoading(false);
  }, []);

  const like = useCallback(async () => {
    setIsLoading(true);
    const response = await like(authTokens?.access, movie?.id);
    handleResponse(response, `Added '${movie?.title}' to favourites`, true);
  }, [authTokens, movie, handleResponse]);

  const unlike = useCallback(async () => {
    setIsLoading(true);
    const response = await unlike(authTokens?.access, movie?.id);
    handleResponse(response, `Removed '${movie?.title}' from favourites`, false);
  }, [authTokens, movie, handleResponse]);

  return (
    <>
      {!user ? (
        <Button
          onClick={() =>
            toast.info('Login to be able to save favourites', {
              classNames: {
                toast: 'bg-subMain',
                title: 'text-white',
                closeButton: 'bg-subMain text-white hover:text-subMain',
              },
              closeButton: true,
            })
          }
          className="bg-white hover:text-subMain transitions text-white px-4 py-3 rounded text-sm bg-opacity-30"
        >
          <FaHeart />
        </Button>
      ) : (
        <Button
          onClick={isFavourite ? unlike : like}
          title={isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
          disabled={isLoading} // Disable button during loading
          className={`bg-white transitions px-4 py-3 rounded text-sm bg-opacity-30 ${
            isFavourite ? 'text-subMain hover:text-white' : 'text-white hover:text-subMain'
          }`}
        >
          <FaHeart />
        </Button>
      )}
    </>
  );
};

export default SGFaHeart;
