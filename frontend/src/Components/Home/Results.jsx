import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

const Results = ({ isResults, handleResultClick, isFetching }) => {


    return (
        <div className="w-full bg-dry border border-gray-800 p-1 rounded-md absolute left-0">
            <table className="w-full table-auto border border-border divide-y divide-border">
                <tbody className="bg-main divide-y divide-gray-800">
                    {isFetching ? <tr className='p-3 bg-dry border border-border h-12 rounded overflow-hidden flex items-center justify-between text-sm'>
                        <td><Skeleton className='animate-pulse' baseColor='rgb(36 39 63)' /></td>

                    </tr> :
                        isResults?.length === 0 ? (
                            <tr className='p-3 bg-dry border border-border h-12 rounded overflow-hidden flex items-center justify-between text-sm'>
                                <td>No movies found</td>
                                <td>                                <Link className='mr-3 underline' to="https://t.me/dont_be_soy2" target='_blank'>Request ?</Link>
                                </td>
                            </tr>
                        ) :
                            isResults?.slice(0, 3).map((movie, idx) => (
                                <tr
                                    key={idx}
                                    className={`results-row text-center transitions hover:bg-subMain hover:cursor-pointer ${!isFetching ? 'visible' : ''}`}
                                    title={movie.title}
                                    onClick={() => handleResultClick(movie.id)}
                                >
                                    <td className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
                                        <img
                                            src={movie.poster}
                                            alt={movie.title} title={movie.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </td>
                                    <td className='p-3 line-clamp-1'>
                                        <div className="flex text-center justify-center gap-1 items-center h-full">{movie.title} ({movie.year})</div>
                                    </td>
                                    <td className='p-3'>
                                        <div className="flex text-center justify-center gap-1 items-center h-full"><FaStar className='w-3 h-3 text-star'></FaStar>{movie.rating_star}</div>
                                    </td>
                                </tr>
                            ))}
                </tbody>
            </table>
        </div>
    );
};

export default Results;
