import React from 'react'
import { Input } from '../../../Components/UserInputs'
import SideBar from '../../SideBar'
import { FaSearch } from 'react-icons/fa'

const AddMovie = () => {
    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <div className="flex-btn gap-2">
                    <h2 className='text-xl font-bold'>Add Movie</h2>

                </div>
                <div className="col-span-3">
                    <form className="w-full text-sm bg-dryGray rounded flex-btn gap-4">
                        <button
                            type="submit"
                            className="bg-subMain w-12 flex-colo h-12 rounded text-white"
                        >
                            <FaSearch></FaSearch>
                        </button>
                        <input
                            type="text"
                            placeholder="Search Movie Name from here"
                            className="font-medium placeholder:text-border text-sm w-full h-12 bg-transparent border-none px-2 text-black"
                        ></input>
                    </form>
                </div>
            </div>

        </SideBar>
    )
}

export default AddMovie
