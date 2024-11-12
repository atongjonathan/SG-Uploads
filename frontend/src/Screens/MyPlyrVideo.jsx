import Plyr from "plyr-react"
import "plyr-react/plyr.css"
import { useEffect, useRef } from "react";
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider, Poster, Track, isYouTubeProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

function MyPlyrVideo({ movie }) {


    return (<div>
        {/* <Plyr source={videoSrc} options={options}></Plyr> */}
        <MediaPlayer title={movie.title} src={{ src: movie.stream, type: "video/mp4" }}
            autoPlay={movie.stream.includes("itunes")}
            viewType='video'
            logLevel='warn'
            crossOrigin
            playsInline
            poster={movie?.poster} artist="SG Uploads">
            <MediaProvider>
                {(movie.captions?.length > 0 && !movie.stream.includes("itunes")) && <Track kind="captions" lang="en-US" src={movie.captions[0].src} label="English" default />}
                <Poster className="vds-poster" />
            </MediaProvider>
            <DefaultVideoLayout
                icons={defaultLayoutIcons}
            />
        </MediaPlayer>
    </div>)
}
export default MyPlyrVideo

export function TrailerVideo({ movie, trailer }) {

    function onProviderChange(provider) {
        if (isYouTubeProvider(provider)) {
            provider.cookies = true;
        }
    }
    return (
        <MediaPlayer title={'Preview ' + movie.title} src={trailer}
            autoPlay
            viewType='video'
            logLevel='warn'
            crossOrigin
            playsInline
            poster={movie?.poster} artist="SG Uploads" onProviderChange={onProviderChange}>
            <MediaProvider>
                <Poster className="vds-poster" />
            </MediaProvider>
            <DefaultVideoLayout
                icons={defaultLayoutIcons}
            />
        </MediaPlayer>
    )
}

