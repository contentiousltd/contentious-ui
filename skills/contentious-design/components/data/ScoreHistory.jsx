import React from 'react';

/* THE FIVE SCORE BANDS ARE THE GROUND. Edges are the --score-band-* values in
   tokens/semantic.css: nearest whole star, so the boundaries fall on the half
   stars at 30 / 50 / 70 / 90. Full strength, never a tint - a 13% band beside a
   saturated line is two strengths of the same five colours doing different
   jobs. Workings: provenance/Chart coherence decisions 2026-08-05.html */
const BANDS = [
  { from: 0,  to: 30,  level: 1 },
  { from: 30, to: 50,  level: 2 },
  { from: 50, to: 70,  level: 3 },
  { from: 70, to: 90,  level: 4 },
  { from: 90, to: 100, level: 5 },
];

/* THE DOMAIN IS PADDED TO THE DATA, and only ever with the bands drawn: one
   ten-step below the lowest reading's ten, up to the ten above the highest. A
   zoomed axis on its own turns noise into news, and a full 0-100 domain at full
   strength puts a fire band under a healthy score, which is a claim the data
   never made.
   A floor of 30 on the span stops two near-identical readings producing a
   ten-point axis, which would re-create the problem the bands fix. */
function domain(scores, min, max) {
  if (min != null && max != null) return [min, max];
  const lo0 = Math.max(0, Math.floor(Math.min(...scores) / 10) * 10 - 10);
  const hi0 = Math.min(100, Math.ceil(Math.max(...scores) / 10) * 10);
  let lo = min != null ? min : lo0;
  let hi = max != null ? max : hi0;
  if (hi - lo < 30) {
    const grow = (30 - (hi - lo)) / 2;
    lo = Math.max(0, Math.floor((lo - grow) / 10) * 10);
    hi = Math.min(100, Math.ceil((hi + grow) / 10) * 10);
  }
  return [lo, hi];
}

export function ScoreHistory({ points = [], min, max, ticks, note, style }) {
  if (points.length < 2) {
    /* A single point drawn as a flat line across the full width reads as "no
       change over time" rather than "only measured once". That was a real
       defect on the live page. */
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

  const [lo, hi] = domain(points.map((p) => p.score), min, max);
  /* One coordinate system for the bands, the line and the points: 0-100 on
     both axes, y measured from the bottom. The polyline is drawn in an SVG with
     preserveAspectRatio="none", so it stretches with the plot and stays correct
     at any aspect ratio. */
  const x = (i) => (i / (points.length - 1)) * 100;
  const y = (v) => ((v - lo) / (hi - lo)) * 100;
  const path = points.map((p, i) => x(i) + ',' + (100 - y(p.score))).join(' ');

  /* Only the bands the domain actually crosses, clipped to it. */
  const bands = BANDS
    .map((b) => ({ level: b.level, from: Math.max(b.from, lo), to: Math.min(b.to, hi) }))
    .filter((b) => b.to > b.from);

  /* LABELLED EVERY 10, not at the band boundaries: the boundaries are already
     legible as colour, and a reader placing a line between 78 and 80 needs a
     regular step to count against. NO GRIDLINES - a band edge is a gridline,
     and the ramp is already the axis. */
  const marks = ticks || Array.from(
    { length: Math.floor((hi - lo) / 10) + 1 },
    (_, i) => lo + i * 10,
  );

  return (
    <div className="c-history" style={style}>
      {note && <p className="c-history__note">{note}</p>}
      <div className="c-history__plot">
        <div className="c-history__bands">
          {bands.map((b) => (
            <i key={b.level} style={{
              bottom: y(b.from) + '%',
              height: (y(b.to) - y(b.from)) + '%',
              background: 'var(--star-' + b.level + ')',
            }} />
          ))}
        </div>
        {marks.map((tk) => (
          <span key={tk} className="c-history__ylabel" style={{ bottom: y(tk) + '%' }}>{tk}</span>
        ))}
        <svg className="c-history__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points={path} />
        </svg>
        {points.map((p, i) => (
          <React.Fragment key={i}>
            {/* No inline colour: over full-strength bands the ramp is the ground
                and the dot only marks a reading, so it takes --limestone-200
                from the stylesheet like the line does. */}
            <span className="c-history__point" style={{ left: x(i) + '%', bottom: y(p.score) + '%' }} />
            <span className="c-history__xlabel" style={{ left: x(i) + '%' }}>{p.label}</span>
          </React.Fragment>
        ))}
      </div>
      <div className="c-history__foot" />
    </div>
  );
}
