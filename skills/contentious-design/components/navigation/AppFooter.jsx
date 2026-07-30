import React from 'react';

export function AppFooter({ logo, product = 'Content Health Check', groups = [], description, attribution, legal, style }) {
  return (
    <div className="c-footer" style={style}>
      <div className="c-footer__in">
        <div>
          <div className="c-footer__brand">
            {logo && <img src={logo} alt="" />}{product}
          </div>
          {description && <p>{description}</p>}
          {attribution && <p>{attribution}</p>}
        </div>
        <div className="c-footer__groups">
          {groups.map((g) => (
            <div className="c-footer__group" key={g.label}>
              <div className="c-label">{g.label}</div>
              <div className="c-footer__links">
                {g.links.map((l) => <a key={l.label} href={l.href || '#'}>{l.label}</a>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      {legal && <div className="c-footer__legal">{legal}</div>}
    </div>
  );
}
