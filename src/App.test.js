import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';

import { mount } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Game />, div);
});

it('computes a calculation', ()=>{
  const p = mount(<Game/>);

  // now make a game

  // pull the code

  // imvent a shitty guess

  // then test a bunch of times that the guess is wrong how youd' expect it to be

  // then expect the results to be as you'd expect (once you've won the game the right number of times)

});
