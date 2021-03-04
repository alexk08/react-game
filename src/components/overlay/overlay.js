import React from 'react';
import './overlay.css';

const Overlay = ({isOverlayOpen, toggleSettings}) => {
  const clazz = isOverlayOpen ? 'overlay--show' : '';

  const onOverlayClick = () => {
    toggleSettings();
  }
  
  return (
    <div className={`overlay ${clazz}`}
         onClick={onOverlayClick}>

    </div>
  )
}

export default Overlay;