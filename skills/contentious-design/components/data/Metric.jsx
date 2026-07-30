import React from 'react';

const TONE = { default: 'var(--data-default)', good: 'var(--data-good)', bad: 'var(--data-bad)', zero: 'var(--data-zero)' };

export function Metric({ label, chip, value, unit, sub, tone = 'default', style }) {
  return (
    <div style={{ padding: '17px 20px 18px', minWidth: 0, ...style }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 'var(--label-font-size)',
        letterSpacing: 'var(--label-tracking)', textTransform: 'uppercase',
        color: 'var(--label-color)', display: 'flex', alignItems: 'center', gap: 8,
      }}>{label}{chip}</div>
      <div style={{
        font: 'var(--type-metric)', color: TONE[tone] || TONE.default,
        fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em', margin: '9px 0 6px',
      }}>
        {value}
        {unit && <small style={{ fontSize: 15, color: 'var(--text-muted)', letterSpacing: 0 }}>{unit}</small>}
      </div>
      {sub && <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.4 }}>{sub}</div>}
    </div>
  );
}
