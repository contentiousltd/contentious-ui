import React, { useId } from 'react';

const shell = {
  width: '100%', padding: '11px 13px', borderRadius: 'var(--radius-control)',
  border: '1px solid var(--rule-field)', background: 'var(--surface-field)',
  fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-strong)',
};

export function Field({ label, hint, as = 'input', children, style, ...rest }) {
  const id = useId();
  const El = as === 'textarea' ? 'textarea' : as === 'select' ? 'select' : 'input';
  return (
    <div style={style}>
      {label && (
        <label htmlFor={id} style={{
          display: 'block', fontFamily: 'var(--font-heading)', fontSize: 14,
          color: 'var(--text-body)', marginBottom: 7,
        }}>{label}</label>
      )}
      <El id={id} {...rest} style={{
        ...shell,
        ...(as === 'textarea' ? { minHeight: 84, resize: 'vertical' } : null),
        ...(as === 'select' ? { appearance: 'none', paddingRight: 30, background: 'var(--surface-card)' } : null),
      }}>{children}</El>
      {hint && (
        <p style={{ margin: '9px 0 0', fontSize: 13, color: 'var(--text-muted)' }}>{hint}</p>
      )}
    </div>
  );
}
