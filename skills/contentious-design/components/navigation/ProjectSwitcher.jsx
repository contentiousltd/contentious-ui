import React from 'react';
import { Menu, MenuHeader, MenuLabel, MenuItem, MenuSeparator } from './Menu.jsx';
import { Chip } from '../core/Chip.jsx';

function Chevron() {
  return (
    <svg width="10" height="6" viewBox="0 0 11 7" fill="none" style={{ flex: 'none', color: 'var(--text-muted)' }}>
      <path d="M1 1l4.5 4.5L10 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function ProjectSwitcherTrigger({ project, open, onClick, style }) {
  return (
    <span onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 11px',
      borderRadius: 'var(--radius-control)', fontFamily: 'var(--font-heading)',
      fontSize: 15, color: 'var(--text-strong)', cursor: 'pointer', whiteSpace: 'nowrap',
      background: open ? 'var(--surface-raised)' : 'transparent', ...style,
    }}>{project}<Chevron /></span>
  );
}

export function ProjectSwitcherMenu({ project, groups = [], searchable, actions = [], width = 284, style }) {
  return (
    <Menu width={width} style={style}>
      <MenuHeader label="Project" value={project} />
      {searchable && (
        <input placeholder="Search projects…" style={{
          margin: '0 4px 4px', padding: '8px 11px', borderRadius: 5,
          border: '1px solid var(--rule-field)', background: 'var(--limestone-250)',
          fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)',
          width: 'calc(100% - 8px)',
        }} />
      )}
      {groups.length > 0 && <MenuLabel>Switch to</MenuLabel>}
      {groups.map((g, gi) => (
        <React.Fragment key={gi}>
          {g.client && (
            <MenuLabel>{g.client}{g.count ? ' · ' + g.count + ' projects' : ''}</MenuLabel>
          )}
          {g.projects.map((p) => (
            <MenuItem key={p.name} title={p.name} sub={p.sub}
              tone={p.current ? 'self' : 'default'}
              right={p.current ? <Chip>You&rsquo;re here</Chip> : p.chip} />
          ))}
          {gi < groups.length - 1 && <MenuSeparator style={{ margin: '9px 4px 3px' }} />}
        </React.Fragment>
      ))}
      {actions.length > 0 && <MenuSeparator />}
      {actions.map((a) => <MenuItem key={a} title={a} />)}
    </Menu>
  );
}
