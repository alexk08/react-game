import React, { Component } from 'react';

import CardBackButton from '../card-back-button';
import BoardSettingButton from '../board-setting-button';

import './settings.css';

import blueBack from '../card/images/card-back-blue.png';
import redBack from '../card/images/card-back-red.png';

export default class Settings extends Component {
  state = {
    // activeCardBack: this.props.cardBack,
    // activeBoardSize: this.props.boardSize,
    cardBacks: [
      { color: 'blue', imgSrc: blueBack },
      { color: 'red', imgSrc: redBack }
    ],
    boardSizes: [12, 18, 24]
  }

  // renewState() {
  //   this.setState({activeCardBack: this.props.cardBack, activeBoardSize: this.props.boardSize});
  // }

  // chooseCardBack = (cardBack) => {
  //   this.setState({activeCardBack: cardBack});
  // }

  // chooseBoard = (size) => {
  //   this.setState({activeBoardSize: size})
  // }

  render() {
    const { isSettingsOpen, applySettings, chooseCardBack, chooseBoardSize, choosenSettings } = this.props;
    const { cardBacks, boardSizes } = this.state;

    // console.log(cardBack, boardSize)
    // console.log(activeCardBack, activeBoardSize)

    const clazz = isSettingsOpen ? 'settings--show' : '';

    const cardBackButtons = cardBacks.map(({color, imgSrc}, idx) => {
      return (<CardBackButton name={color}
                              key={idx+1}
                              imgSrc={imgSrc}
                              activeBack={choosenSettings.cardBack}
                              onChooseCardBack={chooseCardBack}/>)
    });

    const boardSizeButtons = boardSizes.map((size, idx) => {
      return (<BoardSettingButton value={size} key={idx+1}
                            activeBoardSize={choosenSettings.boardSize}
                            onChooseBoard={chooseBoardSize}/>)
    })

    return (

      <div className={`settings ${clazz}`}>
        <div className="settings__card-back">
          <div className="settings__card-back-text">Choose card back:</div>
          {cardBackButtons}
        </div>
        <div className="settings__board">
          <div className="settings__board-text">Choose amount of cards:</div>
          {boardSizeButtons}
        </div>
        <button className="settings__save"
                // onClick={() => applySettings(activeBoardSize, activeCardBack, cardType)}>
                // onClick={() => applySettings(activeCardBack)}>
                onClick={applySettings}>
                  Save and start new game
        </button>
      </div>
    )
  }
}
