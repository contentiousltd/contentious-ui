import React from 'react';
import { StarRating } from '../core/StarRating.jsx';

export function CriterionCard({ name, level, analysis, improve, style }) {
  return (
    <div className="c-criterion" style={style}>
      <div className="c-criterion__head">
        <span className="c-criterion__name">{name}</span>
        <StarRating level={level} label={name + ': ' + level + ' out of 5'} />
      </div>
      <h4>Analysis</h4>
      <p>{analysis}</p>
      {improve && (
        <div className="c-criterion__improve">
          <h4>How to improve</h4>
          <p>{improve}</p>
        </div>
      )}
    </div>
  );
}
