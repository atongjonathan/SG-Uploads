import React, { useContext, useState } from 'react'
import SideBar from '../../SideBar'
import MovieContext from '../../../Data/MovieContext'
import { HiPlusCircle } from 'react-icons/hi'
import Table2 from '../../../Components/Table2'
import CategoryModal from '../../../Components/Modals/CategoryModal'

const Categories = () => {
    const data = useContext(MovieContext)
    const [modalOpen, setModalOpen] = useState(false)
    return (
        <SideBar>
            <CategoryModal modalOpen={modalOpen} setModalOpen={setModalOpen}></CategoryModal>
            <div className="flex flex-col gap-6">
                <div className="flex-btn gap-2">
                    <h2 className='text-xl font-bold'>Categories</h2>
                    <button onClick={()=> setModalOpen(true)} className="bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded">
                        <HiPlusCircle></HiPlusCircle>
                        Create</button>
                </div>
                <Table2 data={data.movies} users={false}></Table2>
                </div>

        </SideBar>
    )
}

export default Categories
