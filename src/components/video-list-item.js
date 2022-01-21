import React from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"
const VideoListItem = (props) =>{
    const {movie} = props
    //const movie = props.movie idem ligne dessus
    //on peut meme les ajouter :
    // const{movie,color,size}=props comme ça on assigne directement les valeur qui sont renvoyée en créant 3 const !!
    return  <li className="list-group-item" onClick={handleOnClick}>  
                <div className="media">
                    <div className="media-left">
                         <img className="media-object img-rounded" heigth="100px" width="80px" alt="" src={`${IMAGE_BASE_URL}${movie.poster_path}`}/>
                    </div>
                    <div className="media-body">
                        <h5 className="title_list_item">{movie.title}</h5>
                    </div>
                </div>
            </li>

    function handleOnClick(){
        props.callback(movie)
    }
}

export default VideoListItem;



// const VideoListItem = (movie, color) =>{

//     return  <li> 
//                 un film recommandé : {movie} {color}
//             </li>
// }

// ca donnera let movie = props.movie on peu aussi en ajouter plusieurs a condition de bien les envoyé depuis la source.
//les props sont en read only !! on ne peut pas réécrire dessus directement