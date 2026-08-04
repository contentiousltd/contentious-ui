import React from 'react';

export function MetricBand({ columns, variant = 'default', title, note, children, style }) {
  const kids = React.Children.toArray(children);
  const cols = columns || kids.length || 1;
  const compact = variant === 'compact';
  const grid = variant === 'grid';
  const titled = variant === 'titled';
  const cls = 'c-band' + (compact ? ' c-band--compact' : grid ? ' c-band--grid' : titled ? ' c-band--titled' : '');

  // Compact is OUTLINED AND TRANSPARENT: it is a summary strip fixed under a page
  // header, not one of the cards it summarises. Dividers match the border.
  const rule = compact ? 'var(--rule-field)' : 'var(--rule-row)';

  const cells = kids.map((child, i) => (
    <div key={i} style={{
      minWidth: 0,
      background: grid ? 'var(--surface-card)' : 'transparent',
      borderLeft: i && !grid ? '1px solid ' + rule : 'none',
    }}>{child}</div>
  ));

  const body = (
    <div style={{
      ...(compact
        ? { display: 'inline-flex', alignItems: 'stretch' }
        : { display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)' }),
      background: grid ? 'var(--rule-row)' : 'transparent',
      gap: grid ? 1 : 0,
    }}>{cells}</div>
  );

  if (titled) {
    return (
      <div className={cls} style={{
        display: 'block', background: 'var(--surface-card)',
        borderRadius: 'var(--radius-surface)', overflow: 'hidden', ...style,
      }}>
        <div className="c-band__head" style={{
          display: 'flex', alignItems: 'baseline', gap: 'calc(var(--u) * .89)',
          padding: 'calc(var(--u) * .94) calc(var(--u) * 1.11) calc(var(--u) * .78)',
          borderBottom: '1px solid var(--rule-row)',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: 'var(--t-section)',
            lineHeight: 1.2, color: 'var(--text-strong)', margin: 0, whiteSpace: 'nowrap',
          }}>{title}</h3>
          {note && <p style={{ fontSize: 'var(--t-hint)', color: 'var(--text-muted)', margin: 0 }}>{note}</p>}
        </div>
        <div className="c-band__body">{body}</div>
      </div>
    );
  }

  return (
    <div className={cls} style={{
      ...(compact
        ? { display: 'inline-flex', alignItems: 'stretch', border: '1px solid var(--rule-field)' }
        : { display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)' }),
      background: compact ? 'transparent' : grid ? 'var(--rule-row)' : 'var(--surface-card)',
      borderRadius: 'var(--radius-surface)', overflow: 'hidden',
      gap: grid ? 1 : 0, ...style,
    }}>{cells}</div>
  );
}
