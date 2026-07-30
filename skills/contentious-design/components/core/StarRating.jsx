import React from 'react';

/* The app's own star asset should replace this path when available: it is a
   UI icon (inline SVG, currentColor), never a unicode glyph. */
function Star({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 1.6l1.86 3.94 4.14.6-3 3.02.71 4.24L8 11.4l-3.71 2 .71-4.24-3-3.02 4.14-.6z" fill="currentColor" />
    </svg>
  );
}

export function StarRating({ level, outOf = 5, size = 'md', label, style }) {
  const px = size === 'sm' ? 12 : size === 'lg' ? 20 : 16;
  const n = Math.max(0, Math.min(outOf, Math.round(level || 0)));
  return (
    <span className={'c-stars c-stars--l' + n + (size === 'sm' ? ' c-stars--sm' : size === 'lg' ? ' c-stars--lg' : '')} role="img"
      aria-label={label || (n + ' out of ' + outOf)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 3, lineHeight: 0, ...style }}>
      {Array.from({ length: outOf }, (_, i) => (
        <span key={i} className={i < n ? 'on' : 'off'} style={{ display: 'block', flex: 'none' }}>
          <Star size={px} />
        </span>
      ))}
    </span>
  );
}

/**
 * Maps a 0-100 score onto the five framework levels.
 * A 1-5 rating as a percentage puts the band edges at 20/40/60/80.
 * Port this to src/lib/colors.ts as scoreToStars(), beside getScoreColour().
 */
export function scoreToLevel(score) {
  if (score >= 80) return 5;
  if (score >= 60) return 4;
  if (score >= 40) return 3;
  if (score >= 20) return 2;
  return 1;
}
