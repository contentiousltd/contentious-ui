import React from 'react';

/* The mobile equivalent of TopBar. Three weights, in this order: project as
   CONTEXT (not a list), the four work sections, account pinned to the bottom.
   See explorations/Mobile nav.html – the shipped version was a flat list of
   thirteen equal rows whose only marked item was the project you were already in.

   Motion is not optional here: without the slide-in the sheet reads as a page
   the app navigated to rather than a layer over the current one. */
export function MobileNav({
  open = false, project, projects = [], items = [], active, onNavigate,
  projectItems = [], accountItems = [], reference = [], legal = [],
  onClose, onSwitchProject, onSelectProject, onOpenReference,
  panel = null, switching = false, id,
}) {
  const shown = panel || (switching ? 'projects' : null);
  return (
    <div className={`c-msheet__host${open ? ' is-open' : ''}${shown ? ' is-switching' : ''}`} id={id}>
      <div className="c-msheet__scrim" onClick={onClose} />
      <div className="c-msheet">
        <div className="c-msheet__hd">
          <span className="c-msheet__key">Menu</span>
          <button className="c-msheet__x" onClick={onClose} aria-label="Close menu">✕</button>
        </div>
        <div className="c-msheet__body">
          <div className="c-msheet__ctx" style={{ '--i': 0 }} onClick={onSwitchProject}>
            <div>
              <span className="c-msheet__key">Project</span>
              <div className="c-msheet__name">{project}</div>
            </div>
            <span className="c-msheet__car">›</span>
          </div>
          <div className="c-msheet__grp">
            {items.map((it, n) => (
              <div key={it} className={`c-msheet__row${it === active ? ' is-current' : ''}`}
                style={{ '--i': n + 1 }} onClick={() => onNavigate && onNavigate(it)}>{it}</div>
            ))}
            {projectItems.map((it, n) => (
              <div key={it} className="c-msheet__row c-msheet__row--sm" style={{ '--i': items.length + n + 1 }}
                onClick={() => onNavigate && onNavigate(it)}>{it}</div>
            ))}
          </div>
        </div>
        <div className="c-msheet__foot">
          <span className="c-msheet__key">Account</span>
          {accountItems.map((it) => {
            const label = typeof it === 'string' ? it : it.label;
            const quiet = typeof it === 'object' && it.quiet;
            return (
              <div key={label} className={`c-msheet__row c-msheet__row--sm${quiet ? ' c-msheet__row--quiet' : ''}`}
                onClick={() => onNavigate && onNavigate(label)}>{label}</div>
            );
          })}
          {reference.length > 0 && (
            <div className="c-msheet__about">
              <div className="c-msheet__row c-msheet__row--sm c-msheet__row--quiet" onClick={onOpenReference}>
                About Content Health Check<span className="c-msheet__car">›</span>
              </div>
            </div>
          )}
        </div>
        {projects.length > 0 && (
          <div className={`c-msheet__sub${shown === 'projects' ? ' is-open' : ''}`}>
            <div className="c-msheet__hd">
              <button className="c-msheet__x" onClick={onSwitchProject} aria-label="Back to menu">‹</button>
              <span className="c-msheet__key">Switch project</span>
            </div>
            <div className="c-msheet__body">
              {projects.map((p) => (
                <div key={p} className={`c-msheet__row${p === project ? ' is-current' : ''}`}
                  onClick={() => onSelectProject && onSelectProject(p)}>
                  {p}{p === project && <span className="c-msheet__tick">Current</span>}
                </div>
              ))}
            </div>
          </div>
        )}
        {reference.length > 0 && (
          <div className={`c-msheet__sub${shown === 'reference' ? ' is-open' : ''}`}>
            <div className="c-msheet__hd">
              <button className="c-msheet__x" onClick={onOpenReference} aria-label="Back to menu">‹</button>
              <span className="c-msheet__key">About Content Health Check</span>
            </div>
            <div className="c-msheet__body">
              {reference.map((g) => (
                <div key={g.label} className="c-msheet__grp">
                  <span className="c-msheet__key">{g.label}</span>
                  {g.items.map((it) => (
                    <div key={it} className="c-msheet__row c-msheet__row--sm"
                      onClick={() => onNavigate && onNavigate(it)}>{it}</div>
                  ))}
                </div>
              ))}
              {legal.length > 0 && (
                <div className="c-msheet__run">
                  {legal.map((it) => (
                    <span key={it} onClick={() => onNavigate && onNavigate(it)}>{it}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function MobileNavTrigger({ onClick, label = 'Menu' }) {
  return (
    <button className="c-mburger" onClick={onClick} aria-label={label}><i /></button>
  );
}
