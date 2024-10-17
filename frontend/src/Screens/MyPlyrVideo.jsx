import Plyr from "plyr-react"
import "plyr-react/plyr.css"


function MyPlyrVideo({ play, title, stream }) {
    const videoSrc = {
        type: "video",
        title: title,
        sources: [
            {
                src: stream ? stream : 'https://other-cecilia-atong-jonathan-04e43c80.koyeb.app/video/670a0fcdb020015cf937cc7c',
                type: "video/mp4",
                size: 720
            }
        ],
        tracks: [
            {
                kind: "captions",
                label: "English",
                srclang: "en",
                src: "https://atongjona.pythonanywhere.com/subs/smarter.vtt",
            }
        ],
        autoplay: play
    };
    return <Plyr source={videoSrc} crossOrigin="" />
}
export default MyPlyrVideo