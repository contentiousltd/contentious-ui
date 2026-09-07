import React from 'react';
import { Eyebrow } from './Eyebrow.jsx';

/* Numbered process steps in a grid. ITS OWN COMPONENT, not a Bullets timeline
   variant. The number is a CSS counter. See Steps.prompt.md. */
export function Steps({ steps = [], className = '', ...rest }) {
  return (
    <ol className={['c-steps', className].filter(Boolean).join(' ')} {...rest}>
      {steps.map((step, i) => (
        <li key={i} className="c-steps__step">
          {/* NO NUMBER IN THE MARKUP. counter-increment fills it, so it cannot
              drift from the order of the list. */}
          <span className="c-steps__n" aria-hidden="true" />
          <div>
            {step.eyebrow && <Eyebrow>{step.eyebrow}</Eyebrow>}
            <h3 className="c-steps__title">{step.title}</h3>
          </div>
          {step.detail && <p className="c-steps__detail">{step.detail}</p>}
        </li>
      ))}
    </ol>
  );
}
