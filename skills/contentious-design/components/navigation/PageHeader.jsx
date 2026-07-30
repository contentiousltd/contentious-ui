import React from 'react';

/* Illustration set, keyed by section. These four are the product's strongest
   brand moment and are what make four structurally identical list pages
   instantly distinguishable. */
export const SECTION_ILLUSTRATIONS = {
  estate: 'images/estate.png',
  inventory: 'images/inventory.png',
  watchlist: 'images/catalogue.png',
  results: 'images/analysis.png',
};

export function PageHeader({ title, lede, illustration, section, breadcrumb, actions, base = '', style }) {
  const src = illustration || (section ? base + SECTION_ILLUSTRATIONS[section] : null);
  return (
    <>
      {breadcrumb}
      <div className="c-page-header" style={style}>
        <div className="c-page-header__text">
          <h1>{title}</h1>
          {lede && <p>{lede}</p>}
          {actions && <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>{actions}</div>}
        </div>
        {src && <div className="c-page-header__illo"><img src={src} alt="" /></div>}
      </div>
    </>
  );
}

export function Breadcrumb({ trail = [], style }) {
  return (
    <div className="c-crumbs" style={style}>
      {trail.map((t, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="sep">›</span>}
          {i === trail.length - 1
            ? <span className="here">{t.label}</span>
            : <a href={t.href || '#'}>{t.label}</a>}
        </React.Fragment>
      ))}
    </div>
  );
}
