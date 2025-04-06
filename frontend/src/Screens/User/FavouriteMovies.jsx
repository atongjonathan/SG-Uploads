import React, { useContext, useEffect, useState } from 'react'
import Table from '../../Components/Table'
import AuthContext from '../../context/AuthContext'
import axios from 'axios'
import { BACKEND_URL, MovieContext } from '../../context/MovieContext'
import Layout from '../../Layout/Layout'

const FavouriteMovies = () => {
  const movies = useContext(MovieContext).movies
  const [favourites, setFavourites] = useState(null)


  const { authTokens } = useContext(AuthContext)


  async function fetchUser() {

    const headers = { Authorization: `Bearer ${authTokens.access}` };

    const response = await axios.get(`${BACKEND_URL}/user`, { headers })
    const user = response?.data
    if (movies) {
      const favs = movies?.filter((movie) => user?.favourites.includes(movie.id))
      setFavourites(favs)
    }

  }



  useEffect(() => {



    fetchUser()
  }, [movies])

  return (
    <Layout>
      <div className="w-full min-h-screen container mx-auto">

        <div className="w-full items-start md:py-12 py-6">

          <div
            data-aos="fade-up" data-aos-duration="1000" data-aos-delay="10" data-aos-offset="100"

            className="rounded bg-dry border border-gray-800 p-6">
            <div className="flex flex-col gap-6">
              <div className="flex-btn gap-2">
                <h2 className='text-xl font-bold'>Favourite Movies</h2>
              </div>
              {
                favourites?.length > 0 ? <Table data={favourites} admin={false}></Table> :
                  (
                    <div className="col-span-6 rounded bg-dry border border-gray-800 p-6 text-center"> <p>No Favourite Movies</p></div>
                  )
              }

            </div>

          </div>

        </div>
      </div>


    </Layout>
  )
}

export default FavouriteMovies
