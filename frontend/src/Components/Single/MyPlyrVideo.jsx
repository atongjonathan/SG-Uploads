import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider, Poster, Track } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import { useEffect, useRef, useState } from 'react';
import YouTube from '@u-wave/react-youtube';

function MyPlyrVideo({ movie }) {
    const [time, setTime] = useState(null);
    const [initialTime, setInitialTime] = useState(0); 
    const ref = useRef();
    const movieKey = `${movie.title} (${movie.year})`;

    useEffect(() => {
        const movieData = localStorage.getItem(movieKey);
        if (movieData) {
            const { time } = JSON.parse(movieData);
            if (time && time !== 'null' && !isNaN(time)) {
                setInitialTime(parseFloat(time)); 
            }
        }
    }, [movieKey]);

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
                    setTime(ref.current?.currentTime);
                }}
            >
                <MediaProvider>
                    {movie.captions?.length > 0 && (
                        <Track kind="captions" lang="en-US" src={movie.captions[0].src} label="English" default />
                    )}
                    <Poster className="vds-poster" />
                </MediaProvider>
                <DefaultVideoLayout icons={defaultLayoutIcons}  smallLayoutWhen={false} />
            </MediaPlayer>
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

