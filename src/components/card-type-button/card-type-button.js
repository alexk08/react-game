import React from 'react';
import './card-type-button.css';

const CardTypeButton = ({name, imgSrc, onChooseCardType, activeType }) => {
  const clazz = (name === activeType) ? 'card-type-button--active' : '';

  return (
    <button className={`card-type-button ${clazz}`}
            type="button">
        <img width="40" height="60" 
             src={imgSrc} alt={`${name}-type`}
             onClick={() => onChooseCardType(name, 'cardType')}/>
    </button>
  )
}

export default CardTypeButton;