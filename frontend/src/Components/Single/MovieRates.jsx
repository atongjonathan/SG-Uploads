import React, { useEffect, useState } from 'react'
import Titles from '../Titles'
import { BsBook, BsBookmarkStarFill } from 'react-icons/bs'
import { Message, Select } from '../UserInputs'
import Rating from '../Star'

const IMDB_API = import.meta.env.VITE_IMDB_API
const MovieRates = ({ movie }) => {

  const [title, setTitle] = useState(null)
  const [reviews, setReviews] = useState([])
  const Ratings = [
    {
      title: "1 - Poor",
      value: 1,
    },
    {
      title: "2 - Good",
      value: 2,
    },
    {
      title: "3 - Very Good",
      value: 3,
    },
    {
      title: "4 - Excellent",
      value: 4,
    },
    {
      title: "5 - Masterpiece",
      value: 5,
    },
  ]
  const [rating, setRating] = useState(null)



  useEffect(() => {

    const title = movie?.link?.split("/")[movie?.link.split("/")?.length - 1]

    fetch(`${IMDB_API}/reviews/${title}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reviews)
      })
      .catch((err) => console.log(err))


  }, [movie])

  return movie && (
    <div className='my-12'>
      <Titles title="Reviews" Icon={BsBookmarkStarFill}></Titles>
      <div className="col-span-3 flex flex-col gap-6">
        <h3 className="text-xl text-text font-semibold"></h3>
        <div className="w-full flex flex-col bg-main gap-6 rounded-lg md:p-12 p-6 h-header overflow-y-scroll">
          {
            reviews?.splice(0, 5).map((review, idx) => (
              <div key={idx} className="md:grid flex flex-col w-full grid-cols-12 gap-6 bg-dry p-4 border border-gray-800 rounded-lg">
                <div className="col-span-2 bg-main hidden md:block">
                  <img src="https://images-na.ssl-images-amazon.com/images/M/MV5BMjQ4MTY5NzU2M15BMl5BanBnXkFtZTgwNDc5NTgwMTI@._V1_SY100_SX100_.jpg" alt={review.author} className="w-full h-24 rounded-lg object-cover" />
                </div>
                <div className="col-span-7 flex flex-col gap-2">
                  <h2>{review.author}</h2>
                  <p className="text-xs leading-6 font-medium text-text">{review.heading}</p>
                </div>
                <div className="col-span-3 flex flex-rows border-l border-border text-xs gap-1 text-star">
                  <Rating value={review.stars / 2}></Rating>
                </div>
              </div>

            ))
          }
        </div>
      </div>
      <div className="mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-20 rounded">
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

      </div>

    </div>
  )
}

export default MovieRates
