import React, { Component } from 'react';

import CardBackButton from '../card-back-button';
import BoardSettingButton from '../board-setting-button';
import CardTypeButton from '../card-type-button';

import './settings.css';

import blueBack from '../card/images/card-back-blue.png';
import redBack from '../card/images/card-back-red.png';

import cards from './images/cards.jpg';
import pictures from './images/pictures.jpg';

export default class Settings extends Component {
  state = {
    cardBacks: [
      { color: 'blue', imgSrc: blueBack },
      { color: 'red', imgSrc: redBack }
    ],
    boardSizes: [12, 18, 24],
    cardTypes: [
      { type: 'cards', imgSrc: cards },
      { type: 'pictures', imgSrc: pictures }
    ]
  }
  render() {
    const { isSettingsOpen, applySettings, chooseSetting, choosenSettings } = this.props;
    const { cardBacks, boardSizes, cardTypes } = this.state;

    const clazz = isSettingsOpen ? 'settings--show' : '';

    const cardBackButtons = cardBacks.map(({color, imgSrc}, idx) => {
      return (<CardBackButton name={color}
                              key={idx+1}
                              imgSrc={imgSrc}
                              activeBack={choosenSettings.cardBack}
                              onChooseCardBack={chooseSetting}/>)
    });

    const boardSizeButtons = boardSizes.map((size, idx) => {
      return (<BoardSettingButton value={size} key={idx+1}
                            activeBoardSize={choosenSettings.boardSize}
                            onChooseBoard={chooseSetting}/>)
    })

    const cardTypeButtons = cardTypes.map(({type, imgSrc}, idx) => {
      return (<CardTypeButton name={type} key={idx+1}
                              imgSrc={imgSrc}
                              activeType={choosenSettings.cardType}
                              onChooseCardType={chooseSetting}/>)
    })

    return (
      <div className={`settings ${clazz}`}>
        <h2>Settings</h2>
        <div className="settings__card-back">
          <div className="settings__card-back-text">Choose card back:</div>
          <div className="settings__card-back-buttons">
            {cardBackButtons}
          </div>
        </div>
        <div className="settings__board">
          <div className="settings__board-text">Choose amount of cards:</div>
          <div className="settings__board-buttons">
            {boardSizeButtons}
          </div>
        </div>
        <div className="settings__card-type">
          <div className="settings__card-type-text">Choose type of cards:</div>
          <div className="settings__card-type-buttons">
            {cardTypeButtons}
          </div>
        </div>
        <button className="settings__save"
                onClick={applySettings}>
                  Save and start new game
        </button>
      </div>
    )
  }
}
