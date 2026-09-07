import React from 'react';

/* An editorial pull quote on a reversed band. ONE PER PAGE. The section must
   carry data-surface="inverse". See PullQuote.prompt.md. */
export function PullQuote({ quote, children, coda, className = '', ...rest }) {
  return (
    <div className={['c-pullquote', className].filter(Boolean).join(' ')} {...rest}>
      <figure className="c-pullquote__quote">
        <blockquote className="c-pullquote__text">{quote}</blockquote>
      </figure>
      <div className="c-pullquote__body">
        {children}
        {coda && <p className="c-pullquote__coda">{coda}</p>}
      </div>
    </div>
  );
}
