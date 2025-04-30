import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { secondsToHHMMSS } from '../../Components/Single/MyPlyrVideo';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button, Popover, PopoverButton, PopoverPanel, useClose } from '@headlessui/react'

const History = () => {
    const VIDEO_PROGRESS_KEY = 'video-progress';
    let initialData = JSON.parse(localStorage.getItem(VIDEO_PROGRESS_KEY) || '{}')
    const reversed = Object.fromEntries(
        Object.entries(initialData).reverse()
      );
      
    const [progressData, setProgressData] = useState(reversed);

    let ids = Object.keys(progressData)
    let values = Object.values(progressData)
   



    useEffect(() => {
        const handleChange = () => {
            setProgressData(JSON.parse(localStorage.getItem(VIDEO_PROGRESS_KEY) || '{}'))
        };

        window.addEventListener('local-storage-updated', handleChange);

        return () => {
            window.removeEventListener('local-storage-updated', handleChange);
        };
    }, []);

    return (
        <div className="flex flex-col xl:px-2 gap-5">
            <div className="flex w-full justify-between items-center gap-2 px-1 xl:px-2">
                <span className="text-lg xl:text-xl 2xl:text-2xl font-semibold">History</span>
                {/* <a className="ring-1 ring-gray-500 lg:ring-gray-400 hover:bg-dry px-3 rounded-full py-1 text-xs 2xl:text-sm text-gray-400 xl:font-medium" href="/history">view all</a> */}
            </div>
            {
                ids.length > 0 ? <div className="flex w-full overflow-y-hidden overflow-x-auto">
                    {
                        values.map((movie, idx) => (
                            <div className="flex gap-2 w-[45%] sm:w-1/3 hover:bg-dry smoothie relative bubbly overflow-hidden rounded-xl md:w-1/4 2xl:w-1/5 flex-col shrink-0 p-2">
                                <Link to={`/watch/${ids[idx]}`} className="aspect-video w-full relative bg-white/10 shrink-0 xl:bg-dry rounded-lg lg:rounded-xl overflow-hidden">
                                    <span className=" lazy-load-image-background opacity"
                                    // style="color: transparent; display: inline-block; height: 100%; width: 100%;"
                                    >
                                        <img width="100%" height="100%" src={movie.poster} className="size-full object-cover object-center !select-none shrink-0 undefined" />
                                    </span>
                                    <div className="bg-white/20 absolute bottom-0 left-0 z-20 flex w-full ">
                                        <hr className="!border-subMain !border-[.20rem]" style={{
                                            width: `${movie.percentage}%`
                                        }} />
                                    </div>

                                    {movie.duration && <span className="absolute bottom-[.35rem] right-1 sm:right-2 z-20 text-xs bg-black/75 sm:font-medium px-1 py-[.1rem] rounded overflow-hidden">{secondsToHHMMSS(movie.duration)}</span>}
                                </Link>
                                <div className="flex-grow gap-1 w-full flex pl-1 overflow-hidden">
                                    <a className="flex flex-col flex-grow text-xs gap-1 sm:text-sm lg:text-base !leading-tight">
                                        <div className="w-full text-[.8rem] sm:text-sm lg:text-base sm:font-medium !tracking-wide !line-clamp-2 !shrink-0 !leading-tight">{movie.title}</div>
                                    </a>
                                    <div className="mb-auto sm:flex">
                                        <HistoryActions title={movie.title} id={ids[idx]} />

                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div> : (
                    <div className="w-full h-20 sm:h-24 lg:h-28 shrink-0 relative text-gray-400 flex items-center justify-center">There's nothing here yet !</div>
                )
            }

        </div>
    )
}

export default History
import { FaTrashAlt } from 'react-icons/fa';
import WebShare from '../../Components/WebShare';

const DeleteButton = ({ id }) => {
    const VIDEO_PROGRESS_KEY = 'video-progress';
    let progressData = JSON.parse(localStorage.getItem(VIDEO_PROGRESS_KEY) || '{}');
    const close = useClose()
    const handleDelete = () => {
        delete progressData[id];
        localStorage.setItem(VIDEO_PROGRESS_KEY, JSON.stringify(progressData));
        window.dispatchEvent(new Event('local-storage-updated'));
        close(); // close the popover

    };
    return (
        <Button onClick={handleDelete} className="relative select-none outline-none transition-colors focus:bg-dry data-[disabled]:pointer-events-none data-[disabled]:opacity-50 px-3 w-full py-2 gap-2 flex items-center rounded-lg hover:bg-dry cursor-pointer mb-[.1rem] text-red-500 hover:!bg-red-600/10">
            <FaTrashAlt />
            Delete
        </Button>
    )
}

const HistoryActions = (params) => {




    return (
        <Popover className="relative">
            <PopoverButton className={"p-1 m-2"}><BsThreeDotsVertical className='w-5 h-5' /></PopoverButton>
            <PopoverPanel anchor="bottom" className="divide-y border-white divide-dry rounded-xl bg-dry text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 z-30 w-28 flex flex-col items-center">
                <WebShare {...params} />
                <DeleteButton id={params.id} />


            </PopoverPanel>
        </Popover>
    )
}
