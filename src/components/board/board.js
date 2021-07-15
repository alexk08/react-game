import React, { Component } from 'react';
import Card from '../card';

import './board.css';

export default class Board extends Component {

  render() {
    const { data, openCard, isWin, cardBack } = this.props;

    const clazz = isWin ? 'board__message--show' : '';

    const cards = data.map(({ text, id, 
                             isOpened, imageSrc }) => <Card text={text} 
                                                            key={id}
                                                            id={id}
                                                            isOpened={isOpened}
                                                            imageSrc={imageSrc}
                                                            cardBack={cardBack}
                                                            openCard={openCard}/>);
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
