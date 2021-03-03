import React, {Component} from 'react';
import './card.css';

export default class Card extends Component {
  onCardClick = ({target}) => {
    const id = target.id;

    if (!id) return;
    this.props.openCard(id);
  }

  render() {
    const {text, isOpened, id} = this.props;

    const clazz = isOpened ? 'card__num--show' : ''; 

    return (
      <div className="card" 
           id={id} 
           onClick={this.onCardClick}>
        <div className={`card__num ${clazz}`}>
          {text}
        </div>
      </div>
    )
  }
}
