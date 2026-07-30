// IA V2 extras – three new artboards:
//   - Org-level Members & teams (under avatar → Account settings)
//   - Solo user top nav with subtle + to add a project
//   - New-project modal (triggered by + or switcher’s "+ New project")
// Plus: refined closed-state multi-project switcher, shown alongside current.

// --- Org-level Members & teams ----------------------------------------------
function AB_Members({ accent }) {
  const nav = [
    { group:'', items:['Profile'] },
    { group:'Organisation', items:['Members & teams','Billing & plan','Integrations'] },
    { group:'', items:['Notifications','Security'] },
  ];
  const members = [
    { name:'Ayesha Khan',  email:'ayesha@contentious.ltd',  role:'Owner',  status:'Active',  last:'Now',         you:true },
    { name:'Julius Honnor', email:'julius@contentious.ltd', role:'Admin',  status:'Active',  last:'2 hours ago' },
    { name:'Sam Okafor',   email:'sam@contentious.ltd',    role:'Editor', status:'Active',  last:'Yesterday' },
    { name:'Maya Liu',     email:'maya@contentious.ltd',   role:'Editor', status:'Active',  last:'3 days ago' },
    { name:'Rob Davies',   email:'rob@freelance.co',       role:'Editor', status:'Invited', last:' – ' },
  ];
  return (
    <div style={{ background:'var(--limestone)', minHeight:'100%', fontFamily:'var(--font-body)', color:'var(--gloaming)', fontSize:15 }}>
      <TopBarV2 accent={accent} mode="agency" current="Sands"/>
      <div style={{ display:'grid', gridTemplateColumns:'260px 1fr' }}>
        <aside style={{ padding:'40px 20px 40px 32px', borderRight:'1px solid var(--limestone-extra-dark)', background:'var(--limestone)', minHeight:'100%' }}>
          <div style={{ marginBottom:24 }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)', marginBottom:4 }}>Account settings</div>
            <div style={{ fontFamily:'var(--font-heading-display)', fontSize:22, color:'var(--gloaming-dark)', lineHeight:1.1 }}>Contentious Ltd</div>
          </div>
          {nav.map((g,gi) => (
            <div key={gi} style={{ marginTop: g.group ? 20 : 8 }}>
              {g.group && <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)', padding:'0 12px 8px' }}>{g.group}</div>}
              {g.items.map(item => {
                const isActive = item === 'Members & teams';
                return (
                  <div key={item} style={{
                    padding:'9px 12px', borderRadius:6, marginBottom:2,
                    fontFamily:'var(--font-heading)', fontSize:14,
                    background: isActive ? 'var(--gloaming-dark)' : 'transparent',
                    color: isActive ? 'var(--limestone)' : 'var(--gloaming)', cursor:'pointer',
                  }}>{item}</div>
                );
              })}
            </div>
          ))}
          <div style={{ marginTop:40, padding:'16px', borderTop:'1px dashed var(--limestone-extra-dark)' }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)', marginBottom:8 }}>Elsewhere</div>
            <div style={{ fontFamily:'var(--font-heading)', fontSize:13, color:'var(--gloaming-pale)', lineHeight:1.7 }}>
              Project settings <span style={{ float:'right' }}>↗</span><br/>
              All projects <span style={{ float:'right' }}>↗</span>
            </div>
          </div>
        </aside>

        <main style={{ padding:'48px 56px 80px', maxWidth:920 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14, fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)' }}>
            <span>Account</span><span>·</span><span style={{ color:'var(--gloaming-dark)' }}>Members & teams</span>
          </div>
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:20 }}>
            <div>
              <h1 style={{ fontFamily:'var(--font-heading-display)', fontSize:52, fontWeight:400, color:'var(--gloaming-dark)', margin:'0 0 8px', lineHeight:1.05 }}>Members & teams</h1>
              <p style={{ maxWidth:'58ch', fontSize:16, color:'var(--gloaming)', margin:'0 0 0' }}>Everyone here can see every project in the account. For separation between clients, create a separate account.</p>
            </div>
            <Button accent={accent}>Invite member</Button>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, margin:'32px 0 28px' }}>
            {[
              { lbl:'Members',   val:'4 active' },
              { lbl:'Invitations pending', val:'1' },
              { lbl:'Seats', val:'5 of unlimited' },
            ].map(s => (
              <div key={s.lbl} style={{ background:'var(--limestone-pale)', borderRadius:8, padding:'16px 20px' }}>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)', marginBottom:4 }}>{s.lbl}</div>
                <div style={{ fontFamily:'var(--font-heading-display)', fontSize:24, color:'var(--gloaming-dark)', lineHeight:1.1 }}>{s.val}</div>
              </div>
            ))}
          </div>

          {/* Members table */}
          <div style={{ background:'var(--limestone-pale)', borderRadius:8, overflow:'hidden' }}>
            <div style={{ display:'grid', gridTemplateColumns:'2fr 1.2fr 1fr 1fr 40px', gap:16, padding:'12px 20px', borderBottom:'1px solid var(--limestone-extra-dark)', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)' }}>
              <div>Member</div><div>Role</div><div>Status</div><div>Last active</div><div/>
            </div>
            {members.map((m,i) => (
              <div key={m.email} style={{
                display:'grid', gridTemplateColumns:'2fr 1.2fr 1fr 1fr 40px', gap:16, padding:'16px 20px',
                alignItems:'center', borderBottom: i<members.length-1 ? '1px solid var(--limestone)' : 'none',
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:32, height:32, borderRadius:'50%', background:'var(--limestone-extra-dark)', display:'grid', placeItems:'center', fontFamily:'var(--font-heading)', fontSize:12, color:'var(--gloaming-dark)', flexShrink:0 }}>{m.name.split(' ').map(n=>n[0]).join('')}</div>
                  <div style={{ minWidth:0 }}>
                    <div style={{ fontFamily:'var(--font-heading)', fontSize:14, color:'var(--gloaming-dark)' }}>{m.name} {m.you && <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--gloaming-pale)', marginLeft:4 }}>(you)</span>}</div>
                    <div style={{ fontSize:12, color:'var(--gloaming-pale)' }}>{m.email}</div>
                  </div>
                </div>
                <div style={{ fontSize:14, color:'var(--gloaming-dark)' }}>{m.role}</div>
                <div>
                  <span style={{
                    fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.06em', textTransform:'uppercase',
                    padding:'3px 8px', borderRadius:3,
                    background: m.status==='Active' ? 'var(--sapling-200)' : 'var(--sunshine-200)',
                    color: m.status==='Active' ? 'var(--sapling-extra-dark)' : 'var(--sunshine-extra-dark)',
                  }}>{m.status}</span>
                </div>
                <div style={{ fontSize:13, color:'var(--gloaming-pale)' }}>{m.last}</div>
                <div style={{ color:'var(--gloaming-pale)', cursor:'pointer' }}>{I.dots()}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop:32, padding:'18px 22px', borderRadius:8, border:'1px dashed var(--limestone-extra-dark)', fontSize:14, color:'var(--gloaming-pale)', maxWidth:'70ch' }}>
            <b style={{ fontFamily:'var(--font-heading)', color:'var(--gloaming-dark)', fontWeight:400 }}>One roster, every project.</b>{' '}
            All members can see every project in this account. That keeps things simple – if you need walled-off access (e.g. running audits for competing clients), create a separate account.
          </div>
        </main>
      </div>
      <AppFooter accent={accent}/>
    </div>
  );
}

// --- Universal dropdown: solo + agency --------------------------------------
function AB_UniversalDropdown({ accent }) {
  return (
    <div style={{ background:'var(--limestone)', minHeight:'100%', fontFamily:'var(--font-body)', color:'var(--gloaming)', fontSize:15 }}>
      <div style={{ padding:'40px 40px 20px' }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)', marginBottom:10 }}>One gesture, two contents</div>
        <h2 style={{ fontFamily:'var(--font-heading-display)', fontSize:40, color:'var(--gloaming-dark)', fontWeight:400, lineHeight:1.05, margin:'0 0 12px' }}>Every user gets the same dropdown.</h2>
        <p style={{ fontFamily:'var(--font-body)', fontSize:16, color:'var(--gloaming)', lineHeight:1.55, maxWidth:'62ch', margin:0 }}>
          Closed state is identical – <b>Sands ▾</b>. Click reveals either a two-row mini-menu (solo) or the full switcher with cog-on-hover per row (agency). The solo <b>+</b> is gone: New project now lives in the dropdown.
        </p>
      </div>

      <div style={{ padding:'20px 40px 60px', display:'flex', flexDirection:'column', gap:48 }}>

        {/* Solo open */}
        <div style={{ display:'grid', gridTemplateColumns:'520px 1fr', gap:40, alignItems:'start' }}>
          <div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color: accent, marginBottom:10 }}>Solo · open</div>
            <div style={{ position:'relative', background:'var(--limestone-pale)', borderRadius:8, height:240, overflow:'visible' }}>
              <TopBarV2 accent={accent} mode="solo" current="Sands" open={true}/>
            </div>
          </div>
          <div style={{ paddingTop:34 }}>
            <h3 style={{ fontFamily:'var(--font-heading-display)', fontSize:22, color:'var(--gloaming-dark)', fontWeight:400, margin:'0 0 8px' }}>Two rows. That’s it.</h3>
            <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--gloaming)', lineHeight:1.6, margin:'0 0 14px', maxWidth:'52ch' }}>
              No search, no project list – there’s only one project. <b>Project settings</b> and <b>New project</b>, anchored to the same <b>Sands ▾</b> trigger an agency user clicks.
            </p>
            <ul style={{ fontFamily:'var(--font-body)', fontSize:14, color:'var(--gloaming)', lineHeight:1.65, paddingLeft:18, margin:0 }}>
              <li>⌘K opens with "Project settings" focused</li>
              <li>Adding a second project silently upgrades this menu – no chrome changes</li>
            </ul>
          </div>
        </div>

        {/* Agency open */}
        <div style={{ display:'grid', gridTemplateColumns:'520px 1fr', gap:40, alignItems:'start' }}>
          <div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color: accent, marginBottom:10 }}>Agency · open, hovering a project row</div>
            <div style={{ position:'relative', background:'var(--limestone-pale)', borderRadius:8, height:560, overflow:'visible' }}>
              <TopBarV2 accent={accent} mode="agency" current="Sands" open={true}/>
            </div>
          </div>
          <div style={{ paddingTop:34 }}>
            <h3 style={{ fontFamily:'var(--font-heading-display)', fontSize:22, color:'var(--gloaming-dark)', fontWeight:400, margin:'0 0 8px' }}>The full switcher, plus the two shortcuts.</h3>
            <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--gloaming)', lineHeight:1.6, margin:'0 0 14px', maxWidth:'52ch' }}>
              Same mechanic, more content. Recent + All projects above; below the divider, the same <b>Project settings</b> and <b>New project</b> rows – plus <b>Manage all projects</b>.
            </p>
            <ul style={{ fontFamily:'var(--font-body)', fontSize:14, color:'var(--gloaming)', lineHeight:1.65, paddingLeft:18, margin:0 }}>
              <li>Cog appears on hover – jump straight to that project’s settings without switching first</li>
              <li>⌘K opens with search focused</li>
              <li>Project settings row shows current project name as a hint</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ padding:'0 40px 60px' }}>
        <div style={{ padding:'18px 22px', borderRadius:8, border:'1px dashed var(--limestone-extra-dark)', fontSize:14, color:'var(--gloaming-pale)', maxWidth:'80ch' }}>
          <b style={{ fontFamily:'var(--font-heading)', color:'var(--gloaming-dark)', fontWeight:400 }}>Why this beats the + beside the name:</b>{' '}
          the mechanic is identical for every user from day one. When a solo adds a second project, nothing changes in the chrome – the dropdown just grows a project list. No UI flag day, no "I used to have a +, now it’s gone" surprise. And settings become discoverable for everyone, not buried behind a guess.
        </div>
      </div>
    </div>
  );
}

// --- New project modal ------------------------------------------------------
function AB_NewProjectModal({ accent }) {
  return (
    <div style={{ background:'var(--limestone)', minHeight:'100%', fontFamily:'var(--font-body)', color:'var(--gloaming)', fontSize:15, position:'relative' }}>
      <TopBarV2 accent={accent} mode="agency" current="Sands"/>
      <div style={{ display:'grid', gridTemplateColumns:'260px 1fr', opacity:0.35 }}>
        <SettingsSideNav accent={accent} active="Overview"/>
        <main style={{ padding:'48px 56px 80px' }}>
          <h1 style={{ fontFamily:'var(--font-heading-display)', fontSize:52, fontWeight:400, color:'var(--gloaming-dark)', margin:0, lineHeight:1.05 }}>Overview</h1>
        </main>
      </div>

      {/* Scrim */}
      <div style={{ position:'absolute', inset:0, background:'rgba(26,25,24,0.4)' }}/>

      {/* Modal */}
      <div style={{
        position:'absolute', top:100, left:'50%', transform:'translateX(-50%)', width:580,
        background:'var(--limestone-pale)', borderRadius:12, boxShadow:'0 24px 60px rgba(0,0,0,0.28)',
        border:'1px solid var(--limestone-extra-dark)', overflow:'hidden',
      }}>
        <div style={{ padding:'28px 32px 8px' }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)', marginBottom:8 }}>New project</div>
          <h2 style={{ fontFamily:'var(--font-heading-display)', fontSize:34, fontWeight:400, color:'var(--gloaming-dark)', margin:0, lineHeight:1.1 }}>Add a site to audit.</h2>
          <p style={{ fontSize:14, color:'var(--gloaming-pale)', margin:'8px 0 0', maxWidth:'52ch' }}>We’ll discover the content automatically. You can refine the starting URL and taxonomy afterwards.</p>
        </div>

        <div style={{ padding:'20px 32px 24px', display:'grid', gap:18 }}>
          <Field label="Project name" required>
            <input defaultValue="Art Fund" style={inputStyle()}/>
          </Field>
          <Field label="Starting URL" required hint="We’ll crawl from here. Only pages on this hostname.">
            <input defaultValue="https://www.artfund.org" style={inputStyle()}/>
          </Field>
          <Field label="Industry" hint="Optional – helps tune defaults.">
            <select defaultValue="Arts" style={inputStyle()}>
              <option>Non-profit · Health</option><option>Arts</option><option>Charity</option><option>Public sector</option><option>Other</option>
            </select>
          </Field>

          <div style={{ padding:'14px 16px', borderRadius:6, background:'var(--limestone)', border:'1px solid var(--limestone-extra-dark)' }}>
            <div style={{ fontFamily:'var(--font-heading)', fontSize:13, color:'var(--gloaming-dark)', marginBottom:10 }}>Start from</div>
            <label style={{ display:'flex', alignItems:'flex-start', gap:10, cursor:'pointer', marginBottom:8 }}>
              <input type="radio" name="start" defaultChecked style={{ marginTop:3 }}/>
              <div>
                <div style={{ fontSize:14, color:'var(--gloaming-dark)' }}>Copy settings from <b>Sands</b></div>
                <div style={{ fontSize:12, color:'var(--gloaming-pale)' }}>Reuses brand & strategy, taxonomy and audit schedule. Change them later.</div>
              </div>
            </label>
            <label style={{ display:'flex', alignItems:'flex-start', gap:10, cursor:'pointer' }}>
              <input type="radio" name="start" style={{ marginTop:3 }}/>
              <div>
                <div style={{ fontSize:14, color:'var(--gloaming-dark)' }}>Start fresh</div>
                <div style={{ fontSize:12, color:'var(--gloaming-pale)' }}>Default Framework only. You’ll configure bespoke criteria from scratch.</div>
              </div>
            </label>
          </div>
        </div>

        <div style={{ padding:'16px 32px', background:'var(--limestone)', borderTop:'1px solid var(--limestone-extra-dark)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontSize:12, color:'var(--gloaming-pale)' }}>Pricing is per-page, not per-project.</span>
          <div style={{ display:'flex', gap:8 }}>
            <Button accent={accent} kind="secondary">Cancel</Button>
            <Button accent={accent}>Create project</Button>
          </div>
        </div>
      </div>
      <AppFooter accent={accent}/>
    </div>
  );
}

function Field({ label, hint, required, children }) {
  return (
    <div>
      <div style={{ fontFamily:'var(--font-heading)', fontSize:13, color:'var(--gloaming-dark)', marginBottom:6 }}>{label}{required && <span style={{ color:'var(--fire-dark)', marginLeft:3 }}>*</span>}</div>
      {children}
      {hint && <div style={{ fontSize:12, color:'var(--gloaming-pale)', marginTop:5 }}>{hint}</div>}
    </div>
  );
}
function inputStyle() {
  return {
    width:'100%', padding:'10px 12px', borderRadius:4,
    border:'1.5px solid var(--limestone-extra-dark)', background:'var(--limestone)',
    fontFamily:'var(--font-body)', fontSize:15, color:'var(--gloaming-dark)',
    boxSizing:'border-box',
  };
}

// --- Switcher button refinement: current vs refined ------------------------
function AB_SwitcherButtons({ accent }) {
  return (
    <div style={{ background:'var(--limestone)', padding:'60px 40px', minHeight:'100%' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32 }}>

        {/* Current */}
        <div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)', marginBottom:10 }}>Current · v2</div>
          <div style={{ fontFamily:'var(--font-heading-display)', fontSize:20, color:'var(--gloaming-dark)', marginBottom:20 }}>Boxed, small swatch, chevron</div>
          <div style={{ padding:'18px 20px', background:'var(--limestone-pale)', borderRadius:8, display:'flex', alignItems:'center', gap:14 }}>
            <img src="images/clipboard.png" alt="" style={{ width:26, height:26 }}/>
            <span style={{ width:1, height:22, background:'var(--limestone-extra-dark)' }}/>
            <button style={{
              display:'flex', alignItems:'center', gap:8,
              background:'var(--limestone-pale)', border:'1px solid var(--limestone-extra-dark)',
              borderRadius:4, padding:'6px 10px 6px 12px',
              fontFamily:'var(--font-heading)', fontSize:15, color:'var(--gloaming-dark)',
            }}>
              <span style={{ width:18, height:18, borderRadius:3, background:accent, display:'inline-block' }}/>
              <span>Sands</span>
              <span style={{ color:'var(--gloaming-pale)' }}>{I.caret({width:12, height:12})}</span>
            </button>
          </div>
          <ul style={{ fontFamily:'var(--font-body)', fontSize:14, color:'var(--gloaming)', lineHeight:1.6, paddingLeft:18, marginTop:20 }}>
            <li>Works, but looks like a form control</li>
            <li>Box competes visually with the logo wordmark</li>
            <li>Coloured swatch is arbitrary – no meaning in the app</li>
          </ul>
        </div>

        {/* Refined */}
        <div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color: accent, marginBottom:10 }}>Refined</div>
          <div style={{ fontFamily:'var(--font-heading-display)', fontSize:20, color:'var(--gloaming-dark)', marginBottom:20 }}>Typographic, vertical rule, single chevron</div>
          <div style={{ padding:'18px 20px', background:'var(--limestone-pale)', borderRadius:8, display:'flex', alignItems:'center', gap:14 }}>
            <img src="images/clipboard.png" alt="" style={{ width:26, height:26 }}/>
            <span style={{ width:1, height:22, background:'var(--limestone-extra-dark)' }}/>
            <button style={{
              display:'flex', alignItems:'center', gap:8,
              background:'transparent', border:'none',
              padding:'6px 4px', cursor:'pointer',
              fontFamily:'var(--font-heading)', fontSize:17, color:'var(--gloaming-dark)', fontWeight:500,
            }}>
              <span>Sands</span>
              <span style={{ color:'var(--gloaming-pale)' }}>{I.caret({width:12, height:12})}</span>
            </button>
          </div>
          <ul style={{ fontFamily:'var(--font-body)', fontSize:14, color:'var(--gloaming)', lineHeight:1.6, paddingLeft:18, marginTop:20 }}>
            <li>Vertical rule divides logo and scope – quieter than a slash</li>
            <li>No box, no swatch – just the name, as a live label</li>
            <li>Single chevron: familiar, minimal, signals dropdown without shouting</li>
            <li>For solo users, the chevron simply hides – same layout, no jump</li>
          </ul>
        </div>
      </div>

      <div style={{ marginTop:40, padding:'18px 22px', borderRadius:8, border:'1px dashed var(--limestone-extra-dark)', fontSize:14, color:'var(--gloaming-pale)', maxWidth:'70ch' }}>
        <b style={{ fontFamily:'var(--font-heading)', color:'var(--gloaming-dark)', fontWeight:400 }}>One switcher, two states.</b>{' '}
        The refined button <i>is</i> just a label – exactly what solo users need. For agencies, the stacked caret animates in, revealing it’s also a switcher. Same visual language either way.
      </div>
    </div>
  );
}

Object.assign(window, { AB_Members, AB_UniversalDropdown, AB_NewProjectModal, AB_SwitcherButtons });
