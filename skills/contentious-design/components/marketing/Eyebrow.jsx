import React from 'react';

/* The marketing eyebrow: Bely, uppercase, in the accent's LINK stop. Bely and
   not mono because it labels PROSE, where .c-label labels data. Replaces
   four identical classes the Maturity Tool site carried under four names.
   See Eyebrow.prompt.md. */
export function Eyebrow({ as: Tag = 'p', children, className = '', ...rest }) {
  return (
    <Tag className={['c-eyebrow', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </Tag>
  );
}

/* A domain name, filename or URL in running prose. NOT code: metadata voice,
   no fill, no radius, no tint. Courier stays reserved for actual code. */
export function Literal({ children, className = '', ...rest }) {
  return (
    <span className={['c-literal', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </span>
  );
}
