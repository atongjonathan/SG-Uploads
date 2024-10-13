import Plyr from "plyr-react"
import "plyr-react/plyr.css"


function MyPlyrVideo({ play, title }) {
    const videoSrc = {
        type: "video",
        title: title,
        sources: [
            {
                src: 'https://other-cecilia-atong-jonathan-04e43c80.koyeb.app/dl/670a0fcdb020015cf937cc7c',
                type: "video/mp4",
                size: 720
            }
        ],
        tracks: [
            {
                kind: "captions",
                label: "English",
                srclang: "en",
                src: "/subs/smarter.vtt",
                default: true
            }
        ],
         autoplay: play
    };
    return <Plyr source={videoSrc} />
}
export default MyPlyrVideo