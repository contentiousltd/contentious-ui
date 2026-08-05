import React from 'react';

/* The bullet, and the only one. Marker in its own column, text hanging
   indented; fill means done, ring (pending) means not yet. See Bullets.prompt.md. */
export function Bullets({ items = [], timeline = false, spaced = false, className = '', ...rest }) {
  const cls = ['c-bullets', timeline && 'c-bullets--timeline', spaced && 'c-bullets--spaced', className]
    .filter(Boolean).join(' ');
  return (
    <ul className={cls} {...rest}>
      {items.map((item, i) => {
        const entry = item && typeof item === 'object' && 'content' in item ? item : { content: item };
        return (
          <li key={i} className={'c-bullets__item' + (entry.pending ? ' is-pending' : '')}>
            <span className="c-bullets__marker" aria-hidden="true" />
            <span>{entry.content}</span>
          </li>
        );
      })}
    </ul>
  );
}
