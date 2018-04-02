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
        console.log(this.props.playerPosition);
      } else if  (num === 40 || num === 83) {
        this.props.movePlayerY(this.props.playerPosition[0]+1)
      } else if (num === 37 || num === 65) {
        this.props.movePlayerX(this.props.playerPosition[1]-1)
      } else if (num === 39 || num === 68) {
        this.props.movePlayerX(this.props.playerPosition[1]+1)
      }
  }
  
    playerView = (i,j) => {
    //slect bubbble around player for styling
    if ((i < this.props.playerPosition[0] - 3 || i > this.props.playerPosition[0] + 3 || j < this.props.playerPosition[1] - 3 || j > this.props.playerPosition[1] + 3)
    && this.props.darkMode) {
      return 'gridBox hidden'
    } else {
      return 'gridBox'
    }
  }
  
    enemyView = (i,j) => {
      if ((i < this.props.playerPosition[0] - 3 || i > this.props.playerPosition[0] + 3 || j < this.props.playerPosition[1] - 3 || j > this.props.playerPosition[1] + 3) 
      && this.props.darkMode) {
      return 'gridBox hidden' 
    } else {
      return 'gridBox enemy'
    }
  }
  
  potionView = (i,j) => {
      if ((i < this.props.playerPosition[0] - 3 || i > this.props.playerPosition[0] + 3 || j < this.props.playerPosition[1] - 3 || j > this.props.playerPosition[1] + 3)
      && this.props.darkMode) {
      return 'gridBox hidden' 
    } else {
      return 'gridBox potion'
    }
  }
  
  wallView = (i,j) => {
      if ((i < this.props.playerPosition[0] - 3 || i > this.props.playerPosition[0] + 3 || j < this.props.playerPosition[1] - 3 || j > this.props.playerPosition[1] + 3)
      && this.props.darkMode) {
      return 'gridBox hidden' 
    } else {
      return 'gridBox wall'
    }
  }
  
   weaponView = (i,j) => {
      if ((i < this.props.playerPosition[0] - 3 || i > this.props.playerPosition[0] + 3 || j < this.props.playerPosition[1] - 3 || j > this.props.playerPosition[1] + 3)
      && this.props.darkMode) {
      return 'gridBox hidden' 
    } else {
      return 'gridBox weapon'
    }
  }
  
   bossView = (i,j) => {
      if ((i < this.props.playerPosition[0] - 3 || i > this.props.playerPosition[0] + 3 || j < this.props.playerPosition[1] - 3 || j > this.props.playerPosition[1] + 3)
      && this.props.darkMode) {
      return 'gridBox hidden' 
    } else {
      return 'gridBox boss'
    }
  }
  
  render() {
     let count = 0;
     let playerId = '';
     let isPlayer = false;
     const gameGrid = [];
     let finalView = [];
     let playerPosition = this.props.playerPosition[0] + '-' + this.props.playerPosition[1];
     
     for (let i = 0; i<this.props.rows; i++) {
         for (let j = 0; j<this.props.cols; j ++) {
            let id = [i,j];
            playerId = i + '-' + j;
            let playerX = this.props.playerPosition[0];
            let playerY = this.props.playerPosition[1];
            playerPosition === playerId ? (isPlayer = true) : (isPlayer = false);
            if (isPlayer) {
              gameGrid.push({ id: id, playerX: playerX, playerY: playerY, code: <div  className = "gridBox player"></div>});
            } else if (this.props.grid[i][j] === 'wall') {
              gameGrid.push({ id: id, playerX: playerX, playerY: playerY, code: <div  className = {this.wallView(i,j)} ></div>});
            } else if (this.props.grid[i][j] === 'potion') {
              gameGrid.push({ id: id, playerX: playerX, playerY: playerY, code: <div  className = {this.potionView(i,j)}></div>});
            } else if (this.props.grid[i][j] === 'enemy') {
              gameGrid.push({ id: id, playerX: playerX, playerY: playerY, code: <div  className = {this.enemyView(i,j)}></div>});
            } else if (this.props.grid[i][j] === 'weapon') {
              gameGrid.push({ id: id, playerX: playerX, playerY: playerY, code: <div  className = {this.weaponView(i,j)}></div>});
            } else if (this.props.grid[i][j] === 'boss') {
              gameGrid.push({ id: id, playerX: playerX, playerY: playerY, code: <div  className = {this.bossView(i,j)}></div>});
            }
              else {
              gameGrid.push({ id: id, code: <div  className = {this.playerView(i,j)}></div>});
            }
          //  isPlayer ? gameGrid.push(<div key = {id} className = "gridBox player"></div>) : gameGrid.push(<div key = {id} className = 'gridBox '>{id}</div>)
          // function for aligning rows below
          // j == 0 ? gameGrid.push(<div key = {id} className = 'gridBox first'> </div>) : gameGrid.push(<div key = {id} className = 'gridBox'> </div>)
         }
     }
     
     finalView = gameGrid.map(function(item){
       count ++;
      // if ((item.id[0] > item.playerY - 3 && item.id[0] < item.playerY )||
      //     (item.id[0] < item.playerY + 3 && item.id[1] > item.playerY )||
      //     (item.id[1] > item.playerX - 3 && item.id[1] < item.playerX )|| 
      //     (item.id[1] < item.playerX + 3 && item.id[1] < item.playerX)) {
         return (<div key = {count} className = 'gridBox'>{item.code}</div>)
       
     })
     
     
    return (
      <div className = "mainView">
        <div className = 'gridContainer' tabIndex = '1' onKeyDown = {this.handleKeyDown}>
          {finalView}
        </div>
      </div>
    );
  }
}

export default GameBoard;
