// IA V2 – shared chrome for the revised information architecture.
// Project switcher as primary scope anchor. Inventory promoted to top nav.
// Framework kept prominent (authority). Settings split into Project vs Account.

const PROJECTS_V2 = [
  { name: 'Sands',               desc: 'sands.org',          pages: 412 },
  { name: 'Art Fund',            desc: 'artfund.org',         pages: 1289 },
  { name: 'Royal Opera House',   desc: 'roh.org.uk',          pages: 244 },
  { name: 'Kew Gardens',         desc: 'kew.org',             pages: 906 },
  { name: 'Action Against Hunger', desc: 'actionagainsthunger.org.uk', pages: 4218 },
];

// Top bar with universal project dropdown. Modes:
//   anon     – no project; sign-in button; Framework still visible
//   solo     – one project; chevron opens a 2-row menu (Project settings / New project)
//   agency   – many projects; chevron opens full switcher with cog-on-hover per row
function TopBarV2({ accent, mode='agency', open=false, current='Sands', onToggle, avatarOpen=false }) {
  const signedIn = mode !== 'anon';
  const multi = mode === 'agency';

  return (
    <div style={{ borderBottom:'1px solid var(--limestone-extra-dark)', background:'var(--limestone)', position:'relative', zIndex:10 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 32px', gap:24 }}>
        <div style={{ display:'flex', alignItems:'center', gap:20, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <img src="images/clipboard.png" alt="" style={{ width:30, height:30 }}/>
            <b style={{ fontFamily:'var(--font-heading-display)', fontSize:22, color:'var(--gloaming-dark)', fontWeight:400 }}>Content Health Check</b>
          </div>

          {signedIn && (
            <>
              <span style={{ width:1, height:22, background:'var(--limestone-extra-dark)' }}/>
              {/* Universal switcher trigger – same gesture for solo & agency */}
              <button onClick={onToggle} style={{
                display:'flex', alignItems:'center', gap:8,
                background:'transparent', border:'none',
                padding:'6px 4px',
                fontFamily:'var(--font-heading)', fontSize:17, fontWeight:500, color:'var(--gloaming-dark)',
                cursor:'pointer', maxWidth:280,
              }}>
                <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{current}</span>
                <span style={{ color:'var(--gloaming-pale)' }}>{I.caret({width:12, height:12})}</span>
              </button>
            </>
          )}
        </div>

        <nav style={{ display:'flex', gap:28, alignItems:'center', fontFamily:'var(--font-heading)', fontSize:15, color:'var(--gloaming)' }}>
          {signedIn && (
            <>
              <span>Analysis</span>
              <span>Results</span>
              <span>Inventory</span>
            </>
          )}
          {/* Framework + About – signed-out only; signed-in they move to the footer */}
          {!signedIn && <>
            <span style={{ color:'var(--gloaming-dark)', cursor:'pointer' }}>About</span>
            <span style={{
              display:'inline-flex', alignItems:'center', gap:6,
              color:'var(--gloaming-dark)', cursor:'pointer',
            }}>
              Framework
              <span style={{ fontFamily:'var(--font-mono)', fontSize:9, padding:'1px 5px', background:'var(--sunshine-200)', color:'var(--gloaming-dark)', borderRadius:2, letterSpacing:'.05em' }}>v2.1</span>
            </span>
          </>}

          {signedIn ? (
            <div style={{ position:'relative' }}>
              <div style={{ width:30, height:30, borderRadius:'50%', background: avatarOpen ? 'var(--gloaming-dark)' : 'var(--limestone-extra-dark)', display:'grid', placeItems:'center', color: avatarOpen ? 'var(--limestone)' : 'var(--gloaming-dark)', fontSize:13, fontFamily:'var(--font-heading)', cursor:'pointer' }}>AK</div>
              {avatarOpen && <AvatarMenu accent={accent}/>}
            </div>
          ) : (
            <>
              <span style={{ color:'var(--gloaming)', cursor:'pointer' }}>Sign in</span>
              <Button accent={accent}>Start a free audit</Button>
            </>
          )}
        </nav>
      </div>

      {open && signedIn && (multi ? <ProjectSwitcherDropdown accent={accent} current={current}/> : <ProjectMiniMenu accent={accent}/>)}
    </div>
  );
}

function ProjectSwitcherDropdown({ accent, current, hoverRow='Art Fund' }) {
  return (
    <div style={{
      position:'absolute', top:'100%', left: 220, marginTop:6,
      width:380, background:'var(--limestone-pale)', borderRadius:8,
      border:'1px solid var(--limestone-extra-dark)',
      boxShadow:'0 12px 32px rgba(0,0,0,0.14)', zIndex:20, overflow:'hidden',
    }}>
      <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--limestone-extra-dark)', display:'flex', alignItems:'center', gap:8 }}>
        <span style={{ color:'var(--gloaming-pale)' }}>{I.search({width:14, height:14})}</span>
        <input placeholder="Search projects" style={{ border:'none', outline:'none', background:'transparent', fontFamily:'var(--font-body)', fontSize:14, flex:1, color:'var(--gloaming-dark)' }}/>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--gloaming-pale)', border:'1px solid var(--limestone-extra-dark)', padding:'1px 5px', borderRadius:3 }}>⌘K</span>
      </div>
      <div style={{ padding:'8px 0', maxHeight:280, overflowY:'auto' }}>
        <div style={{ padding:'6px 14px 4px', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)' }}>Recent</div>
        {PROJECTS_V2.slice(0,3).map(p => {
          const isCurrent = p.name === current;
          const isHover = p.name === hoverRow;
          return (
            <div key={p.name} style={{
              display:'flex', alignItems:'center', gap:10, padding:'8px 14px',
              background: isCurrent ? `${accent}12` : (isHover ? 'var(--limestone)' : 'transparent'),
              cursor:'pointer',
            }}>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontFamily:'var(--font-heading)', fontSize:14, color:'var(--gloaming-dark)' }}>{p.name}</div>
                <div style={{ fontSize:12, color:'var(--gloaming-pale)' }}>{p.desc}</div>
              </div>
              {isCurrent && <span style={{ color:accent }}>{I.check()}</span>}
              {/* Cog revealed on hover – direct jump to that project’s settings */}
              {isHover && !isCurrent && (
                <span title="Project settings" style={{ color:'var(--gloaming-pale)', padding:4, borderRadius:4, background:'var(--limestone-extra-dark)' }}>{I.cog({width:14, height:14})}</span>
              )}
            </div>
          );
        })}
        <div style={{ padding:'6px 14px 4px', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)', marginTop:4 }}>All projects</div>
        {PROJECTS_V2.slice(3).map(p => (
          <div key={p.name} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 14px', cursor:'pointer' }}>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:'var(--font-heading)', fontSize:14, color:'var(--gloaming-dark)' }}>{p.name}</div>
              <div style={{ fontSize:12, color:'var(--gloaming-pale)' }}>{p.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop:'1px solid var(--limestone-extra-dark)' }}>
        <MenuRow icon={I.cog} label="Project settings" hint={current}/>
        <MenuRow icon={I.plus} label="New project"/>
        <MenuRow icon={I.folder} label="Manage all projects" subtle/>
      </div>
    </div>
  );
}

// Solo user’s mini menu – just 2 rows; same anchor, same gesture as agency
function ProjectMiniMenu({ accent }) {
  return (
    <div style={{
      position:'absolute', top:'100%', left: 220, marginTop:6,
      width:260, background:'var(--limestone-pale)', borderRadius:8,
      border:'1px solid var(--limestone-extra-dark)',
      boxShadow:'0 12px 32px rgba(0,0,0,0.14)', zIndex:20, overflow:'hidden',
    }}>
      <MenuRow icon={I.cog} label="Project settings"/>
      <MenuRow icon={I.plus} label="New project"/>
    </div>
  );
}

function MenuRow({ icon, label, hint, subtle }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:10, padding:'11px 16px',
      cursor:'pointer', fontSize:14,
      color: subtle ? 'var(--gloaming-pale)' : 'var(--gloaming-dark)',
      borderBottom:'1px solid transparent',
    }}>
      <span style={{ color:'var(--gloaming-pale)' }}>{icon && icon({ width:16, height:16 })}</span>
      <span style={{ fontFamily:'var(--font-heading)' }}>{label}</span>
      {hint && <span style={{ fontSize:12, color:'var(--gloaming-pale)', marginLeft:'auto' }}>{hint}</span>}
    </div>
  );
}

function AvatarMenu({ accent }) {
  const groups = [
    { head:'Ayesha Khan', sub:'ayesha@contentious.ltd', big:true },
    { items:[
      { label:'Account settings', icon:I.cog },
      { label:'Members & teams', icon:I.users },
      { label:'Billing & plan', icon:I.plug },
      { label:'Notifications', icon:I.bell },
    ]},
    { items:[
      { label:'All projects', icon:I.folder },
      { label:'Integrations', icon:I.plug },
    ]},
    { items:[
      { label:'Sign out', muted:true },
    ]},
  ];
  return (
    <div style={{
      position:'absolute', top:'calc(100% + 8px)', right:0, width:260,
      background:'var(--limestone-pale)', borderRadius:8,
      border:'1px solid var(--limestone-extra-dark)',
      boxShadow:'0 12px 32px rgba(0,0,0,0.14)', zIndex:30, overflow:'hidden',
      fontFamily:'var(--font-body)',
    }}>
      {groups.map((g, gi) => (
        <div key={gi} style={{ padding:'6px 0', borderTop: gi>0 ? '1px solid var(--limestone-extra-dark)' : 'none' }}>
          {g.big && (
            <div style={{ padding:'10px 14px' }}>
              <div style={{ fontFamily:'var(--font-heading)', fontSize:14, color:'var(--gloaming-dark)' }}>{g.head}</div>
              <div style={{ fontSize:12, color:'var(--gloaming-pale)' }}>{g.sub}</div>
            </div>
          )}
          {g.items && g.items.map(it => (
            <div key={it.label} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 14px', cursor:'pointer', fontSize:14, color: it.muted ? 'var(--gloaming-pale)' : 'var(--gloaming-dark)' }}>
              {it.icon && <span style={{ color:'var(--gloaming-pale)' }}>{it.icon()}</span>}
              <span>{it.label}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function AppFooter({ accent }) {
  return (
    <div style={{ borderTop:'1px solid var(--limestone-extra-dark)', padding:'24px 40px', display:'flex', alignItems:'center', justifyContent:'space-between', background:'var(--limestone)', marginTop:'auto' }}>
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        <img src="images/clipboard.png" alt="" style={{ width:18, height:18, opacity:0.4 }}/>
        <span style={{ fontFamily:'var(--font-heading)', fontSize:13, color:'var(--gloaming-pale)' }}>Content Health Check</span>
      </div>
      <div style={{ display:'flex', gap:28, fontFamily:'var(--font-heading)', fontSize:13, color:'var(--gloaming-pale)' }}>
        <span style={{ cursor:'pointer', display:'inline-flex', alignItems:'center', gap:5 }}>
          Framework
          <span style={{ fontFamily:'var(--font-mono)', fontSize:9, padding:'1px 4px', background:'var(--sunshine-200)', color:'var(--gloaming-dark)', borderRadius:2, letterSpacing:'.05em' }}>v2.1</span>
        </span>
        <span style={{ cursor:'pointer' }}>About</span>
        <span style={{ cursor:'pointer' }}>Privacy</span>
      </div>
    </div>
  );
}

Object.assign(window, { PROJECTS_V2, TopBarV2, ProjectSwitcherDropdown, ProjectMiniMenu, MenuRow, AvatarMenu, AppFooter });
