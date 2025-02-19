import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider, Poster, Track } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import { useEffect, useRef, useState } from 'react';
import YouTube from '@u-wave/react-youtube';
import { Button, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import { IoClose } from 'react-icons/io5';

function MyPlyrVideo({ movie }) {
    const [time, setTime] = useState(null);
    const [initialTime, setInitialTime] = useState(0);
    const ref = useRef();
    const movieKey = `${movie.title} (${movie.year})`;
    const [open, setOpen] = useState(false)


    function handleResponse(response) {
        if (!response) {
            setInitialTime(0)

        }
        else {
            setInitialTime(parseFloat(time))

        }
        setOpen(false)

    }

    useEffect(() => {
        const movieData = localStorage.getItem(movieKey);
        if (movieData) {
            const { time } = JSON.parse(movieData);
            console.log(time);
            if (time && time !== 'null' && !isNaN(time)) {
                if (time > 60 && time < movie?.runtimeSeconds - 300) {
                    setTime(time)
                    setOpen(true)
                }
            }
        }
    }, [movieKey]);


    function secondsToHHMMSS(seconds) {
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds % 3600) / 60);
        let remainingSeconds = seconds % 60;

        // Ensure 2 digits for minutes and seconds
        hours = String(hours).padStart(2, '0');
        minutes = String(minutes).padStart(2, '0');
        remainingSeconds = String(parseInt(remainingSeconds)).padStart(2, '0');

        return `${hours}:${minutes}:${remainingSeconds}`;
    }


    useEffect(() => {
        if (time !== null) {
            localStorage.setItem(movieKey, JSON.stringify({ time: time.toString() }));
        }
    }, [time, movieKey]);

    useEffect(() => {
        const mediaInstance = ref.current;
        if (mediaInstance && initialTime > 0) {
            mediaInstance.currentTime = initialTime;
        }
    }, [initialTime]);

    return (
        <div>
            <MediaPlayer
                title={movie.title}
                src={{ src: movie.stream, type: "video/mp4" }}
                viewType="video"
                logLevel="warn"
                crossOrigin
                playsInline
                aspectRatio="16x9"
                ref={ref}
                poster={movie?.poster}
                artist="SG Uploads"
                onTimeUpdate={() => {
                    // Update playback time on every time update event
                    if (!open) {
                        setTime(ref.current?.currentTime);

                    }
                }}
            >
                <MediaProvider>
                    {movie.captions?.length > 0 && (
                        <Track kind="captions" lang="en-US" src={movie.captions[0].src} label="English" default />
                    )}
                    <Poster className="vds-poster" />
                </MediaProvider>
                <DefaultVideoLayout icons={defaultLayoutIcons} smallLayoutWhen={false} />
            </MediaPlayer>
            <Dialog open={open} as="div" className="relative z-20 focus:outline-none" onClose={close}>
                <DialogBackdrop className="fixed inset-0 bg-main/50"></DialogBackdrop>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="relative max-w-lg space-y-4 border bg-main lg:p-5 text-text rounded-lg p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <Button onClick={() => handleResponse(false)} className='absolute top-3 right-5 text-text hover:text-subMain transitions'><IoClose className="h-5 w-5"></IoClose></Button>

                            <DialogTitle as="h3" className="text-base/7 font-medium text-white p-2 items-center justify-center">
                                Continue watching at {secondsToHHMMSS(time)} ?
                            </DialogTitle>
                            <div className="flex gap-2 mt-1 flex-wrap flex-col-reverse sm:flex-row justify-end items-center p-3 pt-0">
                            <Button onClick={() => handleResponse(false)} type='button' className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-1 px-3 rounded w-full sm:w-auto">No</Button>
                            <Button onClick={() => handleResponse(true)} type='button' className="bg-subMain font-medium transitions hover:bg-main border border-main text-white py-1 px-3 rounded w-full sm:w-auto">Yes</Button>
                            </div>

                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

        </div>
    );
}

export default MyPlyrVideo;


export function TrailerVideo({ trailer }) {

    return trailer && (

        <YouTube
            video={trailer.key}
            autoplay
        />
    )
}

