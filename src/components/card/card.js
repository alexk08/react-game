import React, {Component} from 'react';
import './card.css';

export default class Card extends Component {

  onCardClick = ({target}, addMove) => {
    const id = target.id;

    if (!id) return;
    this.props.openCard(id);

    if (this.props.clickCounter % 2 === 1) { 
      addMove();
    }
  }

  // createImage(src) {
  //   const image = new Image();
  //   image.src = src;

  //   return image;
  // }

  render() {
    const {text, isOpened, id, imageSrc, addMove } = this.props;

    const clazz = isOpened ? 'card--rotate' : ''; 

    return (
      <div className={`card ${clazz}`} >
        <div className="card__container">
          <div className="card__face"
               id={id} 
               onClick={(e) => this.onCardClick(e, addMove)}
               data-id={text}>
          </div>
          <div className="card__face card__face--back">
            <img width="200" height="300" src={imageSrc} alt="something"/>
          </div>
        </div>
      </div>
    )
  }
}
