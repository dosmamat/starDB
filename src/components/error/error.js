import React from 'react';
import icon  from './logo.png';
export default class Error extends React.Component{
    render(){
        return(
            <div>
                <img src={icon} alt="error"/>   
                <h1>Error ups</h1>
                <span>Wait please</span>
            </div>
        )
    }
}