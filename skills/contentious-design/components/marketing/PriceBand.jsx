import React from 'react';
import { Eyebrow } from './Eyebrow.jsx';
import { Bullets } from '../core/Bullets.jsx';

/* A row of price bands. One geometry; the GROUND carries the difference.
   See PriceBand.prompt.md. */
export function PriceRow({ children, className = '', ...rest }) {
  return (
    <div className={['c-price-row', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  );
}

export function PriceBand({ eyebrow, title, description, figures = [], features = [], featured = false, className = '', ...rest }) {
  return (
    /* FEATURED IS A GROUND, NOT A MODIFIER CLASS. data-surface="deep" remaps
       --surface-card, so the card changes ground and nothing else. There is
       deliberately no .c-price--featured. */
    <div
      className={['c-price', className].filter(Boolean).join(' ')}
      {...(featured ? { 'data-surface': 'deep' } : null)}
      {...rest}
    >
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h3 className="c-price__title">{title}</h3>
      </div>
      {description && <p className="c-price__description">{description}</p>}
      {figures.length > 0 && (
        <div className="c-price__figures">
          {figures.map((f, i) => (
            <p key={i} className="c-price__figure">
              <span className="c-price__amount">{f.amount}</span>
              <span className="c-price__period">{f.period}</span>
            </p>
          ))}
        </div>
      )}
      {features.length > 0 && <Bullets items={features} />}
    </div>
  );
}
