import React, { useState } from 'react';

export function Tooltip({ content, width = 212, delay = 500, children, style }) {
  const [open, setOpen] = useState(false);
  const trans = 'opacity var(--transition-fast) ' + (open ? delay : 0) + 'ms';
  return (
    <span style={{ position: 'relative', display: 'inline-flex', ...style }}
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {children}
      <span style={{
        position: 'absolute', top: 'calc(100% + 8px)', left: 0, width,
        background: 'var(--surface-inverse)', color: 'var(--text-inverse)',
        fontSize: 12.5, lineHeight: 1.45, padding: '8px 11px',
        borderRadius: 'var(--radius-control)', boxShadow: 'var(--shadow-md)',
        opacity: open ? 1 : 0, pointerEvents: 'none', zIndex: 9, transition: trans,
      }}>
        <span style={{
          position: 'absolute', top: -4, left: 16, width: 9, height: 9,
          background: 'var(--surface-inverse)', transform: 'rotate(45deg)',
        }} />
        {content}
      </span>
    </span>
  );
}
