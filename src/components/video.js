import React from "react";

const Video = ({videoId}) =>{
    return(
        <div>
            <iframe id="ytplayer" type="text/html" width="640" height="360"
            src="//player.vimeo.com/video/27577981?portrait=0"
            frameborder="0"/>
        </div>
        // <div className="embed-responsive embed-reponsive-16by9">
        //     {/* <iframe type="text/html" className="embed-responsive-item" src={videoId}/> */}

        // </div>
    )
}

export default Video