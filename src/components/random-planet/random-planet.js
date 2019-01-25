import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';

import './random-planet.css';
import Spinner from '../spinner/spinner.js';
import Error from '../error/error';

export default class RandomPlanet extends Component {
  swap=new SwapiService();
  state={
    planet:{},
    loading:true,
    error:false
  }
  constructor(){
    super();
    
  }
  componentDidMount(){
    this.updatePlanet();
    this.interval=setInterval(this.updatePlanet,3000);

  }
  componentWillUnmount(){
    clearInterval(this.interval);
  }
  onPlanetLoaded=(planet)=>{
    this.setState({
      planet,
      loading:false,
      error:false
    });
  }
  onError=(err)=>{
    console.log("err");
    this.setState({
      error:true,
      loading:false
    })
  }
  updatePlanet=()=>{
    const id=Math.floor(Math.random()*10)+3;
    this.swap.getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {
    const {planet, loading, error}= this.state;
    const hasData=!(loading|| error);
    const errorMessage=error?<Error/>:null;
    const spinner =loading?<Spinner/>:null;
    const content =hasData ? <PlanetView planet={planet}/> : null;

    return (
      <div className="random-planet jumbotron rounded">
      {errorMessage}
        {spinner}
        {content}
      </div>

    );
  }
}

const PlanetView=({planet})=>{
  const {id, name,population, rotationPeriod, diameter}=planet;
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
              <span>{rotationPeriod}</span>
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