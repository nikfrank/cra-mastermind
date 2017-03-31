import React, { Component } from 'react';
import './index.css';

class GameRow extends Component {
  changeCode = (ind, dir)=>{
    this.props.onChangeGuess(
      this.props.code.map( (d, i) =>
        (i !== ind) ? d : (dir === 'up') ? (
          (d + 1) % this.props.dotArity
        ) : (
          (d + this.props.dotArity - 1) % this.props.dotArity
        )
      )
    );
  }

  render(){
    return (
      <div className="guess-row">
        {
          this.props.code.map( (dot, i) => (
            <div key={i+''+dot} className={`guess-row-dot dot-${dot}`}>
              <button onClick={()=> this.changeCode(i, 'up')}
                      disabled={!!this.props.score}> + </button>
              <div></div>
              <button onClick={()=> this.changeCode(i, 'dn')}
                      disabled={!!this.props.score}> - </button>
            </div>
          ) )
        }
        <div className="score-container">
          {
            this.props.score ?
            this.props.code.map( (c, i) => {
              const sdc = (i < this.props.score[0]) ?
                          'score-dot-black' :
                          (i < this.props.score[0] + this.props.score[1]) ?
                          'score-dot-pink' : 'score-dot-none';
              
              return (<div key={i} className={`score-dot ${sdc}`}></div>);
            }) :
            <button onClick={this.props.onGuess}>GO!</button>
          }
        </div>
      </div>
    );
  }
}

export default GameRow;
