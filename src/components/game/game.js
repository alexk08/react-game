import React, { Component } from 'react';
import Board from '../board';
import Header from '../header';
import Footer from '../footer';
import Settings from '../settings';
import Overlay from '../overlay';

import shuffleArr from './methods/shuffleArr';
import createData from './methods/createData';

import './game.css';

export default class Game extends Component {
  constructor() {
    super();
    this.startBoardSize = 18;
    this.startSettings = {cardBack: 'red', boardSize: 18}
    
    this.state = {
      data: shuffleArr(createData(this.startSettings.boardSize)),
      clickCounter: 0,
      movesCounter: 0,
      isWin: false,
      isSettingsOpen: false,
      isGameStart: false,
      choosenSettings: {
        cardBack: this.startSettings.cardBack, 
        boardSize: this.startSettings.boardSize
      },
      savedSettings: {
        cardBack: this.startSettings.cardBack, 
        boardSize: this.startSettings.boardSize
      }
    }
  }

  openCard = (idx) => {
    const { isGameStart } = this.state;

    if (!isGameStart) return;

    this.addMove();

    this.setState(({data, clickCounter }) => {
      const clickedCard = data.find(({id}) => id === +idx);

      if (clickedCard.isGuessed || clickedCard.isOpened 
                                || clickedCard.isNotGuessed 
                                || clickedCard.pause) return;
      
      const openedCard = data.find(({isOpened, isGuessed}) => 
                         isOpened && !isGuessed);
      
      if (!openedCard) {
        clickedCard.isOpened = true;
        return {
          data,
          clickCounter: ++clickCounter
        }
      }

      if (clickedCard.text !== openedCard.text) {
        clickedCard.isOpened = true;
        clickedCard.isNotGuessed = true;
        openedCard.isNotGuessed = true;
        data.forEach((card) => card.pause = true);
        this.closeNotGuessedCards();
      } else {
        clickedCard.isOpened = true;
        clickedCard.isGuessed = true;
        openedCard.isGuessed = true;
      }

      return {
        data,
        clickCounter: ++clickCounter
      }
    })

    this.isWin();
  }

  closeNotGuessedCards() {
    setTimeout(() => {
      this.setState(({data}) => {

        data.forEach((card) => {
          card.pause = false;
          if (card.isNotGuessed) {
            card.isNotGuessed = false;
            card.isOpened = false;
          }
        })

        return {
          data
        }
      })
    }, 1000);
  }

  isWin() {
    this.setState(({ data }) => {
      
      const openedCard = data.findIndex(({isOpened}) => !isOpened);
      const isWin = openedCard === -1;

      if (isWin) { 
        return {
          isWin,
          isGameStart: !isWin 
        }
      }
    })
  }

  addMove = () => {
    this.setState(({movesCounter, clickCounter}) => {
      if (clickCounter % 2 === 1) { 
        const counter = movesCounter + 1;
        
        return {
          movesCounter: counter
        }
      }
    });
  }

  chooseCardBack = (value) => {
    this.setState(({ choosenSettings }) => {
      const newSettings = {
        ...choosenSettings,
        cardBack: value
      };

      return {
        choosenSettings: newSettings
      }
    })
  }

  chooseBoardSize = (value) => {
    this.setState(({ choosenSettings }) => {
      const newSettings = {
        ...choosenSettings,
        boardSize: value
      };

      return {
        choosenSettings: newSettings
      }
    })
  } 

  applySettings = () => {

    this.setState(({ choosenSettings, isSettingsOpen }) => {
      return {
        isSettingsOpen: !isSettingsOpen,
        savedSettings: {...choosenSettings}
      }
    });
    
    setTimeout(this.startGame, 0);
  }

  toggleSettings = () => {
    this.setState(({ savedSettings, isSettingsOpen }) => {
      return {
        isSettingsOpen: !isSettingsOpen,
        choosenSettings: {...savedSettings}
      }
    });
  }

  startGame = () => {
    const { data, savedSettings } = this.state;
    const openedCard = data.findIndex(({isOpened}) => isOpened);
    
    if (openedCard > -1) {
      this.setState({
        isWin: false,
        movesCounter: 0,
        clickCounter: 0
      });
      setTimeout(this.closeCards, 0);

      setTimeout(() => {
          this.setState({
            data: shuffleArr(createData(savedSettings.boardSize))
          });
      }, 1000);
      
      setTimeout(this.showCards, 2000);
      setTimeout(() => {
        this.closeCards()
        this.setState({isGameStart: true})
      }, 5000);

      return
    } 

    this.setState({
      isWin: false,
      movesCounter: 0,
      clickCounter: 0,
      data: shuffleArr(createData(savedSettings.boardSize))
    });
    setTimeout(this.showCards, 0);
    setTimeout(() => {
      this.closeCards()
      this.setState({isGameStart: true})
    }, 3000);
  }

  showCards = () => {
    this.setState(({ data }) => {
      const newData = data.map((card) => {
        return {
          ...card,
          isOpened: true
        }
      })

      return {
        data: newData
      }
    })
  }

  closeCards = () => {
    this.setState(({ data }) => {
      const newData = data.map((card) => {
        return {
          ...card,
          isOpened: false
        }
      })

      return {
        data: newData
      }
    })
  }

  render() {
    
    const { data, movesCounter, isWin, isSettingsOpen, choosenSettings, savedSettings } = this.state;

    const cardBackImage = `./images/card-back-${savedSettings.cardBack}.png`

    return (
      <div className="game">
        <Header movesCounter={movesCounter}
                toggleSettings={this.toggleSettings}
                startGame={this.startGame}/>
        <main>
          <Board data={data}
                 isWin={isWin}
                 openCard={this.openCard}
                 cardBack={cardBackImage}/>
          <Settings isSettingsOpen={isSettingsOpen}
                    applySettings={this.applySettings}
                    choosenSettings={choosenSettings}
                    chooseCardBack={this.chooseCardBack}
                    chooseBoardSize={this.chooseBoardSize}/>
        </main>
        <Footer />
        <Overlay isOverlayOpen={isSettingsOpen}
                 toggleSettings={this.toggleSettings}/>
      </div>
    )
  }
} 
