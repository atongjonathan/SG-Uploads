import React from 'react'
import { useAuth } from '../../context/AuthContext'
import Movie from '../../Components/Movie'

const WatchList = () => {
    const { user } = useAuth()

    return user && (
        <div className="flex flex-col xl:px-2 gap-5">
            <div className="flex w-full justify-between items-center gap-2 px-1 xl:px-2">
                <span className="text-lg xl:text-xl 2xl:text-2xl font-semibold">Watch List</span>
                {/* <a className="ring-1 ring-gray-500 lg:ring-gray-400 hover:bg-white/5 px-3 rounded-full py-1 text-xs 2xl:text-sm text-gray-400 xl:font-medium" href="/history">view all</a> */}
            </div>
            <div className="flex overflow-x-auto no-scrollbar  flex-nowrap">
            {
                user.plan.length > 0 ?
                    user.plan.map((movie) => (
                        <div 
                        className="min-w-[150px] sm:min-w-[180px] md:min-w-[200px] p-2 rounded-xl overflow-hidden hover:bg-white/5 transition-all cursor-pointer"
                        >
                            <Movie movie={movie} />
                        </div>

                    )) :
                    (
                        <div className="w-full h-20 sm:h-24 lg:h-28 shrink-0 relative text-gray-400 flex items-center justify-center">You haven't added anything yet !</div>
                    )
            }
            </div>



         
        </div>


        // </div>
    )
}

export default WatchList
