// Variant D – Single-page editorial scroll.
// No tabs. Long scrolling page with left-rail anchor nav. Puts everything
// a content-auditor might adjust for a workspace in one place, in reading
// order, with generous type and whitespace.

function VariantD({ accent }) {
  const [active, setActive] = React.useState('Sands');
  const current = PROJECTS.find(p => p.name === active) || PROJECTS[0];

  const sections = [
    { id:'current',  label:'Current project' },
    { id:'projects', label:'All projects' },
    { id:'members',  label:'Members' },
    { id:'defaults', label:'Audit defaults' },
    { id:'danger',   label:'Danger zone' },
  ];

  const Toggle = ({ on }) => (
    <div style={{ width:38, height:22, borderRadius:11, background: on?accent:'var(--limestone-extra-dark)', position:'relative', transition:'background 180ms ease' }}>
      <div style={{ position:'absolute', top:2, left: on?18:2, width:18, height:18, borderRadius:'50%', background:'var(--limestone)', transition:'left 180ms ease', boxShadow:'0 1px 2px rgba(0,0,0,.1)' }}/>
    </div>
  );

  return (
    <div style={{ background:'var(--limestone)', minHeight:'100%', fontFamily:'var(--font-body)', color:'var(--gloaming)', fontSize:15 }}>
      <TopBar accent={accent}/>

      {/* Title block – full-bleed editorial */}
      <div style={{ borderBottom:'1px solid var(--limestone-extra-dark)' }}>
        <div style={{ maxWidth:1120, margin:'0 auto', padding:'64px 40px 56px' }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)', marginBottom:14 }}>Settings</div>
          <h1 style={{ fontFamily:'var(--font-heading-display)', fontSize:96, fontWeight:400, color:'var(--gloaming-dark)', margin:'0 0 16px', lineHeight:0.98, letterSpacing:-1 }}>
            Project settings.
          </h1>
          <p style={{ fontSize:19, color:'var(--gloaming)', maxWidth:'50ch', margin:0, lineHeight:1.5 }}>
            One page. Everything about how <i>{current.name}</i> is audited, who can see it, and how new content is handled.
          </p>
        </div>
      </div>

      <div style={{ maxWidth:1120, margin:'0 auto', padding:'48px 40px 120px', display:'grid', gridTemplateColumns:'200px 1fr', gap:64, alignItems:'flex-start' }}>
        {/* Anchor nav */}
        <nav style={{ position:'sticky', top:24, display:'flex', flexDirection:'column', gap:2, paddingTop:4 }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)', marginBottom:10 }}>On this page</div>
          {sections.map((s,i) => (
            <a key={s.id} href={`#${s.id}`} style={{
              fontFamily:'var(--font-heading)', fontSize:14,
              color: i===0 ? 'var(--gloaming-dark)' : 'var(--gloaming-pale)',
              textDecoration:'none', padding:'8px 0',
              borderLeft: i===0 ? `2px solid ${accent}` : '2px solid transparent',
              paddingLeft:12,
            }}>{s.label}</a>
          ))}
        </nav>

        <div style={{ display:'flex', flexDirection:'column', gap:72 }}>
          {/* Current project */}
          <section id="current">
            <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:accent, marginBottom:8 }}>§ 01 – Current project</div>
            <h2 style={{ fontFamily:'var(--font-heading-display)', fontSize:44, fontWeight:400, color:'var(--gloaming-dark)', margin:'0 0 12px', lineHeight:1.05 }}>
              You’re working on <u style={{ textDecorationColor: accent, textDecorationThickness:3, textUnderlineOffset:6 }}>{current.name}</u>.
            </h2>
            <p style={{ fontSize:17, color:'var(--gloaming)', maxWidth:'56ch', margin:'0 0 24px' }}>Change this to switch every dashboard, inventory and report across the app. Everything else on this page follows.</p>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:0, borderTop:'1px solid var(--limestone-extra-dark)', borderBottom:'1px solid var(--limestone-extra-dark)' }}>
              {PROJECTS.slice(0,3).map(p => (
                <button key={p.name} onClick={()=>setActive(p.name)} style={{
                  background: p.name===active ? 'var(--limestone-pale)' : 'transparent',
                  border:'none', borderRight:'1px solid var(--limestone-extra-dark)',
                  padding:'20px 24px', textAlign:'left', cursor:'pointer',
                  display:'flex', flexDirection:'column', gap:6,
                }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ width:10, height:10, borderRadius:'50%', background: p.name===active?accent:'var(--limestone-extra-dark)', border: p.name===active?'none':'1.5px solid var(--gloaming-pale)' }}/>
                    <span style={{ fontFamily:'var(--font-heading)', fontSize:16, color:'var(--gloaming-dark)' }}>{p.name}</span>
                  </div>
                  <span style={{ fontSize:13, color:'var(--gloaming-pale)' }}>{p.desc}</span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--gloaming-pale)', marginTop:4 }}>Health {p.health} · {p.pages.toLocaleString()} pages</span>
                </button>
              ))}
            </div>
            <a href="#projects" style={{ display:'inline-block', marginTop:16, color:'var(--gloaming-dark)', fontFamily:'var(--font-heading)', fontSize:14, textDecoration:'none', borderBottom:`2px solid ${accent}`, paddingBottom:2 }}>See all {PROJECTS.length} projects ↓</a>
          </section>

          {/* All projects list – quiet */}
          <section id="projects">
            <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:accent, marginBottom:8 }}>§ 02 – All projects</div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:24 }}>
              <h2 style={{ fontFamily:'var(--font-heading-display)', fontSize:44, fontWeight:400, color:'var(--gloaming-dark)', margin:0, lineHeight:1.05 }}>Everything you manage.</h2>
              <Button accent={accent} icon={I.plus({width:14,height:14})}>Create project</Button>
            </div>
            <div>
              {PROJECTS.map((p,i) => (
                <div key={p.name} style={{
                  display:'grid', gridTemplateColumns:'1.6fr 1fr auto auto 120px auto',
                  gap:20, alignItems:'center',
                  padding:'22px 0',
                  borderTop: i===0 ? '1px solid var(--gloaming-dark)' : '1px solid var(--limestone-extra-dark)',
                }}>
                  <div>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <span style={{ fontFamily:'var(--font-heading-display)', fontSize:22, color:'var(--gloaming-dark)' }}>{p.name}</span>
                      {p.name===active && <span style={{ fontFamily:'var(--font-mono)', fontSize:9, padding:'2px 7px', borderRadius:3, background:accent, color:'var(--limestone)', letterSpacing:'.08em', textTransform:'uppercase' }}>Current</span>}
                    </div>
                    <div style={{ fontSize:13, color:'var(--gloaming-pale)', marginTop:2 }}>{p.desc}</div>
                  </div>
                  <div style={{ fontSize:13, color:'var(--gloaming)' }}>{p.industry}</div>
                  <HealthDot score={p.health}/>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--gloaming-pale)' }}>{p.pages.toLocaleString()}</span>
                  <span style={{ color:accent }}><Spark data={p.trend} w={110} h={22}/></span>
                  <div style={{ display:'inline-flex', gap:12, color:'var(--gloaming-pale)' }}>
                    <span style={{ cursor:'pointer' }}>{I.edit()}</span>
                    <span style={{ cursor:'pointer' }}>{I.dots()}</span>
                  </div>
                </div>
              ))}
              <div style={{ borderTop:'1px solid var(--limestone-extra-dark)' }}/>
            </div>
          </section>

          {/* Members */}
          <section id="members">
            <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:accent, marginBottom:8 }}>§ 03 – Members</div>
            <h2 style={{ fontFamily:'var(--font-heading-display)', fontSize:44, fontWeight:400, color:'var(--gloaming-dark)', margin:'0 0 24px', lineHeight:1.05 }}>Who sees {current.name}.</h2>
            <div style={{ background:'var(--limestone-pale)', borderRadius:12, padding:'8px 24px' }}>
              {[
                { name:'Maya Roth', role:'Owner', email:'maya@contentious.ltd' },
                { name:'Jun Suzuki', role:'Editor', email:'jun@contentious.ltd' },
                { name:'Ayesha Khan', role:'Editor', email:'ayesha@sands.org' },
                { name:'Tom Tremayne', role:'Viewer', email:'tom@sands.org' },
              ].map((m,i,arr) => (
                <div key={m.email} style={{ display:'flex', alignItems:'center', gap:16, padding:'16px 0', borderBottom: i<arr.length-1 ? '1px solid var(--limestone-extra-dark)' : 'none' }}>
                  <div style={{ width:32, height:32, borderRadius:'50%', background: `var(--${['coffee','wave','sapling','sorbet'][i]}-300)`, display:'grid', placeItems:'center', fontFamily:'var(--font-heading)', fontSize:12, color:'var(--gloaming-dark)' }}>{m.name.split(' ').map(s=>s[0]).join('')}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:'var(--font-heading)', fontSize:15, color:'var(--gloaming-dark)' }}>{m.name}</div>
                    <div style={{ fontSize:13, color:'var(--gloaming-pale)' }}>{m.email}</div>
                  </div>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:11, padding:'4px 10px', background:'var(--limestone)', borderRadius:3, color:'var(--gloaming-dark)', letterSpacing:'.05em' }}>{m.role}</span>
                  <span style={{ color:'var(--gloaming-pale)', cursor:'pointer' }}>{I.dots()}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Audit defaults */}
          <section id="defaults">
            <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:accent, marginBottom:8 }}>§ 04 – Audit defaults</div>
            <h2 style={{ fontFamily:'var(--font-heading-display)', fontSize:44, fontWeight:400, color:'var(--gloaming-dark)', margin:'0 0 24px', lineHeight:1.05 }}>How we crawl and score.</h2>
            {[
              { title:'Run audits weekly', desc:'Sunday night, UTC. New pages picked up automatically.', on:true },
              { title:'Notify me about critical issues', desc:'An email when any page drops more than 20 points.', on:true },
              { title:'Include PDFs and documents', desc:'Currently 124 files. Adds ~8 minutes per run.', on:false },
              { title:'Archive low-traffic pages', desc:'Under 5 views/month move out of active scoring.', on:false },
            ].map((o,i,arr) => (
              <div key={o.title} style={{ display:'flex', gap:24, alignItems:'flex-start', padding:'20px 0', borderTop:'1px solid var(--limestone-extra-dark)', borderBottom: i===arr.length-1?'1px solid var(--limestone-extra-dark)':'none' }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:'var(--font-heading)', fontSize:17, color:'var(--gloaming-dark)' }}>{o.title}</div>
                  <div style={{ fontSize:14, color:'var(--gloaming-pale)', marginTop:2 }}>{o.desc}</div>
                </div>
                <Toggle on={o.on}/>
              </div>
            ))}
          </section>

          {/* Danger zone */}
          <section id="danger">
            <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--fire-dark)', marginBottom:8 }}>§ 05 – Danger zone</div>
            <h2 style={{ fontFamily:'var(--font-heading-display)', fontSize:44, fontWeight:400, color:'var(--gloaming-dark)', margin:'0 0 24px', lineHeight:1.05 }}>Careful now.</h2>
            <div style={{ border:'1.5px solid var(--fire-300)', borderRadius:12, padding:'24px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:24, background:'var(--fire-100)' }}>
              <div>
                <div style={{ fontFamily:'var(--font-heading)', fontSize:17, color:'var(--gloaming-dark)' }}>Delete {current.name}</div>
                <div style={{ fontSize:14, color:'var(--gloaming)', marginTop:4 }}>Removes the inventory, all audits and all reports. This cannot be undone.</div>
              </div>
              <button style={{ background:'transparent', border:'1.5px solid var(--fire-dark)', color:'var(--fire-dark)', fontFamily:'var(--font-heading)', fontSize:14, padding:'10px 18px', borderRadius:4, cursor:'pointer' }}>Delete project</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

window.VariantD = VariantD;
