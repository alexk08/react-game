import React, {Component} from 'react';
import './card.css';

export default class Card extends Component {
  onCardClick = ({target}) => {
    const id = target.id;

    if (!id) return;
    this.props.openCard(id);
  }

  // createImage(src) {
  //   const image = new Image();
  //   image.src = src;

  //   return image;
  // }

  render() {
    const {text, isOpened, id, imageSrc} = this.props;

    const clazz = isOpened ? 'card--rotate' : ''; 

    return (
      <div className={`card ${clazz}`} >
        <div className="card__container">
          <div className="card__face"
               id={id} 
               onClick={this.onCardClick}
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
