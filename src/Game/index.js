import React, { Component } from 'react';
import './index.css';

import GuessRow from '../GuessRow/';

const difficulty = 16;

// unit test this
// and move dotArity into game options
const score = (dotArity => (code, guess) => {
  const scoreCard =
    code.map( (c, i) => ((c === guess[i]) ? 'b' : c ) )
        .reduce( (p, c, i) => {
          if (c === 'b') {
            p.b += 1;
          } else {
            p.cw[c] = (p.cw[c]||0) + 1;
            p.gw[ guess[i] ] = (p.gw[ guess[i] ]||0) + 1;
          }
          return p;
        }, {
          cw: Array(dotArity).fill(0),
          gw: Array(dotArity).fill(0),
          b: 0,
        });
  
  return [
    scoreCard.b,
    scoreCard.cw.reduce( (p, c, i) =>( p + Math.min(c || 0, scoreCard.gw[i]) ), 0),
  ];
})(difficulty);

class Game extends Component {
  constructor(...p){
    super(...p);
    this.state = {
      results: [],
      code: [1, 2, 3, 4],
      guesses: [],
      currentGuess: [0,0,0,0],
    };
  }

  startGame = ()=>{
    // setState
    //  new code
    //  clearGuesses
    //  if was in middle of game, push result to results
  }

  onGuess = (guess)=>{
    // setState
    //  push guess to guesses, with score
    //  clear currentGuess

    this.setState({
      guesses: this.state.guesses.concat({
        code: this.state.currentGuess,
        score: score(this.state.code, this.state.currentGuess),
      }),
      currentGuess: [0,0,0,0],
    });
  }

  setCurrentGuess = (nuGuess)=>{
    this.setState({ currentGuess: nuGuess });
  }
  
  render(){
    return (
      <div>
        <div>
          game
          <button onClick={this.startGame}>New Game</button>
        </div>
        <div>
          guesses
          {
            this.state.guesses.map( (guess, i) => (
              <GuessRow key={i} code={guess.code} score={guess.score}/>
            ) )
          }
        <GuessRow code={this.state.currentGuess}
                  score={null}
                  dotArity={difficulty}
                  onChangeGuess={this.setCurrentGuess}
                  onGuess={this.onGuess}/>
        </div>
        <div>results</div>
      </div>
    );
  }
}

export default Game;
