import React,{Component} from 'react'
import SearchBar from '../components/search-bar'
import VideoList from './video-list'
import VideoDetail from '../components/video-detail'
import axios from 'axios'
import Video from '../components/video'

const API_END_POINT = "https://api.themoviedb.org/3/"
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images"
const API_KEY = "api_key=cc3a38e05854e390e7f4ecdd299b4c06"


class APP extends Component {
  constructor(props){
    super(props)
    this.state = {
      movieList : {},
      currentMovie : {}
    }
  }

    componentWillMount(){
      this.initMovies()
    }

    initMovies(){
      axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(function(response){
        this.setState({movieList : response.data.results.slice(1,6) ,currentMovie : response.data.results[0]}, function(){
          this.applyVideoToCurrentMovie()
        })//elle va prendre que l'index de 1 jusqu'au 6 exclu donc ca donnera 5 films
        //this.setState({currentMovie : response.data.results[0]}) au lieu de faire deux
      }.bind(this))
    }

    applyVideoToCurrentMovie(){
      axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=video&inclide_adult=false`).then(function(response){
        console.log(response);
        //const youtubeKey = response.data.videos.id[0]
        const youtubeKey = "http://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
        let newCurrentMovieState = this.state.currentMovie;
        newCurrentMovieState.videoId = youtubeKey // on récupère le state current movie au dessus, on lui crée une nouvelle variable dans l'objet et ensuite on va aller valider ça sur le state
        this.setState({currentMovie : newCurrentMovieState})
        console.log(newCurrentMovieState);
      }.bind(this))
    }

    render(){
      const renderVideoList = () => {
        if(this.state.movieList.length >=5){
          return <VideoList movieList={this.state.movieList}/>
        }
      }
      return (
        <div>
          <SearchBar/>
          <div className='row'>
            <div className='col-md-8'>
              <Video videoId={this.state.currentMovie.videoId}/>
              <VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview} />
            </div>
            <div className='col-md-4'>
              {renderVideoList()}
            </div>
          </div>
        </div>
    )
  }
    }


  export default APP