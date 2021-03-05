import React, { Component } from 'react';

import CardBackButton from '../card-back-button';

import './settings.css';

import blueBack from '../card/images/card-back-blue.png';
import redBack from '../card/images/card-back-red.png';

// const CARD_BACKS = ['blue', 'red']

export default class Settings extends Component {
  state = {
    cardBack: 'red',
    cardType: 'cards',
    data: [
      {
        color: 'blue',
        imgSrc: blueBack
      },
      {
        color: 'blue',
        imgSrc: redBack
      }
    ]
  }

  chooseCardBack = (cardBack) => {
    this.setState({
      cardBack
    });
  }

  render() {
    const {isSettingsOpen, applySettings} = this.props;
    const {cardBack, cardType, data} = this.state;

    const clazz = isSettingsOpen ? 'settings--show' : '';

    // const CardBackButtons = data.map(({color, imgSrc}, idx) => {
    //   return (<CardBackButton name={color}
    //                           key={idx+1}
    //                           imgSrc={imgSrc}
    //                           activeButton={cardBack}
    //                           onCardButtonClick={this.chooseCardBack}/>)
    // });

    return (

      <div className={`settings ${clazz}`}>
        <div className="settings__card-back">
          <div className="settings__card-back-text">Choose card back:</div>
          {/* {CardBackButtons} */}
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
