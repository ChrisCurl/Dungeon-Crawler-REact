import React, { Component } from 'react';
import './App.css';
import GameBoard from './GameBoard.js'
import PlayerInfo from './PlayerInfo.js';


class App extends Component {
  constructor() {
    super()
    this.allowMove = false;
    this.rows = 48;
    this.cols = 63;
    this.tempEnemyHealth = 10;
    this.enemiesKilled = 0;
    this.state = ({
      grid: Array(this.rows).fill().map(item => Array(this.cols).fill('x')),
      playerPosition: [23
      ,31],
      health: 100,
      weapon: 5,
      attack: 1,
      XP: 0,
      enemyHealth: 10,
      level: Math.floor(this.enemiesKilled /5) ,
      darkMode: true
    })
  }
  
  componentWillMount() {
    //style background
    document.body.classList.add('wallpaper');
    // define walls
    let tempGrid = JSON.parse(JSON.stringify(this.state.grid));
    // define top wall
    tempGrid[0] = tempGrid[0].map(item => 'wall');
     //define bottom wall
    tempGrid[47] = tempGrid[47].map(item => 'wall');
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
          // define enemys and potions
        } else if (tempGrid[i][j] === 'x') {
            let secondRand = Math.floor(Math.random()*100);
            if (secondRand < 10) {
                if (secondRand < 2) {
                   tempGrid[i][j] = 'potion';
                } else if (secondRand < 5){
                  tempGrid[i][j] = 'enemy'
                } else if (secondRand > 7) {
                  tempGrid[i][j] = 'weapon'
                }
            }
        }
      }
    }
    this.setState({grid: tempGrid});
  }
  
  componentDidMount() {
    let tempGrid = JSON.parse(JSON.stringify(this.state.grid));
    let flag = true;
    for (let i = 0; i < tempGrid.length; i++) {
      
      for (let j = 0; j < tempGrid[i].length; j++) {
        if (flag && tempGrid[i][j] === 'enemy') {
        flag = false;
         tempGrid[i][j] = "boss";
      } 
      }
    }
    this.setState({grid: tempGrid});
    setInterval(function() {
      let boss = document.querySelector(".boss");
      if (boss) {
        boss.classList.toggle('flash');
      }
    }, 200)
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
    } else if (this.state.grid[newPosition[0]][newPosition[1]] === 'potion') {
      this.hitPotion(newPosition);
    }
      else if (this.state.grid[newPosition[0]][newPosition[1]] === 'weapon') {
      this.hitWeapon(newPosition);
    } 
      else if (this.state.grid[newPosition[0]][newPosition[1]] === 'enemy') {
      this.hitEnemy(newPosition);
    }
      else if (this.state.grid[newPosition[0]][newPosition[1]] === 'boss') {
        let isBoss = true;
        this.hitEnemy(newPosition, isBoss)
      }
  }
  
  hitPotion = (newPosition) => {
    this.allowMove = true;
    this.setState({health: this.state.health + 10});
    this.clearSquare(newPosition);
  }
  
    hitWeapon = (newPosition) => {
    this.allowMove = true;
    this.setState({weapon: this.state.weapon + 5});
    this.clearSquare(newPosition);
  }
  
  hitEnemy = (newPosition, isBoss) => {
    let weaponVal = this.state.weapon;
    isBoss && this.setState({tempEnemyHealth: 125})
    this.setState({health: this.state.health - 5});
    let isEnemy = true;
    if (this.tempEnemyHealth < 1) {
      if (isBoss) {
        alert("You Won!")
      }
      this.clearSquare(newPosition, isEnemy)
      this.enemiesKilled += 1;
      this.setState({XP: this.state.XP + 5});
      } else {
        console.log(this.tempEnemyHealth + " " + weaponVal);
        this.tempEnemyHealth -= weaponVal;
      }
  }
  
  clearSquare = (newPosition, isEnemy) => {
    this.allowMove = true;
    let tempGrid = JSON.parse(JSON.stringify(this.state.grid));
    tempGrid[newPosition[0]][newPosition[1]] = 'x';
    // if this line executed it means that the enemy has been defeated and we can increment the next enemy's health by 10hp
    isEnemy && this.setState({enemyHealth: this.state.enemyHealth + 5})
    this.setState({grid: tempGrid});
    //
    this.tempEnemyHealth = this.state.enemyHealth;

  }
  
  toggleDarkMode = () => {
    this.setState({darkMode: !this.state.darkMode})
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>React Dungeon Crawler </h1>
          <p>Chris Curl & Dan Nguyen</p>
        </header>
        <div className = 'gameContainer'>
         <div className = 'playerInfo'>
           <PlayerInfo XP = {this.state.XP} health = {this.state.health} weapon = {this.state.weapon} attack = {this.state.attack} level = {this.state.level} enemyHealth = {this.state.enemyHealth}
          toggleDarkMode = {this.toggleDarkMode}/>
        </div>
        <GameBoard grid = {this.state.grid} playerPosition={this.state.playerPosition} 
        movePlayerX={this.movePlayerX} movePlayerY={this.movePlayerY} rows = {this.rows} cols = {this.cols} darkMode = {this.state.darkMode} />
        </div>
      </div>
    );
  }
}

export default App;
