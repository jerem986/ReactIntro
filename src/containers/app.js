import React,{Component} from 'react'
import SearchBar from '../components/search-bar'
import VideoList from './video-list'
import VideoDetail from '../components/video-detail'
import axios from 'axios'
import Video from '../components/video'

const API_END_POINT = "https://api.themoviedb.org/3/"
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images"
const API_KEY = "api_key=cc3a38e05854e390e7f4ecdd299b4c06"
const SEARCH_URL = "search/movie?"
const SEARCH_LANGUAGE = "language=fr&include_adult=false"

class APP extends Component {
  constructor(props){
    super(props)
    this.state = {
      movieList : {},
      currentMovie : {}
    }
    this.initMovies()
  }

    // componentWillMount(){
    //   on met directement ce qu'il faut ici, il sert d'initialisateur mais mnt on met ça dans le constructeur
    // }

    initMovies(){
      axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(function(response){
        this.setState({movieList : response.data.results.slice(1,6) ,currentMovie : response.data.results[0]}, function(){
          this.applyVideoToCurrentMovie()
        })//elle va prendre que l'index de 1 jusqu'au 6 exclu donc ca donnera 5 films
        //this.setState({currentMovie : response.data.results[0]}) au lieu de faire deux
      }.bind(this))
    }

    applyVideoToCurrentMovie(){
      axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/videos?${API_KEY}&append_to_response=video&inclide_adult=false`).then(function(response){
        //console.log(response);
        const youtubeKey = response.data.results[0].key 
        // console.log(youtubeKey);
        // if(this.youtubeKey === undefined){
        //   this.youtubeKey = "3iv2r_h3dYE"
        // }
        let newCurrentMovieState = this.state.currentMovie;
        newCurrentMovieState.videoId = youtubeKey // on récupère le state current movie au dessus, on lui crée une nouvelle variable dans l'objet et ensuite on va aller valider ça sur le state
        this.setState({currentMovie : newCurrentMovieState})
      }.bind(this))
    }

    onClickListItem(movie){
      this.setState({currentMovie : movie}, function(){
        this.applyVideoToCurrentMovie();
        this.setRecommandation();
      })
    }

    setRecommandation(){
      //axios.get().then((response) =>{}.bind(this))
      axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?${API_KEY}&language=fr`).then((response) =>{
        this.setState({movieList : response.data.results.slice(0,5)})
      })
    }

    onClickSearch(searchText){
      if(searchText){
        axios.get(`${API_END_POINT}${SEARCH_URL}${API_KEY}&${SEARCH_LANGUAGE}&query=${searchText}`).then(function(response){
          if(response.data && response.data.results[0]){
            if(response.data.results[0].id !== this.state.currentMovie.id){
              this.setState({currentMovie : response.data.results[0]}, () =>{
                this.applyVideoToCurrentMovie();
                this.setRecommandation();
              })
            }
          }
        }.bind(this))// ne pas oublier le bind(this) quand on fait une requete axios qui utilise un parametre recu par la methode!!
      }
    }

    render(){
      const renderVideoList = () => {
        if(this.state.movieList.length >=5){
          return <VideoList movieList={this.state.movieList} callback={this.onClickListItem.bind(this)}/>
        }
      }
      return (
        <div>
          <div className='search_bar'>
            <SearchBar callback={this.onClickSearch.bind(this)}/>
          </div>
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