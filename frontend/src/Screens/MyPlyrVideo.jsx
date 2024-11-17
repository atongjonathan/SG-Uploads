import Plyr from "plyr-react"
import "plyr-react/plyr.css"
import { useEffect, useState } from "react";
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider, Poster, Track, isYouTubeProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import axios from 'axios'
import movieTrailer from 'movie-trailer';
import { useLocation } from 'react-router-dom'
import Backend from "../utils/Backend";

function MyPlyrVideo({ movie }) {


    return (<div>
        {/* <Plyr source={videoSrc} options={options}></Plyr> */}
        <MediaPlayer title={movie.title} src={{ src: movie.stream, type: "video/mp4" }}
            autoPlay={movie.stream.includes("itunes")}
            viewType='video'
            logLevel='warn'
            crossOrigin
            playsInline
            aspectRatio="16x9"
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

export function TrailerVideo({ movie }) {

    const { pathname } = useLocation()
    const [trailer, setTrailer] = useState(null)



    async function getTrailer() {
        let url = `${Backend().BACKEND_URL}/itunes?search=${movie.title}`
        let headersList = {
            "Accept": "*/*",
            "Content-Type": 'application/json'
        }

        let reqOptions = {
            url: url,
            method: "GET",
            headers: headersList,
        }

        let response = await axios.request(reqOptions);
        if (response?.data?.results.length > 0) {
            let result = response.data.results.find((item) => item.trackName == movie.title && item.releaseDate.split("T")[0] == movie.releaseDetailed.date.split("T")[0])
            if (result) {
                setTrailer(result.previewUrl)
            }

        }
        else {
            movieTrailer(movie.title, { multi: true, year: movie.year }).then((res) => {
                setTrailer(res)
            });
        }

    }

    useEffect(() => {
        if (movie) {
            getTrailer(movie)

        }

    }, [pathname, movie])


    function onProviderChange(provider) {
        if (isYouTubeProvider(provider)) {
            provider.cookies = true;
        }
    }
    return trailer && (
        <MediaPlayer title={'Preview ' + movie?.title} src={trailer}
            viewType='video'
            logLevel='warn'
            crossOrigin
            playsInline
            aspectRatio="16x9"
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

