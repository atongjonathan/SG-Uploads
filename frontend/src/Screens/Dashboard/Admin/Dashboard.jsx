import React, { useContext, useEffect } from 'react'
import SideBar from '../../SideBar'
import { FaRegListAlt, FaUser } from 'react-icons/fa'
import Table from '../../../Components/Table'
import { useUsers } from '../../../utils/SWR'
import Table2 from '../../../Components/Table2'
import AuthContext from '../../../context/AuthContext'
import { MovieContext } from '../../../context/MovieContext'

const Dashboard = () => {

    const movies = useContext(MovieContext).movies
    const { authTokens } = useContext(AuthContext)
    const { users } = useUsers(authTokens?.access)
    const DashboardData = [
        {
            bg: "bg-orange-600",
            icon: FaRegListAlt,
            title: "Total Movies",
            total: movies?.length
        },
        {
            bg: "bg-green-600",
            icon: FaUser,
            title: "Total Users",
            total: users?.length
        },
    ]
    document.title = `Dashboard`

    return (
        <SideBar>
            <h2 className='text-xl font-semibold'>Dashboard</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {DashboardData.map((data, idx) => (
                    <div key={idx} className="p-4 rounded bg-main border-border grid grid-cols-4 gap-2">
                        <div className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}>
                            <data.icon></data.icon>
                        </div>
                        <div className="col-span-3">
                            <h2 className=" mt-2 font-bold">{data.title}</h2>
                            <p className="l">{data.total}</p>
                        </div>

                    </div>
                ))}
            </div>
            <h3 className='text-md font-medium my-6 text-border'>Recent Movies</h3>
            <Table data={movies?.slice(0, 5)} admin={true}></Table>
            <h3 className='text-md font-medium my-6 text-border'>Recent Users</h3>
            <Table2 data={users?.slice(0, 5)} users={true}></Table2>
        </SideBar>
    )
}

export default Dashboard
