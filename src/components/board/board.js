import React, { Component } from 'react';
import Card from '../card';

import './board.css';

export default class Board extends Component {
  state = {
    data: this.shuffleArr(this.createData())
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
    this.setState(({data}) => {
      const clickedCard = data.find(({id}) => id === +idx);

      if (clickedCard.isGuessed || clickedCard.isOpened 
                                || clickedCard.isNotGuessed 
                                || clickedCard.pause) return;
      
      const openedCard = data.find(({isOpened, isGuessed}) => 
                         isOpened && !isGuessed);

      if (!openedCard) {
        clickedCard.isOpened = true;
        return {
          data: data
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
        data
      }
    })
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

  isWin(data) {
    let result = true;

    data.forEach((card) => {
      if (!card.isOpened) {
        result = false;
      }
    });

    return result;
  }

  render() {
    const { data } = this.state;
    const clazz = this.isWin(data) ? 'board__message--show' : '';

    const cards =  data.map(({text, id, isOpened, imageSrc }) => <Card text={text} 
                                       key={id}
                                       id={id}
                                       isOpened={isOpened}
                                       imageSrc={imageSrc}
                                       openCard={this.openCard}/>);
    return (
      <div className="board">
        <div className={`board__message ${clazz}`}>
          You win
        </div>
        
        {cards}
      </div>
    )
  } 
}
