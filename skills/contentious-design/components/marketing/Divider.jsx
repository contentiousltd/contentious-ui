import React from 'react';

/* A section divider. --taper fades to transparent at both edges, so it is
   strongest mid-screen and absent at the gutters. See Divider.prompt.md. */
export function Divider({ taper = false, className = '', ...rest }) {
  const cls = ['c-divider', taper && 'c-divider--taper', className].filter(Boolean).join(' ');
  return <hr className={cls} {...rest} />;
}
