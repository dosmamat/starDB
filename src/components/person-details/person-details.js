import React, { Component } from 'react';

import './person-details.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

export default class PersonDetails extends Component {

  swapi =new SwapiService();

  state={
    person:null,
    loading:true
  }
  componentDidMount(){
    this.updatePerson();
  }
  componentDidUpdate(prevProps){
    if(this.props.personId!==prevProps.personId){
      this.updatePerson();
      this.setState({loading:false})
    }
  }
  updatePerson(){
    const {personId}=this.props;
    if(!personId){
      return;
    }
    this.swapi
      .getPerson(personId)
      .then((person)=>{
        this.setState({person});
      })
  }
  render() {
    if(!this.state.person){
      return <span>Выберите персонажа из листа</span>
    }
    const {person:{id,name,gender,birthYear, eyeColor},loading}=this.state;
    if(loading) return <Spinner/>;//не работает загрузка
    return (
      <div className="person-details card">
        <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt="img" />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
