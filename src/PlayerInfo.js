import React, {Component} from 'react';
import './App.css';

class PlayerInfo extends Component {
    // constructor() {
    //     super()
    // }
    
    render() {
        return (
            <div className = 'playerInfo'>
            <button onClick = {this.props.toggleDarkMode}>Toggle Darkness</button>
           <p> Health: {this.props.health} </p>
           <p> Weapon: {this.props.weapon} </p>
           <p> XP: {this.props.XP}</p>
           <p> Attack: {this.props.attack} </p>
           <p> Level:  {this.props.level} </p>
           <p> Enemy Health: {this.props.enemyHealth}</p>
           <p> You: <span className = 'gridBox player'></span>
           <br />
                Enemy: <span className = 'gridBox enemy'></span>
                 <br />
                Potion: <span className = 'gridBox potion'></span>
                 <br />
                Weapon: <span className = 'gridBox weapon'></span>
           </p>
            </div>
            )
    }
}




export default PlayerInfo;