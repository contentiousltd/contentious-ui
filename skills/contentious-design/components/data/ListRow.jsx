import React from 'react';

export function ListRow({ columns = '1fr', cells = [], actions, first, onClick, style }) {
  return (
    <div onClick={onClick} style={{
      display: 'grid', gridTemplateColumns: columns, alignItems: 'center', gap: 20,
      padding: '16px 22px', cursor: onClick ? 'pointer' : 'default',
      borderTop: first ? 'none' : '1px solid var(--rule-row)',
      transition: 'background var(--transition-fast)', ...style,
    }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--limestone-450)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
      {cells.map((c, i) => <div key={i} style={{ minWidth: 0 }}>{c}</div>)}
      {actions && <div className="ds-row-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>{actions}</div>}
    </div>
  );
}

export function ListTable({ columns, headers = [], children, style }) {
  return (
    <div style={style}>
      {headers.length > 0 && (
        <div style={{
          display: 'grid', gridTemplateColumns: columns, alignItems: 'end', gap: 20,
          padding: '0 22px 9px', borderBottom: '1px solid var(--rule-field)',
        }}>
          {headers.map((h, i) => (
            <div key={i} style={{
              fontFamily: 'var(--font-mono)', fontSize: 'var(--label-font-size)',
              letterSpacing: 'var(--label-tracking)', textTransform: 'uppercase',
              color: 'var(--label-color)',
            }}>{h}</div>
          ))}
        </div>
      )}
      <div style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-surface)', overflow: 'hidden', marginTop: 12 }}>
        {children}
      </div>
    </div>
  );
}
