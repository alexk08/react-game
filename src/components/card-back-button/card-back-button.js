import React from 'react';
import './card-back-button.css';

const CardBackButton = ({name, imgSrc, onCardButtonClick, activeButton }) => {
  const clazz = (name === activeButton) ? 'card-back-button--active' : '';

  return (
    <button className={`card-back-button card-back-button--${name} ${clazz}`}
            type="button">
        <img width="40" height="60" 
             src={imgSrc} alt={`${name}-back`}
             onClick={() => onCardButtonClick(name)}/>
    </button>
  )
}

export default CardBackButton;