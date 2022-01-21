import React,{Component} from 'react'


class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText : "",
            placeHolder:"Tapez votre film.."
        }
    }

    handleChange(event){
        this.setState({
            searchText : event.target.value
        })
    }

    render(){
        return (// on doit bind le this dans le onChange car ca veut dire que c'est le this qu'on envoi en tant qu'event sinon ça ne fonctionnera pas
                // on utlise className a la place de class en React car class est deja pris voir ligne 4 !!
            <div  className="row"> 
                <div className="com-md-8">
                    <input type="text" className='form-control input-lg' onChange={this.handleChange.bind(this)} placeholder={this.state.placeHolder}/>
                </div>
            </div>

        )
    }


}

export default SearchBar;