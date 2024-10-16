import React from 'react'
import { FaCloudDownloadAlt, FaEdit } from 'react-icons/fa'
import { GoEye } from 'react-icons/go'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase"

const Text = 'text-sm text-left leading-6 whitespace-nowrap px-5 py-3'

function convertTime(created) {
    const date = new Date(created);
    return date.toLocaleString('en-US', {
        weekday: 'long', // "Sunday"
        year: 'numeric', // "2024"
        month: 'long', // "October"
        day: 'numeric', // "13"
        hour: 'numeric', // "10"
        minute: 'numeric', // "34"
    });
}

const Rows = (data, idx, users) => {
    return users ? (
        <tr key={idx}>
            {/* Users */}
            <td className={Text + ' truncate'}>{idx + 1}</td>
            <td className={`${Text}`}>
                <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
                    <img
                        src={data.image ? data.image : 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjQ4MTY5NzU2M15BMl5BanBnXkFtZTgwNDc5NTgwMTI@._V1_SY100_SX100_.jpg'}
                        alt={data.fullName}
                        className="h-full w-full object-cover"
                    />
                </div>
            </td>
            <td className={Text + ' truncate'}>{convertTime(data.date_joined)}</td>
            <td className={Text}>{data.username}</td>
            <td className={Text}>{data.email}</td>

        </tr>
    ) : (
        // Categories
        <tr key={idx}>
            <td className={Text + ' font-bold'}>{data.id ? data.id : '0909'}</td>
            <td className={Text + ' truncate'}>{convertTime(data.created)}</td>
            <td className={Text}>{data.title ? data.title : 'Title'}</td>
            <td className={Text + ' float-right flex-rows gap-2'}>

                <button className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2">
                    Edit <FaEdit className="text-green-500" />
                </button>
                <button className="bg-subMain text-white rounded flex-colo w-6 h-6">
                    <MdDelete />
                </button>
            </td>
        </tr>
    );
};

const Table2 = ({ data, users }) => {


    return (
        <div className='overflow-x-scroll overflow-hidden relative w-full'>
            <table className='w-full table-auto border border-border divide-y divide-border'>
                <thead>
                    <tr className='bg-dryGray'>
                        {
                            users ? (
                                <>
                                    <th scope='col' className={`${Head}`}>No</th>
                                    <th scope='col' className={`${Head}`}>image</th>
                                    <th scope='col' className={`${Head}`}>Date</th>
                                    <th scope='col' className={`${Head}`}>Full Name</th>
                                    <th scope='col' className={`${Head}`}>Email</th>

                                </>
                            ) : (
                                <>
                                    <th scope='col' className={`${Head}`}>ID</th>
                                    <th scope='col' className={`${Head}`}>Date</th>
                                    <th scope='col' className={`${Head}`}>Title</th>
                                    <th scope='col' className={`${Head} text-end`}>Actions</th>

                                </>

                            )

                        }


                    </tr>

                </thead>
                <tbody className="bg-main divide-y divide-gray-800">
                    {
                        data?.map((item, idx) => Rows(item, idx, users))
                    }
                </tbody>

            </table>

        </div>
    )
}

export default Table2
