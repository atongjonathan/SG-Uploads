import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider, Poster, Track, SeekButton } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import { useEffect, useRef, useState } from 'react';
import YouTube from '@u-wave/react-youtube';
import { Button, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import { IoClose } from 'react-icons/io5';
import { useDevToolsStatus } from '../../utils/useDevToolsStatus';
import { toast } from 'sonner';
import { SeekBackward10Icon, SeekForward10Icon, DownloadIcon } from '@vidstack/react/icons';
import { useAuth } from '../../context/AuthContext';
import { Tooltip } from '@vidstack/react';

function MyPlyrVideo({ movie }) {
    const [time, setTime] = useState(null);
    const [initialTime, setInitialTime] = useState(0);
    const ref = useRef();
    const movieKey = `${movie.title} (${movie.year})`;
    const [open, setOpen] = useState(false)
    const isDevToolsOpen = useDevToolsStatus()
    const { user } = useAuth()


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
    const DownloadButton = () => (<>
        {
            user ? <Button onClick={() => {
                const link = document.createElement('a');
                link.href = movie?.stream.replace("video", "dl");
                link.click();
            }} className="vds-button">
                <DownloadIcon />
            </Button> : <Button onClick={() => toast.info("Only logged in users can download", { closeButton: true })} className="vds-button">
                <DownloadIcon />
            </Button>
        }</>)
          

    return !isDevToolsOpen && (
        <div>
            <MediaPlayer
                title={movie.title}
                googleCast={{
                    autoJoinPolicy: 'origin_scoped',
                    language: 'en-US',
                    receiverApplicationId: '6A95402B',
                  }}
                src={{ src: movie.stream, type: "video/mp4" }}
                viewType="video"
                logLevel="info"
                crossOrigin
                playsInline
                aspectRatio="16x9"
                ref={ref}
                poster={movie?.poster}
                
                artist="StreamGrid"
                onTimeUpdate={() => {
                    // Update playback time on every time update event
                    if (!open) {
                        setTime(ref.current?.currentTime);

                    }
                }
                }
                onError={(err) => {
                    toast.error(err.message)
                }
                }


            >
                <MediaProvider>
                    {movie.captions?.length > 0 && (
                        <Track kind="captions" lang="en-US" src={movie.captions[0].src} label="English" default />
                    )}
                    <Poster className="vds-poster" />
                </MediaProvider>
                <DefaultVideoLayout icons={defaultLayoutIcons} download={user ?
                    {
                        url: movie.stream.replace("video", "dl"),
                        filename: "Streamgrid"
                    } : undefined
                } slots={{
                    smallLayout: {
                        beforeFullscreenButton: <BackwardButton />,
                        afterFullscreenButton: <ForwardButton />,
                        afterPlayButton: null,
                        beforePlayButton: null,

                    },
                    beforePlayButton:<BackwardButton/>,
                    afterPlayButton: <ForwardButton />,
                    downloadButton: <DownloadButton />
                }}>



                </DefaultVideoLayout>
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

        </div >
    );
}

export default MyPlyrVideo;

const ForwardButton = () => <SeekButton className="vds-button" seconds={10}>
    <SeekForward10Icon className="vds-icon" />
</SeekButton>

const BackwardButton = () => <SeekButton className="vds-button z-100" seconds={-10}>
    <SeekBackward10Icon className="vds-icon" />
</SeekButton>

const ButtonToolTip = ({ button }) => <Tooltip.Root>
    <Tooltip.Trigger asChild>{button}</Tooltip.Trigger>
    <Tooltip.Content className="vds-tooltip-content" placement="top start">
        <h1>Tool Tip</h1>
        {/* Content */}
    </Tooltip.Content>
</Tooltip.Root>




export function TrailerVideo({ trailer }) {

    return trailer && (

        <YouTube
            video={trailer.key}
            autoplay
        />
    )
}

