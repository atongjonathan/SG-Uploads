import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import {
    MediaPlayer,
    MediaProvider,
    Poster,
    Track,
    SeekButton,
    useMediaStore
} from '@vidstack/react';

import {
    defaultLayoutIcons,
    DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';

import { useEffect, useRef, useState } from 'react';
import { Button, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react';
import { IoClose } from 'react-icons/io5';
import { SeekBackward10Icon, SeekForward10Icon, DownloadIcon } from '@vidstack/react/icons';
import { toast } from 'sonner';
import { useDevToolsStatus } from '../../utils/useDevToolsStatus';
import { useAuth } from '../../context/AuthContext';

const VIDEO_PROGRESS_KEY = 'video-progress';

export default function MyPlyrVideo({ movie }) {
    const ref = useRef();
    const { user } = useAuth();
    const isDevToolsOpen = useDevToolsStatus();
    const [initialTime, setInitialTime] = useState(0);
    const [showResumePrompt, setShowResumePrompt] = useState(false);
    const [lastSaved, setLastSaved] = useState(0);
    const { duration } = useMediaStore(ref);
    const { poster, title } = movie

    const movieId = movie.id?.toString();

    // Load saved progress on mount
    useEffect(() => {
        const progressData = JSON.parse(localStorage.getItem(VIDEO_PROGRESS_KEY) || '{}');
        const savedTime = parseFloat(progressData[movieId]?.time);

        if (savedTime && savedTime > 60 && savedTime < movie?.runtimeSeconds - 300) {
            setInitialTime(savedTime);
            setShowResumePrompt(true);
        }
    }, [movieId, movie?.runtimeSeconds]);

    // Seek to saved time after user confirms
    useEffect(() => {
        if (ref.current && initialTime && !showResumePrompt) {
            ref.current.currentTime = initialTime;
        }
    }, [initialTime, showResumePrompt]);

    // Throttled progress saving
    const handleTimeUpdate = () => {
        const currentTime = ref.current?.currentTime;
        const now = Date.now();

        if (!currentTime || showResumePrompt || !duration || duration === Infinity) return;

        if (now - lastSaved > 5000) {
            const progressData = JSON.parse(localStorage.getItem(VIDEO_PROGRESS_KEY) || '{}');
            const percentage = parseFloat(((currentTime / duration) * 100).toFixed(2));

            progressData[movieId] = {
                time: currentTime,
                percentage,
                poster,
                title,
                duration
            };

            localStorage.setItem(VIDEO_PROGRESS_KEY, JSON.stringify(progressData));
            setLastSaved(now);
        }
    };

    // Cleanup on video end
    const handleEnded = () => {
        const progressData = JSON.parse(localStorage.getItem(VIDEO_PROGRESS_KEY) || '{}');
        delete progressData[movieId];
        localStorage.setItem(VIDEO_PROGRESS_KEY, JSON.stringify(progressData));
    };

    // Resume dialog controls
    const handleResume = (resume) => {
        if (!resume) {
            setInitialTime(0);
        }
        setShowResumePrompt(false);
    };

    const secondsToHHMMSS = (seconds) => {
        const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const s = String(Math.floor(seconds % 60)).padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    if (isDevToolsOpen) return null;

    return (
        <div>
            <MediaPlayer
                ref={ref}
                title={movie.title}
                src={{ src: movie.stream, type: "video/mp4" }}
                poster={movie.poster}
                aspectRatio="16x9"
                playsInline
                crossOrigin
                logLevel="info"
                artist="StreamGrid"
                googleCast={{
                    autoJoinPolicy: 'origin_scoped',
                    language: 'en-US',
                    receiverApplicationId: '6A95402B',
                }}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
                onError={(e) => toast.error(e.message || "Playback error.")}
            >
                <MediaProvider>
                    {movie.captions?.length > 0 && (
                        <Track kind="captions" lang="en-US" src={movie.captions[0].src} label="English" default />
                    )}
                    <Poster className="vds-poster" />
                </MediaProvider>
                <DefaultVideoLayout
                    icons={defaultLayoutIcons}
                    download={user ? {
                        url: movie.stream.replace("video", "dl"),
                        filename: movie.title
                    } : undefined}
                    slots={{
                        beforePlayButton: null,
                        afterPlayButton: null,
                        smallLayout: {
                            beforeFullscreenButton: <BackwardButton />,
                            afterFullscreenButton: <ForwardButton />,
                        },
                        downloadButton: <DownloadButton user={user} stream={movie.stream} title={movie.title} />
                    }}
                />
            </MediaPlayer>

            {/* Resume Dialog */}
            <Dialog open={showResumePrompt} onClose={() => handleResume(false)} className="relative z-20 focus:outline-none">
                <DialogBackdrop className="fixed inset-0 bg-main/50" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel className="relative max-w-lg bg-main p-6 rounded-lg backdrop-blur-2xl border text-white">
                            <Button onClick={() => handleResume(false)} className="absolute top-3 right-5 text-white hover:text-subMain transitions">
                                <IoClose className="h-5 w-5" />
                            </Button>
                            <DialogTitle as="h3" className="text-lg font-medium">
                                Continue watching at {secondsToHHMMSS(initialTime)}?
                            </DialogTitle>
                            <div className="flex gap-3 mt-5 justify-end">
                                <Button onClick={() => handleResume(false)} className="px-4 py-2 border border-subMain rounded hover:bg-subMain">
                                    No
                                </Button>
                                <Button onClick={() => handleResume(true)} className="px-4 py-2 bg-subMain border border-main rounded hover:bg-main">
                                    Yes
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

// Helper components
const ForwardButton = () => (
    <SeekButton className="vds-button" seconds={10}>
        <SeekForward10Icon className="vds-icon" />
    </SeekButton>
);

const BackwardButton = () => (
    <SeekButton className="vds-button" seconds={-10}>
        <SeekBackward10Icon className="vds-icon" />
    </SeekButton>
);

const DownloadButton = ({ user, stream, title }) => (
    <Button
        onClick={() => {
            if (user) {
                const link = document.createElement('a');
                link.href = stream.replace("video", "dl");
                link.download = `StreamGrid - ${title}`;
                link.click();
            } else {
                toast.info("Only logged in users can download", { closeButton: true });
            }
        }}
        className="vds-button"
    >
        <DownloadIcon />
    </Button>
);
