import React, { Component } from 'react';
import './App.css';
import Game from './Game/';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Mastermind Game</h2>
        </div>
        <div className="App-intro">
          <Game/>
        </div>
      </div>
    );
  }
}

export default App;
