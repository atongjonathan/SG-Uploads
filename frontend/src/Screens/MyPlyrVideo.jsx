import Plyr from "plyr-react"
import "plyr-react/plyr.css"
import { useState } from "react";


function MyPlyrVideo({ play, movie }) {

    const videoSrc = {
        type: "video",
        title: movie.title,
        sources: [
            {
                src: movie.stream ? movie.stream : 'https://other-cecilia-atong-jonathan-04e43c80.koyeb.app/video/670a0fcdb020015cf937cc7c',
                type: "video/mp4",
                size: 720
            }
        ],
        tracks: movie.captions?.map((caption) => {
            caption.kind = 'captions'
            return caption
        }),

        // previewThumbnails: {
        //     enabled: true,
        //     src: movie.images
        // }
    };

    const options = {
        autoplay: play,
        // debug:true,
        mediaMetadata:
        {
            title: movie.title,
            artwork: movie.poster
        },
        poster: movie.images[0],
        disableContextMenu: true,
        controls: [
            'play-large', // The large play button in the center
            'rewind', // Rewind by the seek time (default 10 seconds)
            'play', // Play/pause playback
            'fast-forward', // Fast forward by the seek time (default 10 seconds)
            'progress', // The progress bar and scrubber for playback and buffering
            'current-time', // The current time of playback
            'duration', // The full duration of the media
            'captions', // Toggle captions
            'settings', // Settings menu
            'pip', // Picture-in-picture (currently Safari only)
            'airplay', // Airplay (currently Safari only)
            'fullscreen', // Toggle fullscreen
        ],
        clickToPlay: true,
        invertTime: true,
        toggleInvert: true,
    }
    return <Plyr source={videoSrc} options={options} crossOrigin="" />
}
export default MyPlyrVideo