import React from 'react';

export function Card({ chips, selected, tone = 'card', children, style }) {
  const bg = tone === 'raised' ? 'var(--surface-raised)' : 'var(--surface-card)';
  return (
    <div style={{
      position: 'relative', background: bg, borderRadius: 'var(--radius-surface)',
      padding: '18px 20px',
      outline: selected ? '2px solid var(--fire-450)' : 'none', ...style,
    }}>
      {chips && (
        <div style={{
          position: 'absolute', top: -10, left: 20, display: 'flex', gap: 6,
        }}>{chips}</div>
      )}
      {children}
    </div>
  );
}
