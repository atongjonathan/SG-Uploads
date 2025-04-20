import React from 'react'
import { Link } from 'react-router-dom';

const History = () => {
    const VIDEO_PROGRESS_KEY = 'video-progress';
    const progressData = JSON.parse(localStorage.getItem(VIDEO_PROGRESS_KEY) || '{}');
    const ids = Object.keys(progressData)
    const values = Object.values(progressData)
    return (
        <div class="flex flex-col xl:px-2 gap-5">
            <div class="flex w-full justify-between items-center gap-2 px-1 xl:px-2">
                <span class="text-lg xl:text-xl 2xl:text-2xl font-semibold">History</span>
                {/* <a class="ring-1 ring-gray-500 lg:ring-gray-400 hover:bg-white/5 px-3 rounded-full py-1 text-xs 2xl:text-sm text-gray-400 xl:font-medium" href="/history">view all</a> */}
            </div>
            {
                ids.length > 0 ? <div class="flex w-full overflow-y-hidden overflow-x-auto">
                    {
                        values.map((movie, idx) => (
                            <div class="flex gap-2 w-[45%] sm:w-1/3 hover:bg-white/5 smoothie relative bubbly overflow-hidden rounded-xl md:w-1/4 2xl:w-1/5 flex-col shrink-0 p-2">
                                <Link to={`/watch/${ids[idx]}`} class="aspect-video w-full relative bg-white/10 shrink-0 xl:bg-white/5 rounded-lg lg:rounded-xl overflow-hidden" href="/watch/anime/176496?ep=0">
                                    <span class=" lazy-load-image-background opacity"
                                    // style="color: transparent; display: inline-block; height: 100%; width: 100%;"
                                    >
                                        <img width="100%" height="100%" src={movie.poster} class="size-full object-cover object-center !select-none shrink-0 undefined" />
                                    </span>
                                    <div class="bg-white/20 absolute bottom-0 left-0 z-20 flex w-full ">
                                        <hr class="!border-subMain !border-[.20rem]" style={{
                                            width: `${movie.percentage}%`
                                        }} />
                                    </div>

                                    {movie.duration && <span class="absolute bottom-[.35rem] right-1 sm:right-2 z-20 text-xs bg-black/75 sm:font-medium px-1 py-[.1rem] rounded overflow-hidden">{movie.duration}</span>}
                                </Link>
                                <div class="flex-grow gap-1 w-full flex pl-1 overflow-hidden">
                                    <a class="flex flex-col flex-grow text-xs gap-1 sm:text-sm lg:text-base !leading-tight" href="/watch/anime/176496?ep=0">
                                        <div class="w-full text-[.8rem] sm:text-sm lg:text-base sm:font-medium !tracking-wide !line-clamp-2 !shrink-0 !leading-tight">{movie.title}</div>
                                    </a>
                                    {/* <div class="shrink-0 mb-auto hidden sm:flex">
                                        <button type="button" id="radix-:r1p:" aria-haspopup="menu" aria-expanded="false" data-state="closed">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis rotate-90"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
                                    </div> */}
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
