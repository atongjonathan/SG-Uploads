import Plyr from "plyr-react"
import "plyr-react/plyr.css"
import { useEffect, useRef } from "react";
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider, Poster, Track } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

function MyPlyrVideo({ play, movie }) {


    return (<div>
        {/* <Plyr source={videoSrc} options={options}></Plyr> */}
        <MediaPlayer title={movie.title} src={{ src: movie.stream, type: "video/mp4" }}
            viewType='video'
            streamType='on-demand'
            logLevel='warn'
            crossOrigin
            playsInline
            poster={movie?.poster} artist="SG Uploads">
            <MediaProvider>
                <Track kind="captions" lang="en-US" src={movie.captions[0].src} label="English" default  />
                <Poster className="vds-poster" />
            </MediaProvider>
            <DefaultVideoLayout
                // thumbnails='https://files.vidstack.io/sprite-fight/thumbnails.vtt'
                icons={defaultLayoutIcons}
            />
        </MediaPlayer>
    </div>)}
export default MyPlyrVideo

