import React, { useContext, useEffect } from 'react'
import SideBar from '../../SideBar'
import Table2 from '../../../Components/Table2'
import AuthContext from '../../../context/AuthContext'
import { useUsers } from '../../../utils/SWR'

const Users = () => {
    const { authTokens } = useContext(AuthContext)
    const users = useUsers(authTokens?.access).users

    useEffect(() => {
        document.title = `Users`

    }, [])
    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <div className="flex-btn gap-2">
                    <h2 className='text-xl font-bold'>Users</h2>

                </div>
                <Table2 data={users ? users : []} users={true}></Table2>
            </div>

        </SideBar>
    )
}

export default Users
