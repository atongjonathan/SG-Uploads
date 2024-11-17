import React, { useCallback, useState } from 'react'
import { FaCloudDownloadAlt, FaEdit, FaHeart } from 'react-icons/fa'
import { GoEye } from 'react-icons/go'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Button } from '@headlessui/react'
import EditMovie from '../Screens/Dashboard/Admin/EditMovie'
import SGFaHeart from './SGFaHeart'

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase"
const Text = 'text-sm text-left leading-6 whitespace-nowrap px-5 py-3'
const Rows = (movie, idx, admin, setMovie = null, open = null) =>
(
    <tr key={idx}>
        <td className={`${Text}`}>
            <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
                <LazyLoadImage src={movie.poster} alt={movie.title} title={movie.title} className='h-full w-full object-cover' />
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
                        <Button onClick={() => {
                            setMovie(movie)
                            open()
                        }} className='border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2'>
                            Edit <FaEdit className='text-green-500'></FaEdit>
                        </Button>
                        {/* <Button className='bg-subMain text-white rounded flex-colo w-6 h-6'> <MdDelete></MdDelete></Button> */}
                    </>
                ) : (
                    <>
                        <Link to={movie?.stream?.replace('video', 'dl')} className='border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2'>
                            Download <FaCloudDownloadAlt className='text-green-500'></FaCloudDownloadAlt>
                        </Link>
                        <Link to={`/watch/${movie.title}`} className='bg-subMain text-white rounded flex-colo w-6 h-6'> <GoEye></GoEye></Link>
                        <SGFaHeart movie={movie}></SGFaHeart>

                    </>)
            }

            <Link to={`/watch/${movie.title}`}></Link>
        </td>
    </tr>
)

const Table = ({ data, admin }) => {
    let [isOpen, setIsOpen] = useState(false)

    let [movie, setMovie] = useState(null)

    const open = useCallback(function open() {
        setIsOpen(true)
    })


    const close = useCallback(
        function close() {
            setIsOpen(false)
        }
    )



    return (
        <div className='overflow-x-scroll lg:overflow-x-hidden overflow-hidden relative w-full'>
            <EditMovie close={close} isOpen={isOpen} movie={movie}></EditMovie>
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
                        data?.map((movie, idx) => Rows(movie, idx, admin, setMovie, open))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default Table
