// Variant B – Settings sidebar with sub-nav.
// Replaces tabs with a left settings sidebar; project section gets its
// own focused panel with a featured "current project" tile + compact list.

function VariantB({ accent }) {
  const [section, setSection] = React.useState('Projects');
  const [active, setActive] = React.useState('Sands');
  const current = PROJECTS.find(p => p.name === active) || PROJECTS[0];

  const NAV = [
    { group:'Workspace', items:[
      { name:'Projects', icon:I.folder, count: PROJECTS.length },
      { name:'Content',  icon:I.doc },
      { name:'Structures', icon:I.layers },
    ]},
    { group:'Account', items:[
      { name:'Members', icon:I.users },
      { name:'Notifications', icon:I.bell },
      { name:'Integrations', icon:I.plug },
    ]},
    { group:'', items:[
      { name:'Danger zone', icon:I.warn, danger:true },
    ]},
  ];

  return (
    <div style={{ background:'var(--limestone)', minHeight:'100%', fontFamily:'var(--font-body)', color:'var(--gloaming)', fontSize:15 }}>
      <TopBar accent={accent}/>
      <div style={{ display:'grid', gridTemplateColumns:'260px 1fr', minHeight:'calc(100% - 60px)' }}>
        {/* Left settings sub-nav */}
        <aside style={{ borderRight:'1px solid var(--limestone-extra-dark)', padding:'40px 20px', background:'var(--limestone-pale)' }}>
          <div style={{ padding:'0 12px 20px' }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)', marginBottom:6 }}>Settings</div>
            <div style={{ fontFamily:'var(--font-heading-display)', fontSize:26, color:'var(--gloaming-dark)', lineHeight:1.1 }}>Configure</div>
          </div>
          {NAV.map((g,gi) => (
            <div key={gi} style={{ marginTop: g.group? 22:14 }}>
              {g.group && <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)', padding:'0 12px 8px' }}>{g.group}</div>}
              {g.items.map(it => {
                const isActive = it.name === section;
                return (
                  <button key={it.name} onClick={()=>setSection(it.name)} style={{
                    width:'100%', textAlign:'left', display:'flex', alignItems:'center', gap:10,
                    padding:'10px 12px', borderRadius:6, border:'none', cursor:'pointer',
                    background: isActive ? 'var(--gloaming-dark)' : 'transparent',
                    color: isActive ? 'var(--limestone)' : (it.danger ? 'var(--fire-dark)' : 'var(--gloaming)'),
                    fontFamily:'var(--font-heading)', fontSize:15, marginBottom:2,
                  }}>
                    <span style={{ display:'inline-flex' }}>{it.icon()}</span>
                    <span style={{ flex:1 }}>{it.name}</span>
                    {it.count!=null && <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color: isActive?'var(--limestone-dark)':'var(--gloaming-pale)' }}>{it.count}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </aside>

        <main style={{ padding:'48px 56px 80px', maxWidth:980 }}>
          <div style={{ marginBottom:36 }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)', marginBottom:8 }}>Settings · Workspace</div>
            <h1 style={{ fontFamily:'var(--font-heading-display)', fontSize:52, fontWeight:400, color:'var(--gloaming-dark)', margin:'0 0 6px', lineHeight:1.05 }}>Projects</h1>
            <p style={{ maxWidth:'56ch', fontSize:16, color:'var(--gloaming)', margin:0 }}>The projects in your workspace. The active one drives every analysis, dashboard and report.</p>
          </div>

          {/* Featured current-project card */}
          <div style={{ borderRadius:12, background:`linear-gradient(135deg, ${accent}18, var(--limestone-pale))`, border:`1px solid ${accent}30`, padding:'28px 32px', marginBottom:32 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:24 }}>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
                  <span style={{ width:8, height:8, borderRadius:'50%', background:accent }}/>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-dark)' }}>Active project</span>
                </div>
                <h2 style={{ fontFamily:'var(--font-heading-display)', fontSize:38, fontWeight:400, color:'var(--gloaming-dark)', margin:'0 0 4px' }}>{current.name}</h2>
                <p style={{ margin:'0 0 18px', color:'var(--gloaming)', fontSize:15 }}>{current.desc}</p>
                <div style={{ display:'flex', gap:24, fontFamily:'var(--font-mono)', fontSize:12, color:'var(--gloaming-pale)' }}>
                  <span><b style={{ color:'var(--gloaming-dark)', fontFamily:'var(--font-heading)', fontSize:14, marginRight:6 }}>{current.health}</b>HEALTH</span>
                  <span><b style={{ color:'var(--gloaming-dark)', fontFamily:'var(--font-heading)', fontSize:14, marginRight:6 }}>{current.pages.toLocaleString()}</b>PAGES</span>
                  <span><b style={{ color:'var(--gloaming-dark)', fontFamily:'var(--font-heading)', fontSize:14, marginRight:6 }}>{current.members}</b>MEMBERS</span>
                  <span style={{ color:'var(--gloaming)' }}>Last audit {current.lastAudit}</span>
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:8, alignItems:'flex-end' }}>
                <Button accent={accent} kind="secondary">Open dashboard</Button>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--gloaming-pale)' }}>Switch below to change</span>
              </div>
            </div>
          </div>

          {/* All projects, compact */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:14 }}>
            <h3 style={{ fontFamily:'var(--font-heading)', fontSize:20, fontWeight:400, color:'var(--gloaming-dark)', margin:0 }}>All projects</h3>
            <Button accent={accent} icon={I.plus({width:14,height:14})}>Create project</Button>
          </div>
          <div style={{ background:'var(--limestone-pale)', borderRadius:12, overflow:'hidden' }}>
            {PROJECTS.map((p,i) => {
              const isActive = p.name === active;
              return (
                <div key={p.name} style={{
                  display:'grid', gridTemplateColumns:'24px 1.6fr 1fr 80px 100px auto',
                  gap:16, alignItems:'center', padding:'16px 20px',
                  borderTop: i ? '1px solid var(--limestone)' : 'none',
                  background: isActive ? `${accent}10` : 'transparent',
                }}>
                  <button onClick={()=>setActive(p.name)} style={{
                    width:18, height:18, borderRadius:'50%', cursor:'pointer',
                    border:`1.5px solid ${isActive ? accent : 'var(--limestone-extra-dark)'}`,
                    background:'var(--limestone)', display:'grid', placeItems:'center', padding:0,
                  }}>{isActive && <span style={{ width:8, height:8, borderRadius:'50%', background:accent }}/>}</button>
                  <div>
                    <div style={{ fontFamily:'var(--font-heading)', fontSize:16, color:'var(--gloaming-dark)' }}>{p.name}</div>
                    <div style={{ fontSize:13, color:'var(--gloaming-pale)' }}>{p.desc}</div>
                  </div>
                  <div style={{ fontSize:13, color:'var(--gloaming)' }}>{p.industry}</div>
                  <HealthDot score={p.health} accent={accent}/>
                  <span style={{ color: accent }}><Spark data={p.trend} color="currentColor"/></span>
                  <div style={{ display:'inline-flex', gap:14, color:'var(--gloaming-pale)' }}>
                    <span style={{ cursor:'pointer' }}>{I.share()}</span>
                    <span style={{ cursor:'pointer' }}>{I.edit()}</span>
                    <span style={{ cursor:'pointer' }}>{I.trash()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

window.VariantB = VariantB;
