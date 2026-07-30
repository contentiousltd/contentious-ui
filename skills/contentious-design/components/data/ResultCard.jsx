import React from 'react';
import { ScoreGauge } from './ScoreGauge.jsx';

export function ResultCard({ title, section, date, score, image, onClick, style }) {
  return (
    <div className="c-result" onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default', ...style }}>
      <div className="c-result__shot">
        {image && <img src={image} alt="" />}
        <span className="c-result__badge"><ScoreGauge score={score} size="sm" /></span>
      </div>
      <div className="c-result__body">
        <div className="c-result__title">{title}</div>
        <div className="c-result__meta">{section}{date ? ' · ' + date : ''}</div>
      </div>
    </div>
  );
}
