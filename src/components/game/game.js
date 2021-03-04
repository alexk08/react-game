import React from 'react';
import Board from '../board';
import Header from '../header';
import Footer from '../footer';

import './game.css';

const Game = () => {
  return (
    <div className="game">
      <Header />
      <main>
        <Board />
      </main>
      <Footer />
    </div>
  )
}

export default Game;