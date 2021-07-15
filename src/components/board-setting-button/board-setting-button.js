import React from 'react';

import './board-setting-button.css';

const BoardSettingButton = ({ value, activeBoardSize, onChooseBoard }) => {
  const clazz = (value === activeBoardSize) ? 'board-setting-button--active' : '';

  return (
    <button className={`board-setting-button ${clazz}`}
            type="button"
            onClick={() => onChooseBoard(value, 'boardSize')}>
      {value}
    </button>
  );
};

export default BoardSettingButton;
