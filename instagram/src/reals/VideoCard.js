import React, { useRef, useState } from 'react'
import './VideoCard.css'
import VideoHeader from './VideoHeader';
import VidoeFooter from './VidoeFooter';
function VideoCard({ username, caption, imageurl, userimage, imagename }) {

    const [isVideoPalying, setisVideoPalying] = useState(false);
    const videoRef = useRef(null);
    const onVideopress = () => {
        if (isVideoPalying) {
            videoRef.current.pause();
            setisVideoPalying(false);
        } else {
            videoRef.current.play();
            setisVideoPalying(true);
        }
    }
    // console.log(imagename)
    return (
        <div className="video">

            <VideoHeader />
            <video
                ref={videoRef}
                onClick={onVideopress}
                className="video_palyer"
                src={imageurl}
                atl={imagename}
                loop={true}
            />
            <VidoeFooter
                song={imagename}
                avatarSrc={userimage}
                channel={username}

            />
        </div >
    )
}

export default VideoCard
