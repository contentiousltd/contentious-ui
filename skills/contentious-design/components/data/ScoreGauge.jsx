import React from 'react';
import { scoreToLevel } from '../core/StarRating.jsx';

/* ONE band ratio for every ring in the suite: --ring-band, 0.16 of the outer
   diameter. The per-size ramp this replaced (13% / 9.3% / 7%) made the gauge
   a third of the donut's weight at lg and was not consistent with itself.
   The donut comes DOWN to 0.16 as well (innerRadius 0.6 -> 0.68), so the two
   rings are one mark. Stroke is derived, never authored. */
const BOX = { sm: 46, md: 86, lg: 200 };
const BAND = 0.16;

export function ScoreGauge({ score, size = 'md', caption, style }) {
  const box = BOX[size] || BOX.md;
  const stroke = Math.round(box * BAND);
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
