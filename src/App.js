import React, { Component } from 'react';
import './App.css';
import GameBoard from './GameBoard.js'

class App extends Component {
  constructor() {
    super()
    this.allowMove = false;
    this.rows = 30;
    this.cols = 63;
    this.state = ({
      grid: Array(this.rows).fill().map(item => Array(this.cols).fill('x')),
      playerPosition: [10,10],

    })
  }
  
  componentDidMount() {
    // define walls
    let tempGrid = JSON.parse(JSON.stringify(this.state.grid));
    // define top wall
    tempGrid[0] = tempGrid[0].map(item => 'wall');
     //define bottom wall
    tempGrid[29] = tempGrid[29].map(item => 'wall');
    //define left wall
    for (let i = 0; i < tempGrid.length; i ++) {
      tempGrid[i][0] = 'wall';
       //define right wall
       tempGrid[i][62] = 'wall';
      //define random walls
      for (let j = 1; j < tempGrid[i].length -1 ; j++) {
        let randNum = Math.floor(Math.random()*10);
        if (randNum < 1) {
          tempGrid[i][j] = 'wall';
        } else if (tempGrid[i][j] === 'x') {
            let secondRand = Math.floor(Math.random()*10);
            if (secondRand < 2) {
                secondRand < 1 ? tempGrid[i][j] = 'potion' : tempGrid[i][j] = 'enemy'
            }
        }
      }
    }
    this.setState({grid: tempGrid});
    console.log(tempGrid);
  }
  
  movePlayerX = (x) => {
    let newPosition = [this.state.playerPosition[0], x];
    this.verifyMove(newPosition);
    this.allowMove && this.setState({playerPosition: newPosition});
    this.allowMove = false;
  }
  
  movePlayerY = (y) => {
     let newPosition = [y, this.state.playerPosition[1]];
     this.verifyMove(newPosition);
     this.allowMove && this.setState({playerPosition: newPosition});
     this.allowMove = false;
  }
  
  verifyMove = (newPosition) => {
    if (this.state.grid[newPosition[0]][newPosition[1]] === 'x') {
      this.allowMove = true;
      console.log("move " + this.state.playerPosition);
      console.log(this.state.grid[this.state.playerPosition[0]][this.state.playerPosition[1]]);
    }
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>React Dungeon Crawler </h1>
          <p>Chris Curl & Dan Nguyen</p>
        </header>
        <GameBoard grid = {this.state.grid} playerPosition={this.state.playerPosition} 
        movePlayerX={this.movePlayerX} movePlayerY={this.movePlayerY} rows = {this.rows} cols = {this.cols} />
      </div>
    );
  }
}

export default App;
