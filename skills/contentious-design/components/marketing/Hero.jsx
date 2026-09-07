import React from 'react';
import { Eyebrow } from './Eyebrow.jsx';

/* The front-door hero: eyebrow, title, intro, one pair of actions, and an
   illustration. Measures come from tokens. See Hero.prompt.md. */
export function Hero({ eyebrow, title, intro, actions, art, className = '', ...rest }) {
  return (
    <div className={['c-hero', className].filter(Boolean).join(' ')} {...rest}>
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        {/* NO manual line breaks in the title. --measure-title constrains it and
            text-wrap: balance does the rest; a <br> or a span fixes the break
            at one viewport for a heading that is already measured. */}
        <h1 className="c-hero__title">{title}</h1>
        {intro && <p className="c-hero__intro">{intro}</p>}
        {actions && <div className="c-hero__cta">{actions}</div>}
      </div>
      {art && <div className="c-hero__art">{art}</div>}
    </div>
  );
}
