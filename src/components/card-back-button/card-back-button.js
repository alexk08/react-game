import React from 'react';
import './card-back-button.css';

const CardBackButton = ({name, imgSrc, onChooseCardBack, activeBack }) => {
  const clazz = (name === activeBack) ? 'card-back-button--active' : '';

  return (
    <button className={`card-back-button ${clazz}`}
            type="button">
        <img width="40" height="60" 
             src={imgSrc} alt={`${name}-back`}
             onClick={() => onChooseCardBack(name)}/>
    </button>
  )
}

export default CardBackButton;