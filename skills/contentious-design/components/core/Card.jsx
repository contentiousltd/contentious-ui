import React from 'react';

// tone="deep" marks a card as a different KIND of thing from the cards around
// it - the reader's own row in a set, or a row that explains rather than
// reports. It carries data-surface="deep", which remaps the mono label, the
// section rule and the link colour. Never for emphasis, and never for anything
// carrying a score: --level-empty is the deep card's own value.
export function Card({ chips, selected, tone = 'card', children, style }) {
  const deep = tone === 'deep' || tone === 'raised';   // 'raised' is a deprecated alias
  const bg = deep ? 'var(--surface-card-deep)' : 'var(--surface-card)';
  return (
    <div data-surface={deep ? 'deep' : undefined} style={{
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
