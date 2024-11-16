import React, { useEffect, useState } from 'react'
import Titles from '../Titles'
import { BsBook, BsBookmarkStarFill } from 'react-icons/bs'
import { Message, Select } from '../UserInputs'
import Rating from '../Star'
import Puff from "react-loading-icons/dist/esm/components/puff";
import axios from 'axios'


const IMDB_API = import.meta.env.VITE_IMDB_API
const MovieRates = ({ movie }) => {

  const [title, setTitle] = useState(null)
  const [reviews, setReviews] = useState(null)
  // const Ratings = [
  //   {
  //     title: "1 - Poor",
  //     value: 1,
  //   },
  //   {
  //     title: "2 - Good",
  //     value: 2,
  //   },
  //   {
  //     title: "3 - Very Good",
  //     value: 3,
  //   },
  //   {
  //     title: "4 - Excellent",
  //     value: 4,
  //   },
  //   {
  //     title: "5 - Masterpiece",
  //     value: 5,
  //   },
  // ]

  async function getReviews() {
    const title = movie?.link?.split("/")[movie?.link.split("/")?.length - 1]

    const response = await axios.get(`${IMDB_API}/reviews/${title}`)
    if (response.data) {
      setReviews(response.data.reviews)
    }

  }

  useEffect(() => {


    getReviews()


  }, [title, movie])

  return movie && (
    <div className='my-12'>
      <Titles title="Reviews" Icon={BsBookmarkStarFill}></Titles>
      <div className="gap-6">
        {
          reviews?.length == 0 ? (
            <div className="w-full mt-10 mx-auto rounded bg-dry border border-gray-800 p-6 text-center"> <p>No reviews yet</p></div>
          ) :

            (
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
            )}
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
      {/* <div className="mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-20 rounded">
        <div className="xl:col-span-2 w-full flex flex-col gap-8">
          <h3 className="text-xl text-text font-semibold">Review "{movie.title}"</h3>
          <p className="text-sm leading-7 font-medium text-border">Write a review for this movie. It will be posted on this page. lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec</p>
          <div className="text-sm w-full">
            <Select label="Select Rating" options={Ratings} onChange={(e) => setRating(e.target.value)}></Select>
            <div className="flex mt-4 text-lg gap-2 text-star">
              <Rating value={rating}></Rating>
            </div>
          </div>
          <Message label="Message" placeholder="Make it short and sweet ..."></Message>
          <button className="bg-subMain text-white py-3 w-full flex-colo rounded">Submit</button>
        </div>

      </div> */}

    </div>
  )
}

export default MovieRates
