import React from 'react';
import { scoreToLevel } from '../core/StarRating.jsx';

/* Box and stroke per size. Stroke thickens as the ring shrinks: 13% of the
   outer diameter at sm, 9% at md, 7% at lg, because a 46px badge needs
   proportionally more weight to hold its colour. */
const DIMS = { sm: [46, 6], md: [86, 8], lg: [200, 14] };

export function ScoreGauge({ score, size = 'md', caption, style }) {
  const [box, stroke] = DIMS[size] || DIMS.md;
  const r = (box - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, score)) / 100;
  const c = box / 2;
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', ...style }}>
      <div className={'c-gauge c-gauge--' + size + ' c-gauge--l' + scoreToLevel(score)}
        role="img" aria-label={score + ' out of 100'}>
        <svg width={box} height={box}>
          <circle className="c-gauge__track" cx={c} cy={c} r={r} strokeWidth={stroke} />
          <circle className="c-gauge__arc" cx={c} cy={c} r={r} strokeWidth={stroke}
            strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
            transform={'rotate(-90 ' + c + ' ' + c + ')'} />
        </svg>
        <span className="c-gauge__value">{score}</span>
      </div>
      {caption && <div className="c-gauge__caption">{caption}</div>}
    </div>
  );
}
