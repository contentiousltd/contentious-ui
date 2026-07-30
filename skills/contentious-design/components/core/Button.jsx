import React from 'react';

export function Button({ variant = 'primary', size = 'md', disabled, children, onClick, style, type = 'button' }) {
  const pad = size === 'sm' ? '6px 11px' : size === 'lg' ? '11px 20px' : '8px 14px';
  const fs = size === 'sm' ? 13 : size === 'lg' ? 15 : 14;
  const base = {
    fontFamily: 'var(--font-heading)', fontSize: fs, lineHeight: 1.2,
    padding: pad, borderRadius: 'var(--radius-control)', cursor: 'pointer',
    whiteSpace: 'nowrap', border: 0, transition: 'background var(--transition-fast), color var(--transition-fast)',
  };
  const variants = {
    primary: { background: 'var(--accent)', color: 'var(--text-on-accent)' },
    ghost:   { background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--rule-field)' },
    quiet:   { background: 'var(--limestone-500)', color: 'var(--text-secondary)', border: '1px solid var(--rule-section)' },
    danger:  { background: 'transparent', color: 'var(--fire-650)', border: '1px solid var(--fire-300)' },
  };
  const off = disabled ? { background: 'var(--rule-field)', color: 'var(--gloaming-350)', border: 0, cursor: 'not-allowed' } : null;
  return (
    <button type={type} disabled={disabled} onClick={onClick}
      style={{ ...base, ...variants[variant], ...off, ...style }}>
      {children}
    </button>
  );
}
