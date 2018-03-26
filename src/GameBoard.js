import React, { Component } from 'react';
import './App.css';

class GameBoard extends Component {
  constructor() {
    super()
    this.state = ({
        
    })
  }
  
  handleKeyDown = (event) => {
      let num = event.keyCode;
      if (num === 38 || num === 87) {
        this.props.movePlayerY(this.props.playerPosition[0]-1)
      } else if  (num === 40 || num === 83) {
        this.props.movePlayerY(this.props.playerPosition[0]+1)
      } else if (num === 37 || num === 65) {
        this.props.movePlayerX(this.props.playerPosition[1]-1)
      } else if (num === 39 || num === 68) {
        this.props.movePlayerX(this.props.playerPosition[1]+1)
      }
  }
  
  render() {
    
     let id = '';
     let isPlayer = false;
     const gameGrid = [];
     let playerPosition = this.props.playerPosition[0] + '-' + this.props.playerPosition[1];
     
     
     for (let i = 0; i<this.props.rows; i++) {
         for (let j = 0; j<this.props.cols; j ++) {
            id = i+'-'+j;
            playerPosition == id ? (isPlayer = true) : (isPlayer = false);
            isPlayer ? gameGrid.push(<div key = {id} className = "gridBox player"></div>) : gameGrid.push(<div key = {id} className = 'gridBox '>{isPlayer}</div>)
          // function for aligning rows below
          // j == 0 ? gameGrid.push(<div key = {id} className = 'gridBox first'> </div>) : gameGrid.push(<div key = {id} className = 'gridBox'> </div>)
         }
        
     }
     
      
    return (
      <div className = 'gridContainer' tabIndex = '1' onKeyDown = {this.handleKeyDown}>
        {gameGrid}
      </div>
    );
  }
}

export default GameBoard;
