import React from 'react';

const DEFAULTS = ['var(--comp-1)', 'var(--comp-2)', 'var(--comp-3)', 'var(--comp-4)'];

export function CompositionBar({ segments = [], note, style }) {
  const total = segments.reduce((s, x) => s + (x.value || 0), 0) || 1;
  return (
    <div style={style}>
      <div style={{
        display: 'flex', height: 9, borderRadius: 5, overflow: 'hidden',
        background: 'var(--comp-track)',
      }}>
        {segments.map((s, i) => (
          <span key={i} style={{ width: `${(s.value / total) * 100}%`, background: s.color || DEFAULTS[i] }} />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 22, marginTop: 12, flexWrap: 'wrap' }}>
        {segments.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'var(--text-secondary)' }}>
            <span style={{ width: 9, height: 9, borderRadius: 2, flex: 'none', background: s.color || DEFAULTS[i] }} />
            {s.label}
            <b style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 400,
              color: 'var(--text-body)', fontVariantNumeric: 'tabular-nums',
            }}>{s.display}</b>
          </div>
        ))}
      </div>
      {note && <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 16 }}>{note}</div>}
    </div>
  );
}
