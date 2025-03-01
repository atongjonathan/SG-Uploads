import React, { useContext, useEffect, useState } from 'react'
import Titles from '../Titles'
import { BsBookmarkStarFill } from 'react-icons/bs'
import Rating from '../Star'
import Puff from "react-loading-icons/dist/esm/components/puff";
import axios from 'axios'
import { Disclosure, DisclosureButton, DisclosurePanel, Button } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid';
import Backend from '../../utils/Backend'
import AuthContext from '../../context/AuthContext';

const MovieRates = ({ movie }) => {

  const [reviews, setReviews] = useState(null)
  const [reviewItems, setReviewItems] = useState(6);
  const { authTokens } = useContext(AuthContext)
  const auth = authTokens?.access


  async function getReviews() {
    let splitted = movie?.link?.split("/").reverse()
    if (splitted?.length > 0) {
      const title = splitted[0]
      if (title.startsWith("t")) {
        const response = await Backend().updateReviews(auth, title, movie.id)
        if (response.status === 200) {
          let reviewsData = response.data
          setReviews(reviewsData)
        }
        return

      }
    }
    setReviews([])
  }

  useEffect(() => {

    if (movie?.reviews) {
      setReviews(movie?.reviews)
    }
    else {
      getReviews()
    }



  }, [movie?.title])



  return (
    <>
      {

        reviews?.length > 0 ?

          (<div className='my-12'>
            <Titles title="Reviews" Icon={BsBookmarkStarFill}></Titles>
            <div className="gap-6">

              <div className="grid grid-cols-2 bg-main gap-6 rounded-lg md:p-12 p-6 h-header">
                {
                  reviews?.sort((a, b) => b.stars - a.stars).slice(0, reviewItems).map((review, idx) => review.heading && (
                    (
                      <div key={idx} className="lg:col-span-1 col-span-2 flex flex-col gap-1 bg-dry p-4 border border-gray-800 rounded-lg align-middle text-center h-fit">
                        <div className="flex flex-col">
                          <h2 className='text-sm lg:text-md truncate text-text'>~ {review.author} ~</h2>
                          {
                            review.content ? (
                              <Disclosure>
                                <DisclosureButton className="py-2 group flex flex-col w-full items-center gap-1 text-sm"> {review.heading}

                                  <ChevronDownIcon className="size-5 transition duration-300 ease-out fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />

                                </DisclosureButton>
                                <DisclosurePanel transition className="text-xs transitions leading-6 text-text origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0 ">
                                  {review.content ?? review.heading}
                                </DisclosurePanel>
                              </Disclosure>
                            ) : (
                              <p className="text-xs leading-6 text-text">{review.heading}</p>

                            )
                          }
                        </div>
                        <div className="flex flex-rows  mt-2 text-xs gap-1 text-star">
                          <Rating value={review.stars / 2}></Rating>
                        </div>
                      </div>
                    )
                  ))
                }
              </div>
            </div>
            {
              reviewItems < reviews.length && <div className='px-10 flex justify-center w-full'>
                <Button onClick={() => {
                  setReviewItems((items) => items + 6)
                }} className=" flex justify-center flex-col bg-main gap-6  h-header p-3 cursor-pointer rounded-2xl border border-gray-800 hover:bg-subMain transitions">More Reviews</Button>
              </div>
            }
          </div>)
          :

          !reviews && <div style={
            {
              alignItems: 'center'
            }
          } className='w-full flex justify-center flex-col bg-main gap-6 rounded-lg md:p-12 p-6 h-header'>
            <Puff className='col-span-7 '></Puff>
          </div>
      }


    </>


  )
}

export default MovieRates
