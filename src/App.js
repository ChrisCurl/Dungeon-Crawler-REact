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
  
  movePlayerX = (x) => {
    let newPosition = [this.state.playerPosition[0], x];
    this.verifyMove();
    this.allowMove && this.setState({playerPosition: [this.state.playerPosition[0], x]});
    this.allowMove = false;
    
    console.log("move x")
  }
  
  movePlayerY = (y) => {
     let newPosition = [y, this.state.playerPosition[1]];
     this.verifyMove();
     this.allowMove && this.setState({playerPosition: [y, this.state.playerPosition[1]]});
     this.allowMove = false;
    console.log('move y');
  }
  
  verifyMove = () => {
    if (this.state.grid[this.state.playerPosition[0]][this.state.playerPosition[1]] === 'x') {
      this.allowMove = true;
    }
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>React Dungeon Crawler </h1>
        </header>
        <GameBoard grid = {this.state.grid} playerPosition={this.state.playerPosition} 
        movePlayerX={this.movePlayerX} movePlayerY={this.movePlayerY} rows = {this.rows} cols = {this.cols} />
      </div>
    );
  }
}

export default App;
