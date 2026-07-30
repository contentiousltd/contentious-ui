import React from 'react';

/* The project cluster – switcher + the four sections it governs – is ONE group,
   immediately after the wordmark. See "Nav hierarchy.html": the sections used to
   sit at the far right, which let a secondary strip steal the switcher by
   proximity. `contextActive={false}` stands the whole cluster down in admin realms. */
export function TopBar({ product = 'Content Health Check', logo, switcher, items = [], active, onNavigate, contextActive = true, avatar, style }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 22, padding: '14px 40px',
      background: 'var(--surface-chrome)', borderBottom: '1px solid var(--rule-field)', ...style,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-heading)',
        fontWeight: 700, fontSize: 20, color: 'var(--text-strong)', whiteSpace: 'nowrap',
      }}>
        {logo && <img src={logo} alt="" style={{ height: 30, display: 'block' }} />}
        {product}
      </div>
      {(switcher || items.length > 0) && <div style={{ width: 1, height: 24, background: 'var(--rule-field)', flex: 'none' }} />}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 26, whiteSpace: 'nowrap',
        opacity: contextActive ? 1 : 0.42, transition: 'opacity var(--transition-base)',
      }}>
        {switcher}
        {items.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 26, fontFamily: 'var(--font-heading)', fontSize: 16 }}>
            {items.map((it) => (
              <span key={it} onClick={() => onNavigate && onNavigate(it)} style={{
                color: it === active && contextActive ? 'var(--text-strong)' : 'var(--text-secondary)',
                cursor: 'pointer',
              }}>{it}</span>
            ))}
          </div>
        )}
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 26 }}>{avatar}</div>
    </div>
  );
}

export function Avatar({ initials = '', size = 34, onClick, style }) {
  return (
    <div onClick={onClick} style={{
      width: size, height: size, borderRadius: '50%', background: 'var(--gloaming-800)',
      display: 'grid', placeItems: 'center', fontFamily: 'var(--font-mono)',
      fontSize: size * 0.32, color: 'var(--limestone-300)', cursor: 'pointer', flex: 'none', ...style,
    }}>{initials}</div>
  );
}
