import React from 'react';

export function SectionHeader({ title, note, action, onAction, style }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', gap: 14,
      paddingBottom: 11, borderBottom: '1px solid var(--rule-section)',
      marginBottom: 18, ...style,
    }}>
      <h2 style={{ font: 'var(--type-section)', color: 'var(--text-strong)', margin: 0, whiteSpace: 'nowrap' }}>{title}</h2>
      {note && <p style={{ margin: 0, fontSize: 14, color: 'var(--text-muted)' }}>{note}</p>}
      {action && (
        <span onClick={onAction} style={{
          marginLeft: 'auto', fontFamily: 'var(--font-heading)', fontSize: 13,
          color: 'var(--accent-link)', whiteSpace: 'nowrap', cursor: 'pointer',
        }}>{action}</span>
      )}
    </div>
  );
}
