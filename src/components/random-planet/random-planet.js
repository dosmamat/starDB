import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';

import './random-planet.css';
import Spinner from '../spinner/spinner.js';

export default class RandomPlanet extends Component {
  swap=new SwapiService();
  state={
    planet:{},
    loading:true
  }
  constructor(){
    super();
    this.updatePlanet();
  }
  onPlanetLoaded=(planet)=>{
    this.setState({
      planet,
      loading:false
    });
  }
  onError=(err)=>{
    console.log("err");
  }
  updatePlanet(){
    const id=Math.floor(Math.random()*10000+2);
    this.swap.getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {

    const {planet, loading}= this.state;
    const spinner =loading?<Spinner/>:null;
    const content =!loading ? <PlanetView planet={planet}/> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {content}
      </div>

    );
  }
}

const PlanetView=({planet})=>{
  const {id, name,population, ratationPeriod, diameter}=planet;
  return(
    <React.Fragment>
      <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{ratationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
    </React.Fragment>
  )
}