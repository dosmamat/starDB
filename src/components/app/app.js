import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import Error from '../error/error';
import PeoplePage from '../people-page/people-page';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import './app.css';
import SwapiService from '../../services/swapi-service';

export default class App extends React.Component {
  swapi= new SwapiService();
  state={
    hasError:false
  }

  componentDidCatch(){
    console.log("did CATCH");
    this.setState({hasError:true});
  }
  render(){
    if(this.state.hasError){
      return <Error/>
    }
    return (
      <div>
        <Header />
        <RandomPlanet />
  
        <PeoplePage/>
        <div style={{marginTop:'50px'}} className="row mb2">
          <div className="col-md-6">
             <ItemList  onItemSelected={this.onPersonSelected}
              getData={this.swapi.getAllPlanets}/>
           </div>
          <div className="col-md-6">
              <PersonDetails personId={this.state.selectPerson} />
          </div>
        </div>

        <div style={{marginTop:'50px'}} className="row mb2">
          <div className="col-md-6">
             <ItemList  onItemSelected={this.onPersonSelected}
              getData={this.swapi.getAllStarships}/>
           </div>
          <div className="col-md-6">
              <PersonDetails personId={this.state.selectPerson} />
          </div>
        </div>


      </div>
    );
  }
 
};
