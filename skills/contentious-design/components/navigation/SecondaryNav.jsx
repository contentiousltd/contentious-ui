import React from 'react';

export function SecondaryNav({ realm, tabs = [], active, onSelect, exitLabel, onExit, style }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'stretch', gap: 18, padding: '0 28px',
      background: 'var(--surface-chrome)', borderBottom: '1px solid var(--rule-field)', ...style,
    }}>
      {realm && (
        <span style={{
          display: 'flex', alignItems: 'center', paddingRight: 24, marginRight: 2,
          borderRight: '1px solid var(--rule-section)', fontFamily: 'var(--font-mono)',
          fontSize: 'var(--label-font-size)', letterSpacing: 'var(--label-tracking)',
          textTransform: 'uppercase', color: 'var(--text-muted)', whiteSpace: 'nowrap',
        }}>{realm}</span>
      )}
      {tabs.map((t) => {
        const name = typeof t === 'string' ? t : t.label;
        const danger = typeof t === 'object' && t.danger;
        const on = name === active;
        return (
          <span key={name} onClick={() => onSelect && onSelect(name)} style={{
            display: 'flex', alignItems: 'center', font: 'var(--type-ui)',
            color: on ? 'var(--text-strong)' : danger ? 'var(--fire-600)' : 'var(--text-muted)',
            padding: '14px 2px',
            borderBottom: '2px solid ' + (on ? 'var(--accent-marker)' : 'transparent'),
            marginBottom: -1, whiteSpace: 'nowrap', flex: 'none', cursor: 'pointer',
          }}>{name}</span>
        );
      })}
      {exitLabel && (
        <span onClick={onExit} style={{
          marginLeft: 'auto', paddingLeft: 18, display: 'flex', alignItems: 'center',
          fontFamily: 'var(--font-heading)', fontSize: 13, color: 'var(--label-color)',
          whiteSpace: 'nowrap', cursor: 'pointer',
        }}>{exitLabel}</span>
      )}
    </div>
  );
}
