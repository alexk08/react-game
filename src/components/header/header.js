import React from 'react';
import './header.css';

import { ReactComponent as Settings } from './images/settings.svg';
import { ReactComponent as Statistics } from './images/statistics.svg';

const Header = ({movesCounter, toggleSettings, startGame, toggleStatistic}) => {
  const onSettingsButtonCLick = ({ target }) => {
    
    if(!target.closest('.settings-button')) {
      return
    }

    toggleSettings();
  }

  const onStatisticOpen = ({ target }) => {
    if(!target.closest('.statistics-button')) {
      return
    }

    toggleStatistic();
  }

  const onStartGameClick = () => {
    startGame();
  }

  return (
    <header className="header">
      <div className="step-counter">
        <span className="step-counter__text">Checks: </span>
        <span className="step-counter__value">
          {movesCounter}
        </span>
      </div>
      <button className="start-game"
              onClick={onStartGameClick}>
        Start Game
      </button>
      <h1>Memory Game</h1>
      <div className="buttons">
        <button type="button" className="settings-button"
                onClick={onSettingsButtonCLick}>
          <Settings/>
        </button>
        <button type="button" className="statistics-button"
                onClick={onStatisticOpen}>
          <Statistics />
        </button>
      </div>
    </header>
  )
}

export default Header;