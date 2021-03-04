import React, { Component } from 'react';
import Board from '../board';
import Header from '../header';
import Footer from '../footer';
import Settings from '../settings';
import Overlay from '../overlay';

import './game.css';

export default class Game extends Component {
  
  state = {
    data: this.shuffleArr(this.createData()),
    clickCounter: 0,
    movesCounter: 0,
    isWin: false,
    cardBack: './images/card-back-red.png',
    isSettingsOpen: false,
    isGameStart: false
  }

  shuffleArr(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  createData() {
    let arr = [];
    let maxId = 100;

    for (let i = 0; i < 9; i++) {
      const el = {
        text: `${i+1}`,
        isOpened: false,
        isGuessed: false,
        isNotGuessed: false,
        pause: false,
        imageSrc: `./images/${i + 1}.jpg`
      };
      arr = [ ...arr, el, el]; 
    }

    arr = arr.map((el, idx) => {
      return {
        ...el,
        id: maxId++,
      }
    })

    return arr;
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
    this.setState(({ data, isGameStart }) => {
      
      let result = true;

      data.forEach((card) => {
        if (!card.isOpened) {
          result = false;
        }
      });

      return {
        isWin: result,
        isGameStart: !result ? true : false 
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

  applySettings = (backSide, cardType) => {
    this.setState({
        cardBack: `./images/card-back-${backSide}.png`
      }
    )
  }

  toggleSettings = () => {
    this.setState(({ isSettingsOpen }) => {
      const temp = isSettingsOpen;

      return {
        isSettingsOpen: !temp
      }
    });
  }

  startGame = () => {
    console.log('start game')
    this.setState(({ data, isGameStart, isWin, movesCounter, clickCounter }) => {
      
      return {
        isWin: false,
        isGameStart: true,
        movesCounter: 0,
        clickCounter: 0,
        data: this.shuffleArr(this.createData())
      }
    });

    this.showCards();
  }

  showCards() {
    this.setState(({ data }) => {

      const openedData = data.map((card) => {
        return {
          ...card,
          isOpened: true
        }
      })

      return {
        data: openedData
      }
    })

    setTimeout(() => this.closeCards(), 2000);
  }

  closeCards = () => {
    this.setState(({ data }) => {
      const closedData = data.map((card) => {
        return {
          ...card,
          isOpened: false
        }
      })

      return {
        data: closedData
      }
    })
  }

  render() {
    const { data, movesCounter, isWin, cardBack, isSettingsOpen } = this.state;
    const isOverlayOpen = isSettingsOpen;

    return (
      <div className="game">
        <Header movesCounter={movesCounter}
                toggleSettings={this.toggleSettings}
                startGame={this.startGame}/>
        <main>
          <Board data={data}
                 isWin={isWin}
                 openCard={this.openCard}
                 cardBack={cardBack}/>
          <Settings isSettingsOpen={isSettingsOpen}
                    applySettings={this.applySettings}/>
        </main>
        <Footer />
        <Overlay isOverlayOpen={isOverlayOpen}
                 toggleSettings={this.toggleSettings}/>
      </div>
    )
  }
} 
