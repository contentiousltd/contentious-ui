// Shared chrome + data + icons for the project-settings variants.

const PROJECTS = [
  { name: 'Sands', desc: 'Web content audit', industry: 'Non-profit', current: true,  pages: 412,  health: 84, lastAudit: '2 days ago', members: 4, trend: [62,68,71,75,79,82,84] },
  { name: 'Art Fund', desc: 'Content audit for artfund.org', industry: 'Non-profit', current: false, pages: 1289, health: 71, lastAudit: '1 week ago', members: 3, trend: [55,58,62,64,67,70,71] },
  { name: 'Royal Opera House', desc: 'Programme microsite review', industry: 'Arts',     current: false, pages: 244,  health: 66, lastAudit: '3 weeks ago', members: 2, trend: [70,68,66,67,65,67,66] },
  { name: 'Kew Gardens', desc: 'Horticultural reference content',  industry: 'Charity',   current: false, pages: 906,  health: 79, lastAudit: '4 days ago', members: 5, trend: [72,73,75,76,77,78,79] },
  { name: 'Action Against Hunger', desc: 'Quarterly comms + appeal pages', industry: 'Non-profit', current: false, pages: 4218, health: 58, lastAudit: '6 weeks ago', members: 6, trend: [60,61,59,58,57,58,58] },
];

// Icons – line, 1.5px, currentColor
const I = {
  caret: (p={}) => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9l6 6 6-6"/></svg>,
  plus: (p={}) => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}><path d="M12 5v14M5 12h14"/></svg>,
  search: (p={}) => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}><circle cx="11" cy="11" r="6"/><path d="M16 16l5 5"/></svg>,
  view: (p={}) => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="13" rx="1.5"/><path d="M9 21h6M12 18v3"/></svg>,
  share: (p={}) => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8L15.8 7.2M8.2 13.2l7.6 3.6"/></svg>,
  edit: (p={}) => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 20h4l11-11-4-4L4 16v4z"/><path d="M14 6l4 4"/></svg>,
  trash: (p={}) => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/></svg>,
  check: (p={}) => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12l5 5 9-11"/></svg>,
  dots: (p={}) => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}><circle cx="6" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="18" cy="12" r="1.6"/></svg>,
  folder: (p={}) => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 7a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7z"/></svg>,
  doc: (p={}) => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 4h8l4 4v12H6z"/><path d="M14 4v4h4"/></svg>,
  layers: (p={}) => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5M3 17l9 5 9-5"/></svg>,
  bell: (p={}) => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2H4.5L6 16z"/><path d="M10 21h4"/></svg>,
  users: (p={}) => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="9" cy="9" r="3.5"/><path d="M3 19c0-3 3-5 6-5s6 2 6 5"/><circle cx="17" cy="8" r="2.5"/><path d="M15 14c3 0 6 1.5 6 4"/></svg>,
  plug: (p={}) => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 3v6M15 3v6M7 9h10v3a5 5 0 0 1-10 0V9zM12 17v4"/></svg>,
  warn: (p={}) => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l10 18H2L12 3z"/><path d="M12 10v5M12 18v.01"/></svg>,
  cog: (p={}) => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1A2 2 0 1 1 7 4.9l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>,
};

// Top brand bar – used on every artboard so they read as one product.
function TopBar({ accent }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'14px 32px', borderBottom:'1px solid var(--limestone-extra-dark)',
      background:'var(--limestone)',
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <img src="../images/contentious-monogram.png" alt="" style={{ width:28, height:28 }}/>
        <b style={{ fontFamily:'var(--font-heading-display)', fontSize:22, color:'var(--gloaming-dark)', fontWeight:400 }}>Content Health Check</b>
      </div>
      <div style={{ display:'flex', gap:28, alignItems:'center', fontFamily:'var(--font-heading)', fontSize:15, color:'var(--gloaming)' }}>
        {['Analysis','Results','Framework','About'].map(s => (
          <span key={s} style={{ display:'flex', alignItems:'center', gap:4 }}>{s} {I.caret({width:11,height:11})}</span>
        ))}
        <span style={{ color:'var(--gloaming-dark)', fontWeight:700, display:'flex', alignItems:'center', gap:4, borderBottom:`2px solid ${accent}`, paddingBottom:2 }}>Settings {I.caret({width:11,height:11})}</span>
        <div style={{ width:30, height:30, borderRadius:'50%', background:'var(--limestone-extra-dark)', display:'grid', placeItems:'center', color:'var(--gloaming-dark)', fontSize:13, fontFamily:'var(--font-heading)' }}>AK</div>
      </div>
    </div>
  );
}

// Sparkline (SVG, no deps)
function Spark({ data, w=90, h=22, color='currentColor' }) {
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display:'block' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Health pill – colour by score band
function HealthDot({ score, accent }) {
  const colour = score >= 80 ? 'var(--sapling-extra-dark)'
              : score >= 65 ? 'var(--sunshine-extra-dark)'
              : 'var(--fire-dark)';
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:6, fontFamily:'var(--font-mono)', fontSize:12, color:'var(--gloaming-dark)' }}>
      <span style={{ width:8, height:8, borderRadius:'50%', background:colour }}/>{score}
    </span>
  );
}

// Section heading shared across variants
function SectionHead({ kicker, title, sub, action }) {
  return (
    <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:18 }}>
      <div>
        {kicker && <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)', marginBottom:6 }}>{kicker}</div>}
        <h2 style={{ fontFamily:'var(--font-heading-display)', fontWeight:400, fontSize:28, color:'var(--gloaming-dark)', margin:'0 0 4px' }}>{title}</h2>
        {sub && <p style={{ margin:0, color:'var(--gloaming-pale)', fontSize:14 }}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}

// Buttons
function Button({ children, kind='primary', accent, icon, style={}, ...rest }) {
  const base = {
    fontFamily:'var(--font-heading)', fontSize:15, padding:'10px 18px',
    borderRadius:4, border:'none', cursor:'pointer', display:'inline-flex',
    alignItems:'center', gap:8, transition:'all 180ms ease',
    ...style,
  };
  const variants = {
    primary: { background: accent, color:'var(--limestone)' },
    secondary: { background:'transparent', color:'var(--gloaming-dark)', border:'1.5px solid var(--gloaming-dark)' },
    ghost: { background:'transparent', color:'var(--gloaming-dark)' },
  };
  return <button style={{...base, ...variants[kind]}} {...rest}>{icon}{children}</button>;
}

Object.assign(window, { PROJECTS, I, TopBar, Spark, HealthDot, SectionHead, Button });
