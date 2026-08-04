import React from 'react';

export function Menu({ width = 246, children, style }) {
  return (
    <div style={{
      width, background: 'var(--surface-menu)', border: '1px solid var(--rule-section)',
      borderRadius: 'var(--radius-surface)', boxShadow: 'var(--shadow-lg)',
      padding: 6, ...style,
    }}>{children}</div>
  );
}

export function MenuHeader({ label, value, style }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', gap: 8, padding: '9px 10px 10px',
      borderBottom: '1px solid var(--rule-section)', marginBottom: 6, ...style,
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 'var(--label-font-size)',
        letterSpacing: 'var(--label-tracking)', textTransform: 'uppercase', color: 'var(--text-muted)',
      }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-heading)', fontSize: 15, color: 'var(--text-strong)' }}>{value}</span>
    </div>
  );
}

export function MenuLabel({ children, style }) {
  return (
    <div style={{
      fontFamily: 'var(--font-mono)', fontSize: 'var(--label-font-size)',
      letterSpacing: 'var(--label-tracking)', textTransform: 'uppercase',
      color: 'var(--text-muted)', padding: '11px 10px 4px', ...style,
    }}>{children}</div>
  );
}

export function MenuItem({ icon, title, sub, right, tone = 'default', current, onClick, style }) {
  const [hov, setHov] = React.useState(false);
  const danger = tone === 'danger';
  const self = tone === 'self';
  const hot = hov && !self;
  const bg = current || hot ? (danger ? 'var(--fire-150)' : 'var(--surface-hover)') : 'transparent';
  return (
    <div onClick={self ? undefined : onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '7px 10px',
        borderRadius: 5, cursor: self ? 'default' : 'pointer', background: bg, ...style,
      }}>
      {icon && (
        <span style={{ display: 'flex', flex: 'none', color: hot ? 'var(--text-secondary)' : 'var(--text-muted)' }}>{icon}</span>
      )}
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--font-heading)', fontSize: 14, lineHeight: 1.25,
          color: danger && hot ? 'var(--fire-700)' : self ? 'var(--text-muted)' : 'var(--text-strong)',
        }}>{title}</div>
        {sub && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', marginTop: 3 }}>{sub}</div>}
      </div>
      {right && <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 7 }}>{right}</div>}
    </div>
  );
}

export function MenuSeparator({ style }) {
  return <div style={{ height: 1, background: 'var(--rule-section)', margin: '6px 4px', ...style }} />;
}
