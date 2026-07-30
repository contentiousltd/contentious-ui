import React from 'react';

export function MetricBand({ columns, variant = 'default', children, style }) {
  const kids = React.Children.toArray(children);
  const cols = columns || kids.length || 1;
  const cls = 'c-band' + (variant === 'compact' ? ' c-band--compact' : variant === 'grid' ? ' c-band--grid' : '');
  const grid = variant === 'compact'
    ? { display: 'inline-flex', alignItems: 'stretch' }
    : { display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)' };
  return (
    <div className={cls} style={{
      ...grid,
      background: variant === 'grid' ? 'var(--rule-row)' : 'var(--surface-card)',
      borderRadius: 'var(--radius-surface)', overflow: 'hidden',
      gap: variant === 'grid' ? 1 : 0, ...style,
    }}>
      {kids.map((child, i) => (
        <div key={i} style={{
          minWidth: 0,
          background: variant === 'grid' ? 'var(--surface-card)' : 'transparent',
          borderLeft: i && variant !== 'grid' ? '1px solid var(--rule-row)' : 'none',
        }}>{child}</div>
      ))}
    </div>
  );
}
