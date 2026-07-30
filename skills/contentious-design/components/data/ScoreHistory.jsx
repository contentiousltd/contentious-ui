import React from 'react';
import { scoreToLevel } from '../core/StarRating.jsx';

export function ScoreHistory({ points = [], min = 0, max = 100, ticks = [0, 25, 50, 75, 100], note, style }) {
  if (points.length < 2) {
    return (
      <div className="c-history" style={style}>
        {note && <p className="c-history__note">{note}</p>}
        <div className="c-history__empty">
          <p>{points.length === 1
            ? 'Measured once, on ' + points[0].label + '. A second assessment will show how the score moves.'
            : 'No assessments yet. History appears once this page has been scored twice.'}</p>
        </div>
      </div>
    );
  }
  /* One coordinate system for the line and the points: 0-100 on both axes,
     y measured from the bottom. The polyline is drawn in an SVG with
     preserveAspectRatio="none", so it stretches with the plot and stays
     correct at any aspect ratio. */
  const x = (i) => (i / (points.length - 1)) * 100;
  const y = (v) => ((v - min) / (max - min)) * 100;
  const path = points.map((p, i) => x(i) + ',' + (100 - y(p.score))).join(' ');
  return (
    <div className="c-history" style={style}>
      {note && <p className="c-history__note">{note}</p>}
      <div className="c-history__plot">
        <div className="c-history__grid">
          {ticks.map((tk) => <i key={tk} style={{ bottom: y(tk) + '%' }} />)}
        </div>
        {ticks.map((tk) => (
          <span key={tk} className="c-history__ylabel" style={{ bottom: y(tk) + '%' }}>{tk}</span>
        ))}
        <svg className="c-history__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points={path} />
        </svg>
        {points.map((p, i) => (
          <React.Fragment key={i}>
            <span className="c-history__point" style={{
              left: x(i) + '%', bottom: y(p.score) + '%',
              background: 'var(--level-' + scoreToLevel(p.score) + ')',
            }} />
            <span className="c-history__xlabel" style={{ left: x(i) + '%' }}>{p.label}</span>
          </React.Fragment>
        ))}
      </div>
      <div className="c-history__foot" />
    </div>
  );
}
