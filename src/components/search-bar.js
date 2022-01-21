import React,{Component} from 'react'


class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText : "",
            placeHolder:"Tapez votre film..",
            intervalBeforeRequest : 2000,
            lockRequest : false
        }
    }

    handleChange(event){
        this.setState({
            searchText : event.target.value
        })
        if(!this.state.lockRequest){
            this.setState({lockRequest : true})
            setTimeout(function(){this.search()}.bind(this), this.state.intervalBeforeRequest);
        }
    }

    handleOnClick(event){
        this.search()
    }
    
    search(){
        this.props.callback(this.state.searchText)
        this.setState({lockRequest : false})
    }

    render(){
        return (// on doit bind le this dans le onChange car ca veut dire que c'est le this qu'on envoi en tant qu'event sinon ça ne fonctionnera pas
                // on utlise className a la place de class en React car class est deja pris voir ligne 4 !!
            <div  className="row"> 
                <div className="com-md-8 input-group">
                    <input type="text" className='form-control input-lg' onKeyUp={this.handleChange.bind(this)} placeholder={this.state.placeHolder}/>
                    <span className='input-group-btn'>
                        <button className='btn btn-secondary' onClick={this.handleOnClick.bind(this)}>Go</button>
                    </span> 
                </div>
            </div>
        )

    }


}

export default SearchBar;