import React from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"
const VideoListItem = (props) =>{

    return  <li> 
                <img heigth="100px" width="80px" alt="" src={`${IMAGE_BASE_URL}${props.movie.poster_path}`}/>
                <h3>{props.movie.title}</h3>
            </li>
}

export default VideoListItem;



// const VideoListItem = (movie, color) =>{

//     return  <li> 
//                 un film recommandé : {movie} {color}
//             </li>
// }

// ca donnera let movie = props.movie on peu aussi en ajouter plusieurs a condition de bien les envoyé depuis la source.
//les props sont en read only !! on ne peut pas réécrire dessus directement