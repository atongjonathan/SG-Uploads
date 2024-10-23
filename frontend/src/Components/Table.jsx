import React from 'react'
import { FaCloudDownloadAlt, FaEdit } from 'react-icons/fa'
import { GoEye } from 'react-icons/go'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'
import SGFaHeart from './SGFaHeart'

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase"
const Text = 'text-sm text-left leading-6 whitespace-nowrap px-5 py-3'
const Rows = (movie, idx, admin) =>
(
    <tr key={idx}>
        <td className={`${Text}`}>
            <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
                <img src={movie.poster} alt={movie.title} className='h-full w-full object-cover' />
            </div>
        </td>
        <td className={Text + ' truncate'}>{movie.title}</td>
        <td className={Text + ' truncate'}>{movie.genre[0]}</td>
        <td className={Text}>{movie.spokenLanguages[0].language}</td>
        <td className={Text}>{movie.year}</td>
        <td className={Text}>{movie.runtime}</td>
        <td className={Text + ' float-right flex-rows gap-2'}>
            {
                admin ? (
                    <>
                        <button className='border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2'>
                            Edit <FaEdit className='text-green-500'></FaEdit>
                        </button>
                        <button className='bg-subMain text-white rounded flex-colo w-6 h-6'> <MdDelete></MdDelete></button>
                    </>
                ) : (
                    <>
                        <Link to={movie.stream.replace('video', 'dl')}  className='border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2'>
                            Download <FaCloudDownloadAlt className='text-green-500'></FaCloudDownloadAlt>
                        </Link>
                        <Link to={`/movie/${movie.title}`} className='bg-subMain text-white rounded flex-colo w-6 h-6'> <GoEye></GoEye></Link>
                        <SGFaHeart movie={movie}></SGFaHeart>

                    </>)
            }

            <Link to={`/movie/${movie.title}`}></Link>
        </td>
    </tr>
)

const Table = ({ data, admin }) => {

    return (
        <div className='overflow-x-scroll overflow-hidden relative w-full'>
            <table className='w-full table-auto border border-border divide-y divide-border'>
                <thead>
                    <tr className='bg-dryGray'>
                        <th scope='col' className={`${Head}`}>image</th>
                        <th scope='col' className={`${Head}`}>Name</th>
                        <th scope='col' className={`${Head}`}>Category</th>
                        <th scope='col' className={`${Head}`}>Language</th>
                        <th scope='col' className={`${Head}`}>Year</th>
                        <th scope='col' className={`${Head}`}>Hours</th>
                        <th scope='col' className={`${Head} text-end`}>Actions</th>
                    </tr>

                </thead>
                <tbody className='bg-main divide-y divide-gray-800'>
                    {
                        data?.map((movie, idx) => Rows(movie, idx, admin))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default Table
