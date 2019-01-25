import React from 'react';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import Error from '../error/error';
import SwapiService from '../../services/swapi-service';
export default class PeoplePage extends React.Component {
    swapi= new SwapiService();
    state={
        selectPerson:null,
        hasError:false
    }
    onPersonSelected=(id)=>{
        this.setState({
          selectPerson:id
        })
    }
    componentDidCatch(){
        this.setState({
            hasError:true
        })
    }
    render(){
        if(this.state.hasError){
            return <Error/>
          }
        return(
            <div style={{marginTop:'50px'}} className="row mb2">
                <div className="col-md-6">
                    <ItemList  onItemSelected={this.onPersonSelected}
                    getData={this.swapi.getAllPeople}/>
                </div>
                <div className="col-md-6">
                    <PersonDetails personId={this.state.selectPerson} />
                </div>
            </div>
        )
    }
}