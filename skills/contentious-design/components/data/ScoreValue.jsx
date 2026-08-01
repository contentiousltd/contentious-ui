import React from 'react';
import { scoreToLevel } from '../core/StarRating.jsx';

/**
 * A 0-100 score shown with its level. The number is never coloured by the
 * level: see the --score-band-* and .c-score notes for why.
 */
export function ScoreValue({ score, size = 'md', marker, label, style }) {
  const has = score !== null && score !== undefined && !Number.isNaN(score);
  const level = has ? scoreToLevel(score) : 0;
  const shape = marker || (size === 'lg' || size === 'inline' ? 'rail' : 'track');
  const cls = ['c-score', has ? 'c-score--l' + level : 'c-score--empty',
    size === 'sm' ? 'c-score--sm' : size === 'lg' ? 'c-score--lg' : size === 'inline' ? 'c-score--inline' : '']
    .filter(Boolean).join(' ');
  return (
    <span className={cls} style={style} role="img" aria-label={label || (has ? score + ' out of 100, ' + level + ' out of 5' : 'Not scored yet')}>
      <span className="c-score__num">{has ? score : 'not scored'}</span>
      {has && shape === 'track' && (
        <span className="c-score__track">
          {[1, 2, 3, 4, 5].map((i) => <i key={i} className={i <= level ? 'is-on' : undefined} />)}
        </span>
      )}
      {has && shape === 'dot' && <span className="c-score__dot" />}
      {has && shape === 'rail' && <span className="c-score__rail" />}
    </span>
  );
}
