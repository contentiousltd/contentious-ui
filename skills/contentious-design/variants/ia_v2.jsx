// IA V2 artboards – the revised information architecture, illustrated.
// Shows: signed-out framework-forward, agency switcher open, project settings
// page with the new sub-nav, and solo user’s quieter chrome.

// Solid settings sub-nav for the project-scoped settings page.
function SettingsSideNav({ accent, active='Overview' }) {
  const nav = [
    { group: '', items:['Overview'] },
    { group: 'How we audit', items:['Brand & strategy','Taxonomy','Audit schedule'] },
    { group: '', items:['Danger zone'], danger:true },
  ];
  return (
    <aside style={{ padding:'40px 20px 40px 32px', borderRight:'1px solid var(--limestone-extra-dark)', background:'var(--limestone)', minHeight:'100%' }}>
      <div style={{ marginBottom:24 }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)', marginBottom:4 }}>Project settings</div>
        <div style={{ fontFamily:'var(--font-heading-display)', fontSize:22, color:'var(--gloaming-dark)', lineHeight:1.1 }}>Sands</div>
      </div>
      {nav.map((g,gi) => (
        <div key={gi} style={{ marginTop: g.group ? 20 : 8 }}>
          {g.group && <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)', padding:'0 12px 8px' }}>{g.group}</div>}
          {g.items.map(item => {
            const isActive = item === active;
            return (
              <div key={item} style={{
                padding:'9px 12px', borderRadius:6, marginBottom:2,
                fontFamily:'var(--font-heading)', fontSize:14,
                background: isActive ? 'var(--gloaming-dark)' : 'transparent',
                color: isActive ? 'var(--limestone)' : (g.danger ? 'var(--fire-dark)' : 'var(--gloaming)'),
                cursor:'pointer',
              }}>{item}</div>
            );
          })}
        </div>
      ))}
      <div style={{ marginTop:40, padding:'16px', borderTop:'1px dashed var(--limestone-extra-dark)' }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)', marginBottom:8 }}>Elsewhere</div>
        <div style={{ fontFamily:'var(--font-heading)', fontSize:13, color:'var(--gloaming-pale)', lineHeight:1.7 }}>
          Account settings <span style={{ float:'right' }}>↗</span><br/>
          All projects <span style={{ float:'right' }}>↗</span>
        </div>
      </div>
    </aside>
  );
}

// A – Project Settings page (agency context)
function AB_ProjectSettings({ accent }) {
  return (
    <div style={{ background:'var(--limestone)', minHeight:'100%', fontFamily:'var(--font-body)', color:'var(--gloaming)', fontSize:15 }}>
      <TopBarV2 accent={accent} mode="agency" current="Sands"/>
      <div style={{ display:'grid', gridTemplateColumns:'260px 1fr' }}>
        <SettingsSideNav accent={accent} active="Overview"/>
        <main style={{ padding:'48px 56px 80px', maxWidth:820 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14, fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)' }}>
            <span>Sands</span><span>·</span><span>Settings</span><span>·</span><span style={{ color:'var(--gloaming-dark)' }}>Overview</span>
          </div>
          <h1 style={{ fontFamily:'var(--font-heading-display)', fontSize:52, fontWeight:400, color:'var(--gloaming-dark)', margin:'0 0 8px', lineHeight:1.05 }}>Overview</h1>
          <p style={{ maxWidth:'56ch', fontSize:16, color:'var(--gloaming)', margin:'0 0 36px' }}>Metadata for this project. Brand guidelines, taxonomy and audit schedule live in their own pages on the left.</p>

          {[
            { lbl:'Project name', val:'Sands' },
            { lbl:'Primary URL',  val:'https://www.sands.org', hint:'Root of the content inventory.' },
            { lbl:'Industry',     val:'Non-profit · Health' },
            { lbl:'Description',  val:'Web content audit for sands.org, focusing on bereavement support pages.' },
          ].map((f,i,arr) => (
            <div key={f.lbl} style={{ display:'grid', gridTemplateColumns:'180px 1fr auto', gap:24, alignItems:'flex-start', padding:'20px 0', borderTop:'1px solid var(--limestone-extra-dark)', borderBottom: i===arr.length-1?'1px solid var(--limestone-extra-dark)':'none' }}>
              <div style={{ fontFamily:'var(--font-heading)', fontSize:14, color:'var(--gloaming-dark)', paddingTop:2 }}>{f.lbl}</div>
              <div>
                <div style={{ fontSize:16, color:'var(--gloaming-dark)' }}>{f.val}</div>
                {f.hint && <div style={{ fontSize:13, color:'var(--gloaming-pale)', marginTop:4 }}>{f.hint}</div>}
              </div>
              <span style={{ color:'var(--gloaming-pale)', cursor:'pointer' }}>{I.edit()}</span>
            </div>
          ))}

          <h3 style={{ fontFamily:'var(--font-heading)', fontSize:20, fontWeight:400, color:'var(--gloaming-dark)', margin:'48px 0 14px' }}>At a glance</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
            {[
              { lbl:'Content in inventory', val:'412', link:'View inventory →' },
              { lbl:'Last audit',           val:'2 days ago', link:'See results →' },
              { lbl:'Next re-assessment',   val:'22 May',     link:'Audit schedule →' },
            ].map(s => (
              <div key={s.lbl} style={{ background:'var(--limestone-pale)', borderRadius:8, padding:'18px 20px' }}>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)', marginBottom:6 }}>{s.lbl}</div>
                <div style={{ fontFamily:'var(--font-heading-display)', fontSize:26, color:'var(--gloaming-dark)', lineHeight:1.1, marginBottom:8 }}>{s.val}</div>
                <div style={{ fontFamily:'var(--font-heading)', fontSize:13, color: accent }}>{s.link}</div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <AppFooter accent={accent}/>
    </div>
  );
}

// B – Switcher open (agency mode)
function AB_SwitcherOpen({ accent }) {
  return (
    <div style={{ background:'var(--limestone)', minHeight:'100%', fontFamily:'var(--font-body)', color:'var(--gloaming)', fontSize:15 }}>
      <TopBarV2 accent={accent} mode="agency" current="Sands" open={true}/>
      <div style={{ display:'grid', gridTemplateColumns:'260px 1fr' }}>
        <SettingsSideNav accent={accent} active="Overview"/>
        <main style={{ padding:'48px 56px 80px', opacity:0.4 }}>
          <h1 style={{ fontFamily:'var(--font-heading-display)', fontSize:52, fontWeight:400, color:'var(--gloaming-dark)', margin:0, lineHeight:1.05 }}>Overview</h1>
          <p style={{ maxWidth:'56ch', fontSize:16, color:'var(--gloaming)', marginTop:8 }}>– switcher open –</p>
        </main>
      </div>
      <AppFooter accent={accent}/>
    </div>
  );
}

// C – Signed out / anon state
function AB_Anon({ accent }) {
  return (
    <div style={{ background:'var(--limestone)', minHeight:'100%', fontFamily:'var(--font-body)', color:'var(--gloaming)', fontSize:15, display:'flex', flexDirection:'column' }}>
      <TopBarV2 accent={accent} mode="anon"/>
      <div style={{ maxWidth:900, margin:'0 auto', padding:'80px 40px', flex:1 }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)', marginBottom:14 }}>The Framework · public reference</div>
        <h1 style={{ fontFamily:'var(--font-heading-display)', fontSize:76, fontWeight:400, color:'var(--gloaming-dark)', margin:'0 0 16px', lineHeight:1 }}>The criteria we use<br/>to judge content.</h1>
        <p style={{ maxWidth:'54ch', fontSize:18, color:'var(--gloaming)', margin:'0 0 40px', lineHeight:1.55 }}>A public model, maintained by Contentious. Every audit in the app scores content against these criteria. You can read it without an account.</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:14 }}>
          {[
            { n:'01', t:'Clarity', d:'Plain language. No jargon unless defined.' },
            { n:'02', t:'Relevance', d:'Matches the audience\'s stated need.' },
            { n:'03', t:'Accuracy', d:'Factually correct, current, sourced.' },
            { n:'04', t:'Findability', d:'Can be discovered by the reader who needs it.' },
          ].map(c => (
            <div key={c.n} style={{ background:'var(--limestone-pale)', borderRadius:8, padding:'22px 24px' }}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color: accent, marginBottom:8 }}>§ {c.n}</div>
              <div style={{ fontFamily:'var(--font-heading-display)', fontSize:24, color:'var(--gloaming-dark)', marginBottom:4 }}>{c.t}</div>
              <div style={{ fontSize:14, color:'var(--gloaming-pale)' }}>{c.d}</div>
            </div>
          ))}
        </div>
      </div>
      <AppFooter accent={accent}/>
    </div>
  );
}

// D – Solo user (single-project org): switcher muted to a label
function AB_Solo({ accent }) {
  return (
    <div style={{ background:'var(--limestone)', minHeight:'100%', fontFamily:'var(--font-body)', color:'var(--gloaming)', fontSize:15, display:'flex', flexDirection:'column' }}>
      <TopBarV2 accent={accent} mode="solo" current="Action Against Hunger"/>
      <div style={{ display:'grid', gridTemplateColumns:'260px 1fr' }}>
        <SettingsSideNav accent={accent} active="Brand & strategy"/>
        <main style={{ padding:'48px 56px 80px', maxWidth:820 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14, fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)' }}>
            <span>Settings</span><span>·</span><span style={{ color:'var(--gloaming-dark)' }}>Brand & strategy</span>
          </div>
          <h1 style={{ fontFamily:'var(--font-heading-display)', fontSize:52, fontWeight:400, color:'var(--gloaming-dark)', margin:'0 0 8px', lineHeight:1.05 }}>Brand & strategy</h1>
          <p style={{ maxWidth:'56ch', fontSize:16, color:'var(--gloaming)', margin:'0 0 32px' }}>Your bespoke standards. The Framework gives universal criteria; this is how <i>you</i> want your content to sound, what it should cover, and who it’s for.</p>

          {[
            { lbl:'Audience', val:'People recently bereaved by stillbirth, neonatal death or late miscarriage. Often reading in distress, often on mobile.' },
            { lbl:'Tone of voice', val:'Gentle, direct, never euphemistic. Short sentences. Plain English (Hemingway grade 6 or lower).' },
            { lbl:'Strategic priorities', val:'Support, information, signposting to help. Fundraising sits separately.' },
          ].map(f => (
            <div key={f.lbl} style={{ padding:'18px 0', borderTop:'1px solid var(--limestone-extra-dark)' }}>
              <div style={{ fontFamily:'var(--font-heading)', fontSize:14, color:'var(--gloaming-dark)', marginBottom:8 }}>{f.lbl}</div>
              <div style={{ fontSize:15, color:'var(--gloaming)', lineHeight:1.55, maxWidth:'60ch' }}>{f.val}</div>
            </div>
          ))}
        </main>
      </div>
      <AppFooter accent={accent}/>
    </div>
  );
}

// E – Schedule panel detail (showing the new monthly re-assessment concept)
function AB_Schedule({ accent }) {
  return (
    <div style={{ background:'var(--limestone)', minHeight:'100%', fontFamily:'var(--font-body)', color:'var(--gloaming)', fontSize:15 }}>
      <TopBarV2 accent={accent} mode="agency" current="Sands"/>
      <div style={{ display:'grid', gridTemplateColumns:'260px 1fr' }}>
        <SettingsSideNav accent={accent} active="Audit schedule"/>
        <main style={{ padding:'48px 56px 80px', maxWidth:820 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14, fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)' }}>
            <span>Sands</span><span>·</span><span>Settings</span><span>·</span><span style={{ color:'var(--gloaming-dark)' }}>Audit schedule</span>
          </div>
          <h1 style={{ fontFamily:'var(--font-heading-display)', fontSize:52, fontWeight:400, color:'var(--gloaming-dark)', margin:'0 0 8px', lineHeight:1.05 }}>Audit schedule</h1>
          <p style={{ maxWidth:'56ch', fontSize:16, color:'var(--gloaming)', margin:'0 0 32px' }}>Re-assessments run automatically. Change detection means only content that’s actually changed gets scored again.</p>

          <div style={{ background:'var(--limestone-pale)', borderRadius:10, padding:'24px 28px', marginBottom:20 }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)', marginBottom:8 }}>Next run</div>
            <div style={{ fontFamily:'var(--font-heading-display)', fontSize:36, color:'var(--gloaming-dark)', lineHeight:1.1, marginBottom:4 }}>22 May · 03:00 UTC</div>
            <div style={{ fontSize:14, color:'var(--gloaming-pale)' }}>~38 pages expected to re-score based on current change detection.</div>
          </div>

          {[
            { l:'Cadence', v:'Monthly', opts:['Weekly','Monthly','Quarterly','Off'] },
            { l:'Change detection', v:'On', desc:'Only re-score pages that have changed. Off re-scores everything.' },
            { l:'Notify on drop', v:'More than 20 points', desc:'Email when any page drops more than this.' },
          ].map(f => (
            <div key={f.l} style={{ display:'grid', gridTemplateColumns:'180px 1fr auto', gap:24, alignItems:'center', padding:'18px 0', borderTop:'1px solid var(--limestone-extra-dark)' }}>
              <div style={{ fontFamily:'var(--font-heading)', fontSize:14, color:'var(--gloaming-dark)' }}>{f.l}</div>
              <div>
                <div style={{ fontSize:15, color:'var(--gloaming-dark)' }}>{f.v}</div>
                {f.desc && <div style={{ fontSize:13, color:'var(--gloaming-pale)', marginTop:2 }}>{f.desc}</div>}
              </div>
              <span style={{ color:'var(--gloaming-pale)', cursor:'pointer' }}>{I.edit()}</span>
            </div>
          ))}
        </main>
      </div>
      <AppFooter accent={accent}/>
    </div>
  );
}

// Avatar menu open – shows where Billing, Members, Account live
function AB_AvatarMenu({ accent }) {
  return (
    <div style={{ background:'var(--limestone)', minHeight:'100%', fontFamily:'var(--font-body)', color:'var(--gloaming)', fontSize:15 }}>
      <TopBarV2 accent={accent} mode="agency" current="Sands" avatarOpen={true}/>
      <div style={{ display:'grid', gridTemplateColumns:'260px 1fr' }}>
        <SettingsSideNav accent={accent} active="Overview"/>
        <main style={{ padding:'48px 56px 80px', opacity:0.35 }}>
          <h1 style={{ fontFamily:'var(--font-heading-display)', fontSize:52, fontWeight:400, color:'var(--gloaming-dark)', margin:0, lineHeight:1.05 }}>Overview</h1>
        </main>
      </div>
      <AppFooter accent={accent}/>
    </div>
  );
}

// Account settings page – the global realm
function AB_Account({ accent }) {
  const nav = [
    { group:'', items:['Profile'] },
    { group:'Organisation', items:['Members & teams','Billing & plan','Integrations'] },
    { group:'', items:['Notifications','Security'] },
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
                const isActive = item === 'Billing & plan';
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
        <main style={{ padding:'48px 56px 80px', maxWidth:820 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14, fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)' }}>
            <span>Account</span><span>·</span><span style={{ color:'var(--gloaming-dark)' }}>Billing & plan</span>
          </div>
          <h1 style={{ fontFamily:'var(--font-heading-display)', fontSize:52, fontWeight:400, color:'var(--gloaming-dark)', margin:'0 0 8px', lineHeight:1.05 }}>Billing & plan</h1>
          <p style={{ maxWidth:'56ch', fontSize:16, color:'var(--gloaming)', margin:'0 0 32px' }}>One plan covers every project in your account. Upgrade when you need more pages, members or projects.</p>

          <div style={{ border:`1.5px solid ${accent}`, borderRadius:12, padding:'28px 32px', background:'var(--limestone-pale)', marginBottom:24 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color: accent, marginBottom:6 }}>Current plan</div>
                <div style={{ fontFamily:'var(--font-heading-display)', fontSize:40, color:'var(--gloaming-dark)', lineHeight:1 }}>Agency</div>
                <div style={{ fontSize:14, color:'var(--gloaming-pale)', marginTop:6 }}>£249 / month · renews 3 June</div>
              </div>
              <Button accent={accent} kind="secondary">Change plan</Button>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginTop:24, paddingTop:24, borderTop:'1px solid var(--limestone-extra-dark)' }}>
              {[
                { l:'Projects', v:'5 / 10' },
                { l:'Pages across account', v:'7,069 / 25,000' },
                { l:'Members', v:'4 / unlimited' },
              ].map(s => (
                <div key={s.l}>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--gloaming-pale)', marginBottom:4 }}>{s.l}</div>
                  <div style={{ fontFamily:'var(--font-heading)', fontSize:16, color:'var(--gloaming-dark)' }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <h3 style={{ fontFamily:'var(--font-heading)', fontSize:18, fontWeight:400, color:'var(--gloaming-dark)', margin:'32px 0 12px' }}>Payment method</h3>
          <div style={{ background:'var(--limestone-pale)', borderRadius:8, padding:'16px 20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <div style={{ fontFamily:'var(--font-heading)', fontSize:15, color:'var(--gloaming-dark)' }}>Visa ending 4242</div>
              <div style={{ fontSize:13, color:'var(--gloaming-pale)' }}>Expires 08/2027</div>
            </div>
            <span style={{ color: accent, fontFamily:'var(--font-heading)', fontSize:14, cursor:'pointer' }}>Update</span>
          </div>
        </main>
      </div>
      <AppFooter accent={accent}/>
    </div>
  );
}

Object.assign(window, { SettingsSideNav, AB_ProjectSettings, AB_SwitcherOpen, AB_Anon, AB_Solo, AB_Schedule, AB_AvatarMenu, AB_Account });
