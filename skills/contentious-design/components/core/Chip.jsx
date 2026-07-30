import React from 'react';

const TONES = {
  neutral: ['--chip-neutral-bg', '--chip-neutral-fg'],
  info:    ['--chip-info-bg', '--chip-info-fg'],
  good:    ['--chip-good-bg', '--chip-good-fg'],
  warn:    ['--chip-warn-bg', '--chip-warn-fg'],
  bad:     ['--chip-bad-bg', '--chip-bad-fg'],
  promo:   ['--chip-promo-bg', '--chip-promo-fg'],
};

export function Chip({ tone = 'neutral', live = false, bare = false, children, style }) {
  const [bg, fg] = TONES[tone] || TONES.neutral;
  const DOTS = { neutral: '--gloaming-400', info: '--wave-500', good: '--sapling-500', warn: '--sunshine-500', bad: '--fire-500' };
  if (bare) {
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontFamily: 'var(--font-mono)', fontSize: 'var(--chip-font-size)',
        letterSpacing: 'var(--chip-tracking)', textTransform: 'uppercase',
        lineHeight: 1, whiteSpace: 'nowrap', color: 'var(--text-muted)', ...style,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', flex: 'none', background: 'var(' + (DOTS[tone] || DOTS.neutral) + ')' }} />
        {children}
      </span>
    );
  }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontFamily: 'var(--font-mono)', fontSize: 'var(--chip-font-size)',
      letterSpacing: 'var(--chip-tracking)', textTransform: 'uppercase',
      lineHeight: 1, padding: 'var(--chip-padding)',
      borderRadius: 'var(--chip-radius)', whiteSpace: 'nowrap',
      verticalAlign: 1, background: `var(${bg})`, color: `var(${fg})`, ...style,
    }}>
      {live && <ChipDot />}
      {children}
    </span>
  );
}

function ChipDot() {
  return (
    <>
      <style>{'@keyframes dsChipPulse{0%,100%{opacity:1}50%{opacity:.35}}'}</style>
      <span style={{
        width: 5, height: 5, borderRadius: '50%', background: 'currentColor',
        flex: 'none', animation: 'dsChipPulse 1.6s ease-in-out infinite',
      }} />
    </>
  );
}
