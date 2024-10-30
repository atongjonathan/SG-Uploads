import Plyr from "plyr-react"
import "plyr-react/plyr.css"
import { useEffect, useRef } from "react";


function MyPlyrVideo({ play, movie }) {
    const playerRef = useRef(null); // Reference to the Plyr player
    const mediaSourceRef = useRef(null); // Reference to MediaSourc

    const videoSrc = {
        type: "video",
        title: movie.title,
        sources: [
            {
                src: movie.stream ? movie.stream : 'https://other-cecilia-atong-jonathan-04e43c80.koyeb.app/video/670a0fcdb020015cf937cc7c',
                type: "video/mp4",
                size: 1080
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
            title: `${movie.title} (${movie.year})`,
            artwork: [{
                src: movie.poster,
                sizes: "512x512",
                type: "image/png",
            }],
            artist: 'SG Uploads',
            album: movie.title
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
            'settings', // Settings menu
            'pip', // Picture-in-picture (currently Safari only)
            'airplay', // Airplay (currently Safari only)
            'fullscreen', // Toggle fullscreen
        ],
        clickToPlay: true,
        keyboard: { focused: true, global: true },
        tooltips: { controls: true, seek: true }
    }

    useEffect(() => {
        const videoElement = playerRef.current?.plyr?.media; // Get the Plyr video element

        if ("MediaSource" in window && videoElement) {
            const mediaSource = new MediaSource();
            mediaSourceRef.current = mediaSource;
            videoElement.src = URL.createObjectURL(mediaSource);

            mediaSource.addEventListener("sourceopen", () =>
                handleSourceOpen(mediaSource, movie.stream)
            );
        }
    }, [movie.stream]);
    useEffect(() => {
        return () => {
            if (mediaSourceRef.current) {
                mediaSourceRef.current = null;
            }
        };
    }, []);


    // Function to load and append video chunks
    const handleSourceOpen = async (mediaSource, streamUrl) => {
        try {
            const sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
            const response = await fetch(streamUrl);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const reader = response.body.getReader();
            let result;

            while (!(result = await reader.read()).done) {
                sourceBuffer.appendBuffer(result.value);
                await new Promise((resolve) => {
                    sourceBuffer.addEventListener("updateend", resolve, { once: true });
                });
            }

            mediaSource.endOfStream();
        } catch (error) {
            console.error('Error loading video:', error);
            // Handle error (e.g., show a message to the user)
        }
    };

    return <Plyr ref={playerRef} source={videoSrc} options={options} preload={movie.images[0]} crossOrigin="" />
}
export default MyPlyrVideo

export function TrailerVideo({ movie }) {
    const videoSrc = {
        type: "video",
        title: movie.trackName,
        sources: [
            {
                src: movie.previewUrl,
                type: "video/mp4",
                size: 1080
            }
        ],
    };

    const options = {
        autoplay: true,
        mediaMetadata:
        {
            title: `Preview: ${movie.trackName}`,
            artwork: [{
                src: movie.artworkUrl100,
                sizes: "265x256",
                type: "image/png",
            }],
            artist: 'SG Uploads',
            album: movie.title
        },
        poster: movie.artworkUrl100,
        disableContextMenu: true,
        controls: [
            'play-large', // The large play button in the center
            'rewind', // Rewind by the seek time (default 10 seconds)
            'play', // Play/pause playback
            'fast-forward', // Fast forward by the seek time (default 10 seconds)
            'progress', // The progress bar and scrubber for playback and buffering
            'current-time', // The current time of playback
            'duration', // The full duration of the media
            'settings', // Settings menu
            'pip', // Picture-in-picture (currently Safari only)
            'airplay', // Airplay (currently Safari only)
            'fullscreen', // Toggle fullscreen
        ],
        clickToPlay: true,
        keyboard: { focused: true, global: true },
        tooltips: { controls: true, seek: true }
    }
    return (<div>
        <Plyr source={videoSrc} options={options}></Plyr>
    </div>)
}