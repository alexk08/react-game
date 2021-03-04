import React, { Component } from 'react';
import Board from '../board';
import Header from '../header';
import Footer from '../footer';

import './game.css';
export default class Game extends Component {
  state = {
    movesCounter: 0
  }

  addMove = () => {
    this.setState(({movesCounter}) => {

      let counter = movesCounter + 1;

      return {
        movesCounter: counter
      }
    });
  }

  render() {
    const {movesCounter} = this.state;

    return (
      <div className="game">
        <Header movesCounter={movesCounter}/>
        <main>
          <Board addMove={this.addMove}/>
        </main>
        <Footer />
      </div>
    )
  }
} 
