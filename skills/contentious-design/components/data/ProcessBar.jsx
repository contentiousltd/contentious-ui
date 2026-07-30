import React from 'react';

const STATE = { waiting: '', active: '', done: 'c-process__row--done', failed: 'c-process__row--failed' };

export function ProcessBar({ stages = [], total, style }) {
  const max = total || Math.max(...stages.map((s) => s.count), 1);
  return (
    <div className="c-process" style={style}>
      {stages.map((s) => (
        <div key={s.label} className={'c-process__row ' + (STATE[s.state] || '')}>
          <span className="c-process__label">{s.label}</span>
          <span className="c-process__track"><i style={{ width: (s.count / max) * 100 + '%' }} /></span>
          <span className="c-process__count">{s.count}/{max}</span>
        </div>
      ))}
    </div>
  );
}
