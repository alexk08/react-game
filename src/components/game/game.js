import React, { Component } from 'react';

import Board from '../board';
import Header from '../header';
import Footer from '../footer';
import Settings from '../settings';
import Statistic from '../statistic';
import Overlay from '../overlay';

import './game.css';

import moveSound from './sounds/move-sound.mp3';

import shuffleArr from './methods/shuffleArr';
import createData from './methods/createData';
import saveGame from './methods/saveGame';
import loadGame from './methods/loadGame';

export default class Game extends Component {
  constructor() {
    super();
    this.startBoardSize = 18;
    this.startSettings = {cardBack: 'red', boardSize: 18, cardType: 'pictures'};
    this.localStorageData = loadGame();

    this.state = this.localStorageData ? this.localStorageData : {
      data: shuffleArr(createData(this.startSettings.boardSize, this.startSettings.cardType)),
      clickCounter: 0,
      movesCounter: 0,
      isWin: false,
      isSettingsOpen: false,
      isStatisticOpen: false,
      isGameStart: false,
      choosenSettings: {
        ...this.startSettings
      },
      savedSettings: {
        ...this.startSettings
      },
      statistic: []
    };
  }

  componentDidUpdate() {
    const { data } = this.state;

    const allOpened = data.findIndex(({ isOpened }) => !isOpened) === -1;
    const allGuessed = data.findIndex(({ isGuessed }) => !isGuessed) === -1;
    const hasPause = data.findIndex(({ pause }) => pause) > -1;

    if (hasPause) return;

    if (!allOpened) saveGame(this.state);
    if (allOpened && allGuessed) saveGame(this.state);
  }

  openCard = (idx) => {
    const { isGameStart } = this.state;
    const audio = new Audio(moveSound);

    if (!isGameStart) return;

    this.addMove();

    this.setState(({data, clickCounter }) => {
      const clickedCard = data.find(({id}) => id === +idx);

      if (clickedCard.isGuessed || clickedCard.isOpened 
                                || clickedCard.isNotGuessed 
                                || clickedCard.pause) return;
      
      const openedCard = data.find(({isOpened, isGuessed}) => 
                         isOpened && !isGuessed);
      
      audio.play();

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

  async isWin() {
    await this.setState(({ data }) => {
      
      const openedCard = data.findIndex(({isOpened}) => !isOpened);
      const isWin = openedCard === -1;

      if (isWin) { 
        return {
          isWin,
          isGameStart: !isWin
        }
      }
    })

    if (this.state.isWin) {
      this.changeStatistic();
    }
  }

  changeStatistic() {
    this.setState(({ statistic, movesCounter }) => {
      const copyStat = [];

      if (statistic.length > 0) {
        statistic.forEach((item) => copyStat.push({...item}));
      }
      console.log(copyStat)
      
      const lastIndex = copyStat.length - 1;
      console.log(copyStat)
      const date = new Date();

      const newResult = {
        date: {
          hours: date.getHours(),
          minutes: date.getMinutes(),
          seconds: date.getMinutes(),
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear()
        },
        result: movesCounter
      };
      console.log(newResult);

      if (lastIndex < 10) {
        copyStat.push(newResult);
      } else if (movesCounter < +copyStat[lastIndex].result) {
        copyStat[lastIndex] = newResult;
      }

      console.log(copyStat);

      function compareResults(a, b) {
        return (+a.result) - (+b.result);
      }

      const newStat = copyStat.sort(compareResults).slice(0, 10);
      console.log(newStat);

      return {
        statistic: newStat 
      }
    });
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

  chooseSetting = (value, setting) => {
    this.setState(({ choosenSettings }) => {

      choosenSettings[setting] = value;

      return {
        choosenSettings
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

  toggleStatistic = () => {
    this.setState(({ isStatisticOpen }) => {
      return {
        isStatisticOpen: !isStatisticOpen
      }
    });
  }

  shuffle = async () => {
    this.setState(({ savedSettings }) => {
      const { boardSize, cardType } = savedSettings;

      return {
        isGameStart: false,
        isWin: false,
        movesCounter: 0,
        clickCounter: 0,
        data: shuffleArr(createData(boardSize, cardType))
      }
    });
  }

  startWithOpenedCards = async () => {
    this.setState({isWin: false});
    this.closeCards();
    await this.letDelay(500);
    await this.shuffle();
    await this.letDelay(1000);
    this.showCards();
    await this.letDelay(3000);
    this.closeCards();
  }

  startWithClosedCards = async () => {
    await this.shuffle();
    await this.letDelay(500);
    this.showCards();
    await this.letDelay(2500);
    this.closeCards();
  }

  letDelay = async (delay) => {
    return new Promise((res, rej) => setTimeout(res, delay));
  }

  startGame = async () => {
    const { data } = this.state;
    const openedCard = data.findIndex(({isOpened}) => isOpened);

    
    if (openedCard > -1) {
      await this.startWithOpenedCards();
      this.setState({isGameStart: true});
      return
    } 

    await this.startWithClosedCards();
    this.setState({isGameStart: true});
    return;
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
    const { data, movesCounter, isWin, isSettingsOpen, choosenSettings, savedSettings, statistic, isStatisticOpen } = this.state;
    const cardBackImage = `./images/card-back-${savedSettings.cardBack}.png`

    return (
      <div className="game">
        <Header movesCounter={movesCounter}
                toggleSettings={this.toggleSettings}
                startGame={this.startGame}
                toggleStatistic={this.toggleStatistic}/>
        <main>
          <Board data={data}
                 isWin={isWin}
                 openCard={this.openCard}
                 cardBack={cardBackImage}/>
          <Settings isSettingsOpen={isSettingsOpen}
                    applySettings={this.applySettings}
                    choosenSettings={choosenSettings}
                    chooseSetting={this.chooseSetting}/>
          <Statistic isStatisticOpen={isStatisticOpen}
                     statistic={statistic}/>
        </main>
        <Footer />
        <Overlay isOverlayOpen={isSettingsOpen}
                 toggleSettings={this.toggleSettings}
                 toggleStatistic={this.toggleStatistic}
                 isStatisticOpen={isStatisticOpen}
                 isSettingsOpen={isSettingsOpen}/>
      </div>
    )
  }
} 
