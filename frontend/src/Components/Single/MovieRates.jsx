import React, { useEffect, useState } from 'react'
import Titles from '../Titles'
import { BsBookmarkStarFill } from 'react-icons/bs'
import Rating from '../Star'
import Puff from "react-loading-icons/dist/esm/components/puff";
import axios from 'axios'


const IMDB_API = import.meta.env.VITE_IMDB_API
const MovieRates = ({ movie }) => {

  const [reviews, setReviews] = useState(null)

  async function getReviews() {
    const title = movie?.link?.split("/")[movie?.link.split("/")?.length - 1]

    const response = await axios.get(`${IMDB_API}/reviews/${title}`)
    if (response.data) {
      setReviews(response.data.reviews)
    }

  }

  useEffect(() => {


    getReviews()


  }, [movie])

  return movie && (
    <>
      {

        (reviews?.length > 0) &&

        (<div className='my-12'>
          <Titles title="Reviews" Icon={BsBookmarkStarFill}></Titles>
          <div className="gap-6">

            <div className="grid grid-cols-4 col-span-1 bg-main gap-6 rounded-lg md:p-12 p-6 h-header">
              {
                reviews?.splice(0, 6).map((review, idx) => (
                  <div key={idx} className="lg:col-span-1 col-span-2 flex flex-col gap-2 bg-dry p-2 border border-gray-800 rounded-lg align-middle text-center">
                    <div className="flex flex-col gap-2">
                      <h2 className='text-sm lg:text-md truncate'>{review.author}</h2>
                      <p className="text-xs leading-6 font-medium text-text">{review.heading}</p>
                    </div>
                    <div className="flex flex-rows  mt-2 text-xs gap-1 text-star">
                      <Rating value={review.stars / 2}></Rating>
                    </div>
                  </div>

                ))
              }
            </div>

            {

              !reviews && (<div style={
                {
                  alignItems: 'center'
                }
              } className='w-full flex justify-center flex-col bg-main gap-6 rounded-lg md:p-12 p-6 h-header'>
                <Puff className='col-span-7 '></Puff>
              </div>)
            }


          </div>

        </div>)
      }
    </>


  )
}

export default MovieRates
