import React, {Component} from 'react';
import './card.css';

export default class Card extends Component {

  onCardClick = ({target}) => {
    const id = target.id;
    const { openCard } =this.props;
    
    if (!id) return;
    openCard(id);
  }

  render() {
    const { text, isOpened, id, imageSrc, cardBack } = this.props;

    const clazz = isOpened ? 'card--rotate' : ''; 

    return (
      <div className={`card ${clazz}`} >
        <div className="card__container">
          <div className="card__face"
               id={id} 
               onClick={this.onCardClick}
               data-id={text}
               style={{backgroundImage: `url(${cardBack})`}}>
          </div>
          <div className="card__face card__face--back">
            <img width="200" height="300" src={imageSrc} alt="something"/>
          </div>
        </div>
      </div>
    )
  }
}
