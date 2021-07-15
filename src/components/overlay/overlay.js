import React from 'react';
import './overlay.css';

const Overlay = ({ isOverlayOpen, toggleSettings, toggleStatistic, isStatisticOpen, isSettingsOpen }) => {
  const clazz = isOverlayOpen || isStatisticOpen ? 'overlay--show' : '';

  const onOverlayClick = () => {
    if (isSettingsOpen) toggleSettings();
    if (isStatisticOpen) toggleStatistic();
  }
  
  return (
    <div className={`overlay ${clazz}`}
         onClick={onOverlayClick}>

    </div>
  )
}

export default Overlay;