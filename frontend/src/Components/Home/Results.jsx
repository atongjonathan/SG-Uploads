import React from 'react'
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Results = ({ isResults, handleResultClick }) => {
    return (
        <div className="w-full bg-dry border border-gray-800 p-1 rounded-md absolute left-0">
            <table className="w-full table-auto border border-border divide-y divide-border">
                <tbody className="bg-main divide-y divide-gray-800">
                    {isResults.slice(0, 3).map((movie, idx) => (
                        <tr
                            key={idx}
                            className="hover:text-main text-center hover:bg-dryGray hover:cursor-pointer"
                            title={movie.title}
                            onClick={() => handleResultClick(movie.title)}
                        >
                            <td className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
                                <img
                                    src={movie.poster}
                                    alt={movie.title} title={movie.title}
                                    className="h-full w-full object-cover"
                                />
                            </td>
                            <td className='p-3 line-clamp-1'> <div className="flex text-center justify-center gap-1 items-center h-full">{movie.title} ({movie.year})</div></td>

                            {/* <td className='line-clamp-1 '><p className='flex h-full text-center justify-center'></p></td> */}
                            <td className='p-3'>
                                <div className="flex text-center justify-center gap-1 items-center h-full"><FaStar className='w-3 h-3 text-star'></FaStar>{movie.rating.star}</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Results
