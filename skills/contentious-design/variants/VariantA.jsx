// Variant A – Editorial refresh.
// Keeps the original tab structure but: stronger hierarchy, current-project
// hero card with health stats, denser & more useful project table with
// search, sparkline, owner avatars, and inline status.

function VariantA({ accent }) {
  const [tab, setTab] = React.useState('Projects');
  const [active, setActive] = React.useState('Sands');
  const [query, setQuery] = React.useState('');

  const current = PROJECTS.find(p => p.name === active) || PROJECTS[0];
  const filtered = PROJECTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div style={{ background:'var(--limestone)', minHeight:'100%', fontFamily:'var(--font-body)', color:'var(--gloaming)', fontSize:15 }}>
      <TopBar accent={accent}/>

      <div style={{ maxWidth:1080, margin:'0 auto', padding:'48px 40px 80px' }}>
        {/* Page header */}
        <div style={{ marginBottom:36 }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)', marginBottom:10 }}>Settings</div>
          <h1 style={{ fontFamily:'var(--font-heading-display)', fontSize:64, fontWeight:400, color:'var(--gloaming-dark)', margin:'0 0 8px', lineHeight:1.05 }}>Project settings</h1>
          <p style={{ maxWidth:'56ch', fontSize:17, color:'var(--gloaming)', lineHeight:1.55, margin:0 }}>
            Configure how content is analysed and managed for your organisation. Switch project, edit metadata, or set up a new audit.
          </p>
        </div>

        {/* Tabs – minimal underline, not full-width chips */}
        <div style={{ display:'flex', gap:32, borderBottom:'1px solid var(--limestone-extra-dark)', marginBottom:36 }}>
          {['Projects','Content','Structures'].map(t => (
            <button key={t} onClick={()=>setTab(t)} style={{
              background:'none', border:'none', cursor:'pointer',
              padding:'10px 0', fontFamily:'var(--font-heading)', fontSize:17,
              color: tab===t ? 'var(--gloaming-dark)' : 'var(--gloaming-pale)',
              borderBottom: tab===t ? `3px solid ${accent}` : '3px solid transparent',
              marginBottom:-1, transition:'all 180ms ease',
            }}>{t}</button>
          ))}
        </div>

        {/* Current project – hero card with stats */}
        <div style={{
          background:'var(--limestone-pale)', borderRadius:12, padding:'32px 32px',
          marginBottom:24, display:'grid', gridTemplateColumns:'1.3fr 1fr', gap:40, alignItems:'center',
        }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)' }}>Current project</span>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--sapling-extra-dark)' }}/>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--sapling-extra-dark)', textTransform:'uppercase', letterSpacing:'.08em' }}>Active</span>
            </div>
            <h2 style={{ fontFamily:'var(--font-heading-display)', fontSize:42, fontWeight:400, color:'var(--gloaming-dark)', margin:'0 0 6px' }}>{current.name}</h2>
            <p style={{ margin:'0 0 18px', color:'var(--gloaming-pale)', fontSize:14 }}>{current.desc} · {current.industry}</p>
            <div style={{ position:'relative', display:'inline-block' }}>
              <select value={active} onChange={e=>setActive(e.target.value)} style={{
                appearance:'none', padding:'10px 38px 10px 14px', fontFamily:'var(--font-body)', fontSize:15,
                background:'var(--limestone)', border:'1.5px solid var(--limestone-extra-dark)', borderRadius:4,
                color:'var(--gloaming-dark)', cursor:'pointer', minWidth:240,
              }}>
                {PROJECTS.map(p => <option key={p.name}>{p.name}</option>)}
              </select>
              <span style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', pointerEvents:'none', color:'var(--gloaming)' }}>{I.caret()}</span>
            </div>
            <span style={{ marginLeft:14, fontFamily:'var(--font-heading)', fontSize:14, color:'var(--gloaming-pale)' }}>Switch to change all dashboards & reports.</span>
          </div>
          {/* Mini-stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:0, borderLeft:'1px solid var(--limestone-extra-dark)' }}>
            {[
              { lbl:'Health',     val: current.health, after:<span style={{ marginLeft:6, fontSize:14, color:'var(--sapling-extra-dark)' }}>+4</span> },
              { lbl:'Pages',      val: current.pages.toLocaleString() },
              { lbl:'Last audit', val: current.lastAudit, small:true },
            ].map((s,i) => (
              <div key={i} style={{ padding:'4px 20px', borderRight: i<2 ? '1px solid var(--limestone-extra-dark)' : 'none' }}>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)', marginBottom:6 }}>{s.lbl}</div>
                <div style={{ fontFamily:'var(--font-heading-display)', fontSize: s.small?20:36, fontWeight:400, color:'var(--gloaming-dark)', lineHeight:1.05 }}>{s.val}{s.after}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Project list */}
        <div style={{ background:'var(--limestone-pale)', borderRadius:12, padding:'28px 32px 8px' }}>
          <SectionHead
            kicker="All projects"
            title="Project management"
            sub="Create, edit and manage your content audit projects."
            action={
              <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, background:'var(--limestone)', border:'1.5px solid var(--limestone-extra-dark)', borderRadius:4, padding:'8px 12px' }}>
                  {I.search()}<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects" style={{ border:'none', outline:'none', background:'transparent', fontFamily:'var(--font-body)', fontSize:14, width:160, color:'var(--gloaming-dark)' }}/>
                </div>
                <Button accent={accent} icon={I.plus({width:14,height:14})}>Create project</Button>
              </div>
            }
          />
          <table style={{ width:'100%', borderCollapse:'collapse', marginTop:12 }}>
            <thead>
              <tr>
                {['Project','Industry','Health','Pages','Last audit','Members',''].map(h => (
                  <th key={h} style={{ textAlign:'left', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)', padding:'10px 12px', borderBottom:'1px solid var(--limestone-extra-dark)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.name} style={{ borderBottom:'1px solid var(--limestone)' }}>
                  <td style={{ padding:'16px 12px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <span style={{ fontFamily:'var(--font-heading)', fontSize:16, color:'var(--gloaming-dark)' }}>{p.name}</span>
                      {p.name===active && <span style={{ fontFamily:'var(--font-mono)', fontSize:9, padding:'2px 7px', borderRadius:3, background:accent, color:'var(--limestone)', letterSpacing:'.08em', textTransform:'uppercase' }}>Active</span>}
                    </div>
                    <div style={{ fontSize:13, color:'var(--gloaming-pale)', marginTop:2 }}>{p.desc}</div>
                  </td>
                  <td style={{ padding:'16px 12px', fontSize:14, color:'var(--gloaming)' }}>{p.industry}</td>
                  <td style={{ padding:'16px 12px' }}><HealthDot score={p.health} accent={accent}/></td>
                  <td style={{ padding:'16px 12px', fontFamily:'var(--font-mono)', fontSize:13, color:'var(--gloaming-dark)' }}>{p.pages.toLocaleString()}</td>
                  <td style={{ padding:'16px 12px', fontSize:13, color:'var(--gloaming-pale)' }}>{p.lastAudit}</td>
                  <td style={{ padding:'16px 12px' }}>
                    <div style={{ display:'flex' }}>
                      {Array.from({length: Math.min(p.members,3)}).map((_,i) => (
                        <div key={i} style={{ width:24, height:24, borderRadius:'50%', background:`var(--${['coffee','wave','sapling','sorbet'][i%4]}-300)`, border:'2px solid var(--limestone-pale)', marginLeft: i?-8:0, fontFamily:'var(--font-heading)', fontSize:10, display:'grid', placeItems:'center', color:'var(--gloaming-dark)' }}>{['MR','JS','AK','TT'][i]}</div>
                      ))}
                      {p.members>3 && <div style={{ marginLeft:-8, width:24, height:24, borderRadius:'50%', background:'var(--limestone)', border:'2px solid var(--limestone-pale)', fontFamily:'var(--font-mono)', fontSize:10, display:'grid', placeItems:'center', color:'var(--gloaming-dark)' }}>+{p.members-3}</div>}
                    </div>
                  </td>
                  <td style={{ padding:'16px 12px', textAlign:'right', color:'var(--gloaming-pale)' }}>
                    <div style={{ display:'inline-flex', gap:14 }}>
                      <span style={{ cursor:'pointer' }}>{I.view()}</span>
                      <span style={{ cursor:'pointer' }}>{I.edit()}</span>
                      <span style={{ cursor:'pointer' }}>{I.dots()}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

window.VariantA = VariantA;
