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
            <div key={i} className="guess-row-dot">
              <button onClick={()=> this.changeCode(i, 'up')}
                      disabled={!!this.props.score}> + </button>
              <div>{dot}</div>
              <button onClick={()=> this.changeCode(i, 'dn')}
                      disabled={!!this.props.score}> - </button>
            </div>
          ) )
        }
      {
        this.props.score ?
        <div>{JSON.stringify(this.props.score)}</div> :
        <button onClick={this.props.onGuess}>GO!</button>
      }
        
      </div>
    );
  }
}

export default GameRow;
