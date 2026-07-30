import React from 'react';

export function SegmentedControl({ options = [], value, onChange, style }) {
  return (
    <div style={{
      display: 'inline-flex', background: 'var(--surface-raised)',
      borderRadius: 'var(--radius-control)', padding: 3, gap: 2, ...style,
    }}>
      {options.map((o) => (
        <span key={o} onClick={() => onChange && onChange(o)} style={{
          fontFamily: 'var(--font-heading)', fontSize: 13, padding: '6px 13px',
          borderRadius: 4, cursor: 'pointer',
          background: o === value ? 'var(--limestone-200)' : 'transparent',
          color: o === value ? 'var(--text-strong)' : 'var(--text-secondary)',
        }}>{o}</span>
      ))}
    </div>
  );
}
