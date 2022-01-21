import React from "react";

const BASE_URL="https://www.youtube.com/embed/"
//const BASE_URL="https://www.youtube.com/watch?v="

const Video = ({videoId}) =>{
    return(
        // <div>
        //     <iframe type="text/html" width="640" height="360"
        //     src="//player.vimeo.com/video/27577981?portrait=0"
        //     frameborder="0"/>
        // </div>
        <div className="embed-responsive embed-responsive-16by9">
            <iframe type="text/html" className="embed-responsive-item" src={`${BASE_URL}${videoId}`} allowFullScreen title="myIframe"/>
        </div>
    )
}

export default Video