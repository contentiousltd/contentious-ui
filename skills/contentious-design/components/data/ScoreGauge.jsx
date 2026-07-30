import React from 'react';
import { scoreToLevel } from '../core/StarRating.jsx';

const DIMS = { sm: [46, 4], md: [86, 7], lg: [200, 14] };

export function ScoreGauge({ score, size = 'md', caption, gap = 0.18, style }) {
  const [box, stroke] = DIMS[size] || DIMS.md;
  const r = (box - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const visible = 1 - gap;                       // open ring: a gap at the top
  const filled = circ * visible * Math.max(0, Math.min(100, score)) / 100;
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', ...style }}>
      <div className={'c-gauge c-gauge--' + size + ' c-gauge--l' + scoreToLevel(score)}>
        <svg width={box} height={box} style={{ transform: 'rotate(' + (-90 + gap * 180) + 'deg)' }}>
          <circle className="c-gauge__track" cx={box / 2} cy={box / 2} r={r}
            strokeWidth={stroke} strokeDasharray={circ * visible + ' ' + circ} strokeLinecap="round" />
          <circle className="c-gauge__arc" cx={box / 2} cy={box / 2} r={r}
            strokeWidth={stroke} strokeDasharray={filled + ' ' + circ} />
        </svg>
        <span className="c-gauge__value">{score}</span>
      </div>
      {caption && <div className="c-gauge__caption">{caption}</div>}
    </div>
  );
}
