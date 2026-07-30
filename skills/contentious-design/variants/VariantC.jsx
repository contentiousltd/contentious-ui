// Variant C – Card grid project gallery.
// Each project becomes a generous editorial card with health gauge,
// trend, members, and a giant primary action. Tabs preserved as quiet
// inline pills. Best when projects are few but each one is important.

function VariantC({ accent }) {
  const [active, setActive] = React.useState('Sands');

  // Big radial gauge
  const Gauge = ({ score }) => {
    const r = 26, c = 2 * Math.PI * r;
    const offset = c - (score/100)*c;
    const colour = score >= 80 ? 'var(--sapling-extra-dark)'
                : score >= 65 ? 'var(--sunshine-extra-dark)'
                : 'var(--fire-dark)';
    return (
      <div style={{ position:'relative', width:64, height:64 }}>
        <svg width="64" height="64" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r={r} fill="none" stroke="var(--limestone-extra-dark)" strokeWidth="5"/>
          <circle cx="32" cy="32" r={r} fill="none" stroke={colour} strokeWidth="5"
                  strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset}
                  transform="rotate(-90 32 32)"/>
        </svg>
        <div style={{ position:'absolute', inset:0, display:'grid', placeItems:'center',
          fontFamily:'var(--font-heading-display)', fontSize:18, color:'var(--gloaming-dark)' }}>{score}</div>
      </div>
    );
  };

  return (
    <div style={{ background:'var(--limestone)', minHeight:'100%', fontFamily:'var(--font-body)', color:'var(--gloaming)', fontSize:15 }}>
      <TopBar accent={accent}/>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'48px 40px 80px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:48, alignItems:'flex-end', marginBottom:40 }}>
          <div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)', marginBottom:10 }}>Settings · Projects</div>
            <h1 style={{ fontFamily:'var(--font-heading-display)', fontSize:78, fontWeight:400, color:'var(--gloaming-dark)', margin:'0 0 4px', lineHeight:1 }}>Your projects</h1>
            <p style={{ fontSize:18, color:'var(--gloaming)', maxWidth:'48ch', margin:'12px 0 0' }}>Each project is a separate audit world: its own framework, content inventory, members and dashboards.</p>
          </div>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:14 }}>
            <div style={{ display:'flex', gap:6, background:'var(--limestone-pale)', padding:4, borderRadius:6 }}>
              {['Projects','Content','Structures'].map((t,i) => (
                <span key={t} style={{
                  padding:'6px 14px', fontFamily:'var(--font-heading)', fontSize:14, borderRadius:4,
                  background: i===0 ? 'var(--gloaming-dark)' : 'transparent',
                  color: i===0 ? 'var(--limestone)' : 'var(--gloaming)', cursor:'pointer',
                }}>{t}</span>
              ))}
            </div>
            <Button accent={accent} icon={I.plus({width:14,height:14})}>Create project</Button>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:20 }}>
          {PROJECTS.map(p => {
            const isActive = p.name === active;
            return (
              <div key={p.name} style={{
                background: isActive ? `linear-gradient(160deg, ${accent}1a, var(--limestone-pale))` : 'var(--limestone-pale)',
                border: isActive ? `1.5px solid ${accent}` : '1px solid transparent',
                borderRadius:14, padding:'26px 28px', position:'relative',
              }}>
                {isActive && <span style={{ position:'absolute', top:14, right:14, fontFamily:'var(--font-mono)', fontSize:9, padding:'3px 8px', background:accent, color:'var(--limestone)', borderRadius:3, letterSpacing:'.08em', textTransform:'uppercase' }}>Active</span>}
                <div style={{ display:'flex', gap:18, marginBottom:18 }}>
                  <Gauge score={p.health}/>
                  <div style={{ flex:1, minWidth:0 }}>
                    <h3 style={{ fontFamily:'var(--font-heading-display)', fontSize:28, fontWeight:400, color:'var(--gloaming-dark)', margin:'0 0 4px', lineHeight:1.1 }}>{p.name}</h3>
                    <p style={{ margin:0, color:'var(--gloaming-pale)', fontSize:13 }}>{p.desc}</p>
                  </div>
                </div>

                <div style={{ height:32, marginBottom:16, color: accent }}>
                  <Spark data={p.trend} w={420} h={32} color="currentColor"/>
                </div>

                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid var(--limestone-extra-dark)', paddingTop:16 }}>
                  <div style={{ display:'flex', gap:18, fontFamily:'var(--font-mono)', fontSize:11, color:'var(--gloaming-pale)' }}>
                    <span>{p.industry}</span>
                    <span>· {p.pages.toLocaleString()} pages</span>
                    <span>· {p.lastAudit}</span>
                  </div>
                  <div style={{ display:'flex', gap:8 }}>
                    {!isActive && <button onClick={()=>setActive(p.name)} style={{ background:'transparent', border:'1.5px solid var(--gloaming-dark)', borderRadius:4, padding:'6px 14px', fontFamily:'var(--font-heading)', fontSize:13, color:'var(--gloaming-dark)', cursor:'pointer' }}>Set active</button>}
                    <button style={{ background:'transparent', border:'none', cursor:'pointer', color:'var(--gloaming-pale)', padding:6 }}>{I.dots()}</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

window.VariantC = VariantC;
