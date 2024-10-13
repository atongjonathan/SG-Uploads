import React, { useContext } from 'react'
import SideBar from '../../SideBar'
import MovieContext from '../../../Data/MovieContext'
import { HiPlusCircle } from 'react-icons/hi'
import Table2 from '../../../Components/Table2'

const Users = () => {
    const data = useContext(MovieContext)
    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <div className="flex-btn gap-2">
                    <h2 className='text-xl font-bold'>Users</h2>
                   
                </div>
                <Table2 data={data.movies} users={true}></Table2>
                </div>

        </SideBar>
    )
}

export default Users
