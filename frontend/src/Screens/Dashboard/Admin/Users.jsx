import React, { useContext } from 'react'
import SideBar from '../../SideBar'
import { HiPlusCircle } from 'react-icons/hi'
import Table2 from '../../../Components/Table2'
import { useUser, useUsers } from '../../../utils/SWR'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'

const Users = () => {
    const authHeader = useAuthHeader()
    const response = useUsers(authHeader)
    console.log(response.users)
    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <div className="flex-btn gap-2">
                    <h2 className='text-xl font-bold'>Users</h2>
                   
                </div>
                <Table2 data={response.users? response.users : []} users={true}></Table2>
                </div>

        </SideBar>
    )
}

export default Users
