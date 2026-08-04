import React from 'react';

/* Marketing only. Put the section inside <div className="c-marketing"> so --u
   resolves at the 24px marketing base; the sizes below are multiples of it. */
export function FeatureCard({ art, accent, title, children, href, style }) {
  const Tag = href ? 'a' : 'div';
  return (
    <Tag href={href} data-surface="deep" className={href ? 'c-feature c-feature--link' : undefined} style={{
      display: 'grid', justifyItems: 'center', textAlign: 'center', alignContent: 'start',
      gap: 'calc(var(--u) * 1.11)', background: 'var(--surface-card-deep)',
      borderRadius: 'var(--radius-surface)',
      padding: 'calc(var(--u) * 1.67) calc(var(--u) * 1.33)',
      ...(href ? { textDecoration: 'none', color: 'inherit' } : null), ...style,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: 'calc(var(--u) * 6)',
      }}>{art}</div>
      <div style={{ display: 'grid', gap: 'calc(var(--u) * .44)' }}>
        {accent && (
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--t-label)',
            letterSpacing: 'var(--label-tracking)', textTransform: 'uppercase',
            color: 'var(--label-color)',
          }}>{accent}</div>
        )}
        <h3 style={{
          fontFamily: 'var(--font-heading-display)', fontWeight: 400,
          fontSize: 'var(--t-section)', color: 'var(--text-strong)', margin: 0,
        }}>{title}</h3>
        <p style={{
          fontSize: 'var(--t-body-app)', color: 'var(--text-body)', margin: 0,
          textWrap: 'pretty',
        }}>{children}</p>
      </div>
    </Tag>
  );
}

export function FeatureRow({ columns = 3, children, style }) {
  return (
    <div style={{
      display: 'grid', gap: 'calc(var(--u) * 1.33)',
      gridTemplateColumns: `repeat(${columns}, 1fr)`, ...style,
    }}>{children}</div>
  );
}
