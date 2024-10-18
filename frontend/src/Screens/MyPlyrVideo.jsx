import Plyr from "plyr-react"
import "plyr-react/plyr.css"


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
        autoplay: play,
        mediaMetadata:
        {
            title: movie.title,
            artwork: movie.poster
        },
        poster: movie.images[0],
        previewThumbnails: movie.images
    };
    return <Plyr source={videoSrc} crossOrigin="" />
}
export default MyPlyrVideo