import React from 'react'
import "./VidoeHeader.css"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SendIcon from '@material-ui/icons/Send';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
function VideoHeader() {
    return (
        <div className="videoheader">
            <ArrowBackIosIcon />
            <h3>Reels</h3>
            <CameraAltIcon />
        </div>
    )
}

export default VideoHeader
