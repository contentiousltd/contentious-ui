import React from 'react';

export function MicroSeries({ points = [], labels = [], currentIndex, height = 54, style }) {
  const max = Math.max(...points, 1);
  const cur = currentIndex == null ? points.length - 1 : currentIndex;
  return (
    <div style={style}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height }}>
        {points.map((p, i) => (
          <span key={i} style={{
            flex: 1, minHeight: 2, height: `${(p / max) * 100}%`,
            background: i === cur ? 'var(--series-bar-current)' : 'var(--series-bar)',
            borderRadius: '2px 2px 0 0',
          }} />
        ))}
      </div>
      {labels.length > 0 && (
        <div style={{ display: 'flex', gap: 5, marginTop: 7 }}>
          {labels.map((l, i) => (
            <span key={i} style={{
              flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 10,
              letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-muted)',
            }}>{l}</span>
          ))}
        </div>
      )}
    </div>
  );
}
