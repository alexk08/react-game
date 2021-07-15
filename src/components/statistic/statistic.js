import React, { Component } from 'react';

import './statistic.css';

export default class Statistic extends Component {
  
  render() {
    const { isStatisticOpen, statistic } = this.props;
    const clazz = isStatisticOpen ? 'statistic--show' : '';
    
    const statList = statistic ? statistic.map(({ date, result }, idx) => {
      const { hours, minutes, seconds, day, month, year } = date;
      
      return (
        <div className="statistic__item" key={idx}>
          <div className="statistic__date">
            <span>{hours}</span><span>:</span><span>{minutes < 10 ? `0${minutes}` : minutes}</span><span>:</span><span>{seconds < 10 ? `0${seconds}` : seconds }</span><span> </span>
            <span>{day}</span><span>/</span><span>{month}</span><span>/</span><span>{year}</span>
          </div>
          <div className="statistic__result">{result}</div>
        </div>
      )
    }) : null;

    return (
      <div className={`statistic ${clazz}`}>
        <h2>Statistic</h2>
        <div className="statistic__list">
          <div className="statistic__item-title">
            <h3 className="statistic__date-title">Date</h3>
            <h3 className="statistic__result-title">Result</h3>
          </div>
          {statList}
        </div>
        
      </div>
    )
  }
}
