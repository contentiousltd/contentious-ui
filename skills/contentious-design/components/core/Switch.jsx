import React, { useId } from 'react';

export function Switch({ checked, onChange, label, stateWord, disabled, style }) {
  const id = useId();
  return (
    <label htmlFor={id} style={{
      display: 'inline-flex', alignItems: 'center', gap: 12,
      cursor: disabled ? 'not-allowed' : 'pointer', userSelect: 'none',
      opacity: disabled ? 0.55 : 1, ...style,
    }}>
      <input id={id} type="checkbox" checked={!!checked} disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.checked)}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{
        position: 'relative', width: 46, height: 26, borderRadius: 13, flex: 'none',
        background: checked ? 'var(--switch-track-on)' : 'var(--switch-track-off)',
        boxShadow: checked ? 'none' : 'var(--switch-inset)',
        transition: 'background var(--transition-fast)',
      }}>
        <span style={{
          position: 'absolute', top: 3, left: checked ? 23 : 3, width: 20, height: 20,
          borderRadius: '50%', background: 'var(--switch-knob)',
          boxShadow: 'var(--switch-knob-shadow)', transition: 'left var(--transition-fast)',
        }} />
      </span>
      {label && (
        <span style={{
          fontFamily: 'var(--font-heading)', fontSize: 15,
          color: checked ? 'var(--text-secondary)' : 'var(--text-muted)',
          transition: 'color var(--transition-fast)',
        }}>
          {label}{stateWord ? ' ' : ''}
          {stateWord && <span style={{ color: 'var(--text-strong)' }}>{stateWord}</span>}
        </span>
      )}
    </label>
  );
}
