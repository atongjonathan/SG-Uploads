import React from 'react'
import SideBar from '../../SideBar'
import { FaRegListAlt, FaUser } from 'react-icons/fa'
import { HiViewGridAdd } from 'react-icons/hi'
import Table from '../../../Components/Table'
import { useMovies, useUsers } from '../../../utils/SWR'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import Table2 from '../../../Components/Table2'

const Dashboard = () => {

    const movies = useMovies().movies
    const auth = useAuthHeader()
    const users = useUsers(auth)?.users
    const DashboardData = [
        {
            bg:"bg-orange-600", 
            icon:FaRegListAlt,
            title:"Total Movies",
            total:4
        },
        {
            bg:"bg-green-600", 
            icon:FaUser,
            title:"Total Users",
            total:4
        },
    ]
    useEffect(()=>{
        document.title = `Dashboard`

    }, [])
  return (
    <SideBar>
        <h2 className='text-xl font-semibold'>Dashboard</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {DashboardData.map((data, idx)=>(
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
      <Table data={movies?.slice(0,5)} admin={true}></Table>
      <h3 className='text-md font-medium my-6 text-border'>Recent Users</h3>
      <Table2 data={users?.slice(0,5)} users={true}></Table2>
    </SideBar>
  )
}

export default Dashboard
