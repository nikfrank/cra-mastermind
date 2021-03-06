import React, { Component } from 'react';
import './index.css';

import GuessRow from '../GuessRow/';

const difficulty = 6;
const codeLength = 4;

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

const randomCode = ()=>
  Array(codeLength).fill(0).map(() => Math.floor(Math.random()*difficulty));

class Game extends Component {
  constructor(...p){
    super(...p);
    this.state = {
      results: [],
      code: randomCode(codeLength),
      guesses: [],
      currentGuess: Array(codeLength).fill(0),
    };
  }

  startGame = ()=>{
    // setState
    //  new code
    //  clearGuesses
    //  if was in middle of game, push result to results
    
    this.setState({
      code: randomCode(codeLength),
      guesses: [],
      currentGuess: Array(codeLength).fill(0),
    });
  }

  onGuess = (guess)=>{
    // setState
    //  push guess to guesses, with score
    //  clear currentGuess

    const nuScore = score(this.state.code, this.state.currentGuess);
    const wonGame = nuScore[0] === codeLength;
    
    this.setState({
      guesses: this.state.guesses.concat({
        code: this.state.currentGuess,
        score: nuScore,
      }),
      currentGuess: wonGame ? null : Array(codeLength).fill(0),
      results: wonGame ?
               this.state.results.concat(this.state.guesses.length+1) :
               this.state.results,
    });
  }

  setCurrentGuess = (nuGuess)=>{
    this.setState({ currentGuess: nuGuess });
  }
  
  render(){
    return (
      <div>
        <div>
          <button onClick={this.startGame}>New Game</button>
        </div>
        <div className="game-board">
          {
            this.state.guesses.map( (guess, i) => (
              <GuessRow key={i} code={guess.code} score={guess.score}/>
            ) )
          }
        {
          this.state.currentGuess ?
          <GuessRow code={this.state.currentGuess}
                    score={null}
                    dotArity={difficulty}
                    onChangeGuess={this.setCurrentGuess}
                    onGuess={this.onGuess}/> : null
        }
        </div>
        <div>
          results
          {
            this.state.results.map( (r, i) => (<div key={i}>{r} guesses</div>) )
          }
        </div>
      </div>
    );
  }
}

export default Game;
