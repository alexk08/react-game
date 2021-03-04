import React, { Component } from 'react';

import CardBackButton from '../card-back-button';

import './settings.css';

import blueBack from '../card/images/card-back-blue.png';
import redBack from '../card/images/card-back-red.png';

export default class Settings extends Component {
  state = {
    cardBack: 'red',
    cardType: 'cards'
  }

  chooseCardBack = (cardBack) => {
    this.setState({
      cardBack
    });
  }

  render() {
    const {isSettingsOpen, applySettings} = this.props;
    const {cardBack, cardType} = this.state;

    const clazz = isSettingsOpen ? 'settings--show' : '';

    return (

      <div className={`settings ${clazz}`}>
        <div className="settings__card-back">
          <div className="settings__card-back-text">Choose card back:</div>
          <CardBackButton name="blue"
                          imgSrc={blueBack}
                          activeButton={cardBack}
                          onCardButtonClick={this.chooseCardBack}/>
          <CardBackButton name="red"
                          imgSrc={redBack}
                          activeButton={cardBack}
                          onCardButtonClick={this.chooseCardBack}/>
        </div>
        <button className="settings-save"
                onClick={() => applySettings(cardBack, cardType)}>
                  Save
        </button>
      </div>
    )
  }
}
