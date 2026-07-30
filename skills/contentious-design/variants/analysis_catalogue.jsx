// variants/analysis_catalogue.jsx  (v2 – corrected model)
// Analysis section redesign – Catalogue view + Run analysis flow
// Status model: unanalysed (no score) / analysed (has score + date)
// No staleness – scores are valid until content changes (change detection)
// Monthly schedule = check-all-for-changes run, auto or manual
// Paste URLs → Inventory (not here)

// ── Additional icons (AN prefix avoids collision with I / IV) ─────────────
const AN = {
  play: (p = {}) => <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" stroke="none" {...p}><polygon points="5 3 19 12 5 21 5 3" /></svg>,
  clock: (p = {}) => <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>,
  mail: (p = {}) => <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 8l10 6 10-6" /></svg>,
  ext: (p = {}) => <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 13v6a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>,
  spinner: (p = {}) => <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M21 12a9 9 0 11-6.219-8.56" /></svg>,
  chevDown: (p = {}) => <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9l6 6 6-6" /></svg>,
  info: (p = {}) => <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" /></svg>,
  sparkle: (p = {}) => <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
};

// ── Catalogue sample data ─────────────────────────────────────────────────
// 9 representative rows (68 total in Sands catalogue)
// 3 null = not yet analysed (represents 9 total unscored in real catalogue)
// 6 with dates = previously analysed
const CAT_ROWS = [
{ title: 'Baby loss support', url: '/support/baby-loss', section: 'Support', score: null, analysed: null },
{ title: 'Memorial events', url: '/events/memorial', section: 'Events', score: null, analysed: null },
{ title: 'Volunteer', url: '/volunteer', section: 'Get involved', score: null, analysed: null },
{ title: 'Neonatal death', url: '/support/neonatal-death', section: 'Support', score: 58, analysed: '18 Mar 2026' },
{ title: 'Annual Walk of Remembrance', url: '/events/walk', section: 'Events', score: 54, analysed: '18 Mar 2026' },
{ title: 'Stillbirth: what you need to know', url: '/support/stillbirth', section: 'Support', score: 61, analysed: '18 Apr 2026' },
{ title: 'Pregnancy loss', url: '/support/pregnancy-loss', section: 'Support', score: 74, analysed: '18 Apr 2026' },
{ title: 'Helpline', url: '/helpline', section: 'Support', score: 91, analysed: '18 Apr 2026' },
{ title: 'Our story', url: '/about/our-story', section: 'About', score: 85, analysed: '18 Apr 2026' }];


const RUN_HIST = [
{ date: '18 Apr 2026', pages: 12, succeeded: 12, failed: 0, note: 'New pages analysed', ago: '31 days ago', expanded: false },
{ date: '18 Mar 2026', pages: 59, succeeded: 55, failed: 4, note: 'Check for changes', ago: '62 days ago', expanded: true },
{ date: '18 Feb 2026', pages: 48, succeeded: 48, failed: 0, note: 'Check for changes', ago: '3 months ago', expanded: false },
{ date: '18 Jan 2026', pages: 48, succeeded: 48, failed: 0, note: 'Check for changes', ago: '4 months ago', expanded: false }];



// Status: simply whether a row has been analysed or not
function catStatus(row) {
  return row.analysed === null ? 'unanalysed' : 'analysed';
}

// Badges – only shown when action is needed
// 'analysed' rows show no badge; the date in Last analysed column is enough
const CAT_BADGE = {
  unanalysed: { label: 'Not yet analysed', bg: 'var(--limestone)', fg: 'var(--gloaming-pale)', bd: 'var(--limestone-extra-dark)' },
  changed: { label: 'Changed', bg: 'var(--sunshine-100)', fg: 'var(--sunshine-extra-dark)', bd: 'var(--sunshine-200)' },
  done: { label: 'Complete', bg: 'var(--sapling-100)', fg: 'var(--sapling-extra-dark)', bd: 'var(--sapling-200)' }
};

// ── Shared sub-components ─────────────────────────────────────────────────

function CatBadge({ status, accent }) {
  if (status === 'running') return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.04em', textTransform: 'uppercase', color: accent }}>
      {AN.spinner({ color: accent })} Analysing
    </span>);

  if (status === 'analysed') return null; // date in Last analysed column says it all
  const b = CAT_BADGE[status] || CAT_BADGE.unanalysed;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
      fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.04em', textTransform: 'uppercase',
      padding: '2px 7px', borderRadius: 3, background: b.bg, color: b.fg, border: `1px solid ${b.bd}`
    }}>{b.label}</span>);

}

function ScoreStat({ score }) {
  if (score === null) return <span style={{ color: 'var(--gloaming-pale)', fontFamily: 'var(--font-mono)', fontSize: 12 }}> – </span>;
  const c = score >= 80 ? 'var(--sapling-extra-dark)' : score >= 65 ? 'var(--sunshine-extra-dark)' : 'var(--fire-dark)';
  return <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: c }}>{score}</span>;
}

function SecTag({ section }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.04em', textTransform: 'uppercase',
      color: 'var(--gloaming-pale)', padding: '2px 6px', borderRadius: 2,
      background: 'var(--limestone)', border: '1px solid var(--limestone-extra-dark)'
    }}>{section}</span>);

}

const CAT_GRID = '24px 1fr 118px 126px 132px 52px 88px';

function CatHead() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: CAT_GRID, background: 'var(--limestone)', borderBottom: '1px solid var(--limestone-extra-dark)' }}>
      {['', 'Page', 'Section', 'Last analysed', 'Status', 'Score', ''].map((h, i) =>
      <div key={i} style={{
        padding: '8px 12px',
        paddingLeft: i === 0 ? 8 : i === 1 ? 4 : 12,
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase',
        color: 'var(--gloaming-pale)', textAlign: i === 5 ? 'right' : 'left'
      }}>{h}</div>
      )}
    </div>);

}

function CatRow({ row, accent, rowStatus }) {
  const status = rowStatus !== undefined ? rowStatus : catStatus(row);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: CAT_GRID, alignItems: 'center', borderBottom: '1px solid var(--limestone-extra-dark)' }}>
      <div style={{ padding: '11px 8px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 13, height: 13, borderRadius: 3, border: '1.5px solid var(--limestone-extra-dark)', background: 'var(--limestone)' }} />
      </div>
      <div style={{ padding: '11px 12px 11px 4px' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 13, color: 'var(--gloaming-dark)', marginBottom: 2, lineHeight: 1.3 }}>{row.title}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gloaming-pale)' }}>{row.url}</div>
      </div>
      <div style={{ padding: '11px 12px' }}><SecTag section={row.section} /></div>
      <div style={{ padding: '11px 12px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gloaming-pale)' }}>
          {row.analysed || ' – '}
        </span>
      </div>
      <div style={{ padding: '11px 12px' }}>
        <CatBadge status={status} accent={accent} />
      </div>
      <div style={{ padding: '11px 12px', textAlign: 'right' }}><ScoreStat score={row.score} /></div>
      <div style={{ padding: '11px 12px 11px 8px', display: 'flex', justifyContent: 'flex-end' }}>
        {row.score !== null && status !== 'running' &&
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: 12, color: accent, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}>
            Results {AN.ext()}
          </span>
        }
      </div>
    </div>);

}

function TableFooter({ shown = 9, total = 68 }) {
  return (
    <div style={{ padding: '10px 20px', background: 'var(--limestone)', borderTop: '1px solid var(--limestone-extra-dark)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gloaming-pale)' }}>
      <span>{`Showing ${shown} of ${total}`}</span>
      <span style={{ color: 'var(--gloaming)', cursor: 'pointer' }}>View all {total} →</span>
    </div>);

}

// ── Filter/sort toolbar ──────────────────────────────────────────────────
function CatFilterBar() {
  const FILTERS = [
  { label: 'Section', value: 'All' },
  { label: 'Status', value: 'All' },
  { label: 'Score', value: 'Any' }];

  return (
    <div style={{ padding: '10px 16px', background: 'var(--limestone)', borderBottom: '1px solid var(--limestone-extra-dark)', display: 'flex', alignItems: 'center', gap: 8 }}>
      {FILTERS.map((f) =>
      <button key={f.label} style={{
        display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 4,
        border: '1px solid var(--limestone-extra-dark)', background: 'var(--limestone-pale)',
        fontFamily: 'var(--font-heading)', fontSize: 12, color: 'var(--gloaming-dark)', cursor: 'pointer'
      }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--gloaming-pale)', marginRight: 1 }}>{f.label}</span>
          {f.value}
          {I.caret({ width: 10, height: 10 })}
        </button>
      )}
      <div style={{ width: 1, height: 16, background: 'var(--limestone-extra-dark)', margin: '0 4px' }} />
      <button style={{
        display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 4,
        border: '1px solid var(--limestone-extra-dark)', background: 'var(--limestone-pale)',
        fontFamily: 'var(--font-heading)', fontSize: 12, color: 'var(--gloaming-dark)', cursor: 'pointer'
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--gloaming-pale)', marginRight: 1 }}>Sort</span>
        Section
        {I.caret({ width: 10, height: 10 })}
      </button>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px', background: 'var(--limestone-pale)', border: '1px solid var(--limestone-extra-dark)', borderRadius: 4, cursor: 'pointer' }}>
        {I.search({ width: 12, height: 12 })}
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--gloaming-pale)' }}>Search pages…</span>
      </div>
    </div>);

}

// ── Pagination footer ─────────────────────────────────────────────────────
function CatPagination({ accent, current = 1, totalPages = 14, perPage = 50, totalRows = 682 }) {
  const pages = [1, 2, 3, '…', totalPages];
  return (
    <div style={{ padding: '10px 16px', background: 'var(--limestone)', borderTop: '1px solid var(--limestone-extra-dark)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gloaming-pale)' }}>
        Showing 1–50 of {totalRows.toLocaleString()} pages
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button style={{ padding: '5px 10px', borderRadius: 4, border: '1px solid var(--limestone-extra-dark)', background: 'var(--limestone-pale)', fontFamily: 'var(--font-heading)', fontSize: 12, color: 'var(--gloaming-pale)', cursor: 'not-allowed' }}>← Prev</button>
        {pages.map((p, i) =>
        <button key={i} style={{
          padding: '5px 10px', borderRadius: 4, border: '1px solid',
          borderColor: p === current ? accent : 'var(--limestone-extra-dark)',
          background: p === current ? accent : 'var(--limestone-pale)',
          color: p === current ? 'var(--limestone)' : p === '…' ? 'var(--gloaming-pale)' : 'var(--gloaming-dark)',
          fontFamily: 'var(--font-mono)', fontSize: 12,
          cursor: p === '…' ? 'default' : 'pointer', minWidth: 32
        }}>{p}</button>
        )}
        <button style={{ padding: '5px 10px', borderRadius: 4, border: '1px solid var(--limestone-extra-dark)', background: 'var(--limestone-pale)', fontFamily: 'var(--font-heading)', fontSize: 12, color: 'var(--gloaming-dark)', cursor: 'pointer' }}>Next →</button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gloaming-pale)' }}>Rows per page</span>
        <button style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', borderRadius: 3, border: '1px solid var(--limestone-extra-dark)', background: 'var(--limestone-pale)', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gloaming-dark)', cursor: 'pointer' }}>
          50 {I.caret({ width: 10, height: 10 })}
        </button>
      </div>
    </div>);

}

function AnalyseBtn({ accent, label = 'Analyse catalogue', disabled = false }) {
  return (
    <button style={{
      display: 'inline-flex', alignItems: 'center', gap: 7,
      padding: '10px 18px', borderRadius: 5, border: 'none',
      background: disabled ? 'var(--limestone-extra-dark)' : accent,
      color: disabled ? 'var(--gloaming-pale)' : 'var(--limestone)',
      fontFamily: 'var(--font-heading)', fontSize: 14,
      cursor: disabled ? 'not-allowed' : 'pointer', flexShrink: 0
    }}>
      {disabled ? AN.spinner({ color: 'var(--gloaming-pale)' }) : AN.play()}
      {label}
    </button>);

}

function ScheduleNote() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gloaming-pale)' }}>
      {AN.clock()} Monthly check for changes · next 15 Jun
    </div>);

}

// ── Artboard A: Sub-nav approach (Catalogue | Run history tabs) ───────────

function AB_SubNavCatalogue({ accent }) {
  const unscoredCount = CAT_ROWS.filter((r) => r.analysed === null).length; // 3 shown, 9 total
  return (
    <div style={{ background: 'var(--limestone)', fontSize: 14, fontFamily: 'var(--font-body)', minHeight: '100%' }}>
      <TopBarEstate accent={accent} activeNav="Analysis" />

      {/* Sub-nav */}
      <div style={{ borderBottom: '1px solid var(--limestone-extra-dark)', padding: '0 40px', display: 'flex', background: 'var(--limestone)' }}>
        {[{ label: 'Catalogue', badge: null, active: true }, { label: 'Run history', badge: '4', active: false }].map((t) =>
        <div key={t.label} style={{
          padding: '10px 18px 9px', display: 'flex', alignItems: 'center', gap: 6, marginBottom: -1,
          borderBottom: t.active ? `2px solid ${accent}` : '2px solid transparent',
          fontFamily: 'var(--font-heading)', fontSize: 14,
          color: t.active ? 'var(--gloaming-dark)' : 'var(--gloaming-pale)', cursor: 'pointer'
        }}>
            {t.label}
            {t.badge && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '1px 6px', borderRadius: 10, background: 'var(--limestone-extra-dark)', color: 'var(--gloaming-pale)' }}>{t.badge}</span>}
          </div>
        )}
      </div>

      {/* Page header */}
      <div style={{ padding: '28px 40px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--gloaming-pale)', marginBottom: 8 }}>Sands · Analysis</div>
          <h1 style={{ fontFamily: 'var(--font-heading-display)', fontSize: 40, fontWeight: 400, color: 'var(--gloaming-dark)', margin: '0 0 10px', lineHeight: 1.05 }}>Catalogue</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gloaming-pale)' }}>
            <span>68 pages monitored</span>
            <span>·</span>
            <span>9 not yet analysed</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, paddingTop: 4 }}>
          <AnalyseBtn accent={accent} label="Analyse 9 unscored pages" />
          <ScheduleNote />
        </div>
      </div>

      {/* Table */}
      <div style={{ margin: '0 40px', background: 'var(--limestone-pale)', border: '1px solid var(--limestone-extra-dark)', borderRadius: 8, overflow: 'hidden' }}>
        <CatHead />
        {CAT_ROWS.map((row, i) => <CatRow key={i} row={row} accent={accent} />)}
        <TableFooter />
      </div>
      <div style={{ height: 36 }} />
    </div>);

}

// ── Artboard B: Single-page (Analysis IS the catalogue, no sub-nav) ───────

function AB_SinglePage({ accent }) {
  return (
    <div style={{ background: 'var(--limestone)', fontSize: 14, fontFamily: 'var(--font-body)', minHeight: '100%' }}>
      <TopBarEstate accent={accent} activeNav="Analysis" />

      {/* Page header */}
      <div style={{ padding: '28px 40px 0', borderBottom: '1px solid var(--limestone-extra-dark)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: 20 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--gloaming-pale)', marginBottom: 8 }}>Sands</div>
            <h1 style={{ fontFamily: 'var(--font-heading-display)', fontSize: 40, fontWeight: 400, color: 'var(--gloaming-dark)', margin: '0 0 6px', lineHeight: 1.05 }}>Analysis</h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--gloaming)', margin: 0 }}>
              68 pages in your catalogue, assessed against the Content Quality Framework.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            <AnalyseBtn accent={accent} label="Analyse 9 unscored pages" />
            <ScheduleNote />
          </div>
        </div>

        {/* Status summary bar */}
        <div style={{ display: 'flex', alignItems: 'stretch', borderTop: '1px solid var(--limestone-extra-dark)' }}>
          {[
          { count: 9, label: 'Not yet analysed', color: 'var(--gloaming-pale)' },
          { count: 59, label: 'Analysed', color: 'var(--sapling-extra-dark)' }].
          map((s, i) =>
          <div key={s.label} style={{
            padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
            borderRight: i === 0 ? '1px solid var(--limestone-extra-dark)' : 'none'
          }}>
              <span style={{ fontFamily: 'var(--font-heading-display)', fontSize: 22, color: s.color, lineHeight: 1 }}>{s.count}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--gloaming-pale)' }}>{s.label}</span>
            </div>
          )}
          {/* Future: Changed count */}
          <div style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 8, opacity: 0.4 }}>
            <span style={{ fontFamily: 'var(--font-heading-display)', fontSize: 22, color: 'var(--sunshine-extra-dark)', lineHeight: 1 }}> – </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--gloaming-pale)' }}>
              Changed
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, marginLeft: 5, opacity: 0.6 }}>{AN.info()} coming soon</span>
            </span>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ padding: '0 4px', display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', background: 'var(--limestone-pale)', border: '1px solid var(--limestone-extra-dark)', borderRadius: 4, cursor: 'pointer' }}>
              {I.search({ width: 12, height: 12 })}
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--gloaming-pale)' }}>Filter</span>
            </div>
          </div>
        </div>
      </div>

      {/* Catalogue table */}
      <div style={{ margin: '20px 40px 0', background: 'var(--limestone-pale)', border: '1px solid var(--limestone-extra-dark)', borderRadius: 8, overflow: 'hidden' }}>
        <CatHead />
        {CAT_ROWS.map((row, i) => <CatRow key={i} row={row} accent={accent} />)}
        <TableFooter />
      </div>

      {/* Recent runs */}
      <div style={{ margin: '16px 40px 36px', background: 'var(--limestone-pale)', border: '1px solid var(--limestone-extra-dark)', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ padding: '11px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--limestone-extra-dark)', cursor: 'pointer' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 13, color: 'var(--gloaming-dark)' }}>Run history</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gloaming-pale)' }}>4 runs {AN.chevDown()}</span>
        </div>
        {RUN_HIST.map((r, i) =>
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '10px 16px', borderBottom: i < RUN_HIST.length - 1 ? '1px solid var(--limestone-extra-dark)' : 'none' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gloaming-dark)', minWidth: 108 }}>{r.date}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gloaming-pale)', minWidth: 90 }}>{r.pages} pages</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--gloaming-pale)' }}>{r.note}</span>
            <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gloaming-pale)' }}>{r.ago}</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 12, color: accent, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}>View results {AN.ext()}</span>
          </div>
        )}
      </div>
    </div>);

}

// ── Artboard C: Status-grouped (not-yet-analysed separated from analysed) ──
// Less alarming than v1's "urgency" framing – just a practical sort

const AN_NOTYET = CAT_ROWS.filter((r) => r.analysed === null);
const AN_SCORED = CAT_ROWS.filter((r) => r.analysed !== null);

function AB_StatusGrouped({ accent }) {
  return (
    <div style={{ background: 'var(--limestone)', fontSize: 14, fontFamily: 'var(--font-body)', minHeight: '100%' }}>
      <TopBarEstate accent={accent} activeNav="Analysis" />

      {/* Header */}
      <div style={{ padding: '28px 40px 26px', borderBottom: '1px solid var(--limestone-extra-dark)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--gloaming-pale)', marginBottom: 8 }}>Sands · Analysis</div>
            <h1 style={{ fontFamily: 'var(--font-heading-display)', fontSize: 40, fontWeight: 400, color: 'var(--gloaming-dark)', margin: '0 0 8px', lineHeight: 1.05 }}>
              9 pages not yet analysed
            </h1>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--gloaming)' }}>
              9 unscored · <span style={{ color: 'var(--gloaming-pale)' }}>59 analysed · 68 in catalogue</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, paddingTop: 4 }}>
            <AnalyseBtn accent={accent} label="Analyse 9 unscored pages" />
            <ScheduleNote />
          </div>
        </div>
      </div>

      {/* Not yet analysed group */}
      <div style={{ margin: '22px 40px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 500, color: 'var(--gloaming-dark)' }}>Not yet analysed</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '1px 7px', borderRadius: 10, background: 'var(--limestone-extra-dark)', color: 'var(--gloaming-pale)', border: '1px solid var(--limestone-extra-dark)' }}>9</span>
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gloaming-pale)' }}>showing {AN_NOTYET.length} of 9</span>
        </div>
        <div style={{ background: 'var(--limestone-pale)', border: '1px solid var(--limestone-extra-dark)', borderRadius: 8, overflow: 'hidden' }}>
          <CatHead />
          {AN_NOTYET.map((row, i) => <CatRow key={i} row={row} accent={accent} />)}
          {AN_NOTYET.length < 9 &&
          <div style={{ padding: '10px 16px', background: 'var(--limestone)', borderTop: '1px solid var(--limestone-extra-dark)', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gloaming-pale)' }}>
              + {9 - AN_NOTYET.length} more · <span style={{ color: accent, cursor: 'pointer' }}>View all 9</span>
            </div>
          }
        </div>
      </div>

      {/* Analysed group */}
      <div style={{ margin: '20px 40px 36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 500, color: 'var(--gloaming)' }}>Analysed</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '1px 7px', borderRadius: 10, background: 'var(--sapling-100)', color: 'var(--sapling-extra-dark)', border: '1px solid var(--sapling-200)' }}>59</span>
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-heading)', fontSize: 12, color: accent, cursor: 'pointer' }}>Show all</span>
        </div>
        <div style={{ background: 'var(--limestone-pale)', border: '1px solid var(--limestone-extra-dark)', borderRadius: 8, overflow: 'hidden' }}>
          <CatHead />
          {AN_SCORED.slice(0, 4).map((row, i) => <CatRow key={i} row={row} accent={accent} />)}
          <div style={{ padding: '10px 16px', background: 'var(--limestone)', borderTop: '1px solid var(--limestone-extra-dark)', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gloaming-pale)' }}>
            + {59 - AN_SCORED.slice(0, 4).length} more
          </div>
        </div>
      </div>
    </div>);

}

// ── Artboard C2: Flat catalogue – single table, E layout, proper h2

function AB_RefinedC({ accent }) {
  const allRows = [...AN_NOTYET, ...AN_SCORED];
  return (
    <div style={{ background: 'var(--limestone)', fontSize: 14, fontFamily: 'var(--font-body)', minHeight: '100%' }}>
      <TopBarEstate accent={accent} activeNav="Analysis" />

      {/* Page header */}
      <div style={{ padding: '28px 40px 0', borderBottom: '1px solid var(--limestone-extra-dark)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: 20 }}>
          <h1 style={{ fontFamily: 'var(--font-heading-display)', fontSize: 40, fontWeight: 400, color: 'var(--gloaming-dark)', margin: 0, lineHeight: 1.05 }}>Analysis</h1>
          <AnalyseBtn accent={accent} label="Analyse" />
        </div>

        {/* Stats bar */}
        <div style={{ display: 'flex', alignItems: 'stretch', borderTop: '1px solid var(--limestone-extra-dark)' }}>
          {[
          { count: '68', label: 'In catalogue', color: 'var(--gloaming-dark)' },
          { count: '9', label: 'Not yet analysed', color: 'var(--gloaming-pale)' },
          { count: '59', label: 'Analysed', color: 'var(--sapling-extra-dark)' },
          { count: '12', label: 'This month', color: 'var(--gloaming-dark)' },
          { count: '11,988', label: 'Remaining', color: 'var(--gloaming-dark)' }].
          map((s, i) =>
          <div key={s.label} style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 8, borderRight: '1px solid var(--limestone-extra-dark)', cursor: 'pointer' }}>
              <span style={{ fontFamily: 'var(--font-heading-display)', fontSize: 22, color: s.color, lineHeight: 1 }}>{s.count}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--gloaming-pale)' }}>{s.label}</span>
            </div>
          )}
          <div style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', flex: 1 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gloaming-pale)' }}>
              {AN.clock()} Next monthly check 15 Jun
            </span>
          </div>
        </div>
      </div>

      {/* Full catalogue table – unanalysed first, then analysed */}
      <div style={{ margin: '20px 40px 0', background: 'var(--limestone-pale)', border: '1px solid var(--limestone-extra-dark)', borderRadius: 8, overflow: 'hidden' }}>
        <CatFilterBar />
        <CatHead />
        {allRows.map((row, i) => <CatRow key={i} row={row} accent={accent} />)}
        <CatPagination accent={accent} totalRows={682} />
      </div>

      {/* Previous analyses */}
      <div style={{ margin: '36px 40px 40px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading-display)', fontSize: 26, fontWeight: 400, color: 'var(--gloaming-dark)', margin: '0 0 14px' }}>Previous analyses</h2>
        <div style={{ background: 'var(--limestone-pale)', border: '1px solid var(--limestone-extra-dark)', borderRadius: 8, overflow: 'hidden' }}>
          {RUN_HIST.map((r, i) =>
          <div key={i} style={{ borderBottom: i < RUN_HIST.length - 1 ? '1px solid var(--limestone-extra-dark)' : 'none' }}>
              {/* Row header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', cursor: 'pointer' }}>
                <span style={{ color: 'var(--gloaming-pale)', display: 'inline-flex', transform: r.expanded ? 'none' : 'rotate(-90deg)', flexShrink: 0 }}>
                  {AN.chevDown({ width: 13, height: 13 })}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gloaming-dark)', minWidth: 110 }}>{r.date}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gloaming-pale)', minWidth: 62 }}>{r.pages} URLs</span>
                <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.04em', textTransform: 'uppercase',
                padding: '2px 7px', borderRadius: 3,
                background: r.failed > 0 ? 'var(--fire-100)' : 'var(--sapling-100)',
                color: r.failed > 0 ? 'var(--fire-dark)' : 'var(--sapling-extra-dark)',
                border: `1px solid ${r.failed > 0 ? 'var(--fire-200)' : 'var(--sapling-200)'}`
              }}>
                  {r.failed > 0 ? `${r.failed} failed` : 'Complete'}
                </span>
                <span style={{ flex: 1 }} />
                {!r.expanded &&
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 12, color: 'var(--gloaming)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}>
                    View results {AN.ext()}
                  </span>
              }
                <span style={{ color: 'var(--gloaming-pale)', cursor: 'pointer', padding: '2px 4px', marginLeft: 8 }}>
                  {I.trash({ width: 13, height: 13 })}
                </span>
              </div>
              {/* Expanded detail */}
              {r.expanded &&
            <div style={{ padding: '4px 16px 18px 42px', borderTop: '1px solid var(--limestone-extra-dark)', background: 'var(--limestone)' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--gloaming)', margin: '14px 0 14px' }}>
                    Done. {r.succeeded} of {r.pages} pages analysed successfully. {r.failed} failed.
                  </p>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 18px', borderRadius: 5, border: 'none', background: 'var(--gloaming-dark)', color: 'var(--limestone)', fontFamily: 'var(--font-heading)', fontSize: 14, cursor: 'pointer' }}>
                      View results {AN.ext()}
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 18px', borderRadius: 5, border: 'none', background: 'var(--fire-dark)', color: 'var(--limestone)', fontFamily: 'var(--font-heading)', fontSize: 14, cursor: 'pointer' }}>
                      View failed URLs
                    </button>
                  </div>
                </div>
            }
            </div>
          )}
        </div>
      </div>
    </div>);

}

// ── Artboard D: Run trigger modal – dynamic options ───────────────────────
// Default: analyse 9 unscored pages (AI only, no Firecrawl)
// Option 2: check all 68 for changes (Firecrawl + AI for changed pages)

function AB_RunTrigger({ accent }) {
  return (
    <div style={{ background: 'var(--limestone)', fontSize: 14, fontFamily: 'var(--font-body)', position: 'relative', overflow: 'hidden' }}>
      {/* Dimmed background */}
      <div style={{ opacity: 0.3, pointerEvents: 'none', userSelect: 'none' }}>
        <TopBarEstate accent={accent} activeNav="Analysis" />
        <div style={{ padding: '28px 40px 0', borderBottom: '1px solid var(--limestone-extra-dark)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: 20 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--gloaming-pale)', marginBottom: 8 }}>Sands</div>
              <h1 style={{ fontFamily: 'var(--font-heading-display)', fontSize: 40, fontWeight: 400, color: 'var(--gloaming-dark)', margin: 0 }}>Analysis</h1>
            </div>
            <AnalyseBtn accent={accent} label="Analyse 9 unscored pages" />
          </div>
          <div style={{ height: 44, borderTop: '1px solid var(--limestone-extra-dark)' }} />
        </div>
        <div style={{ margin: '20px 40px 0', background: 'var(--limestone-pale)', border: '1px solid var(--limestone-extra-dark)', borderRadius: 8, overflow: 'hidden' }}>
          <CatHead />
          {CAT_ROWS.slice(0, 5).map((row, i) => <CatRow key={i} row={row} accent={accent} />)}
        </div>
      </div>

      {/* Scrim */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,25,24,0.28)', zIndex: 5 }} />

      {/* Modal */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 530, background: 'var(--limestone-pale)',
        borderRadius: 12, border: '1px solid var(--limestone-extra-dark)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.18)', zIndex: 10, overflow: 'hidden'
      }}>
        <div style={{ padding: '22px 28px 18px', borderBottom: '1px solid var(--limestone-extra-dark)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--gloaming-pale)', marginBottom: 6 }}>Sands · Analysis</div>
          <div style={{ fontFamily: 'var(--font-heading-display)', fontSize: 26, color: 'var(--gloaming-dark)', fontWeight: 400 }}>Analyse content</div>
        </div>

        <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--limestone-extra-dark)' }}>
          {/* Two options */}
          <div style={{ background: 'var(--limestone)', border: '1px solid var(--limestone-extra-dark)', borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>

            {/* Option 1: unscored only – default */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '16px 18px', borderBottom: '1px solid var(--limestone-extra-dark)', background: `${accent}0c` }}>
              <div style={{ width: 17, height: 17, borderRadius: '50%', marginTop: 2, flexShrink: 0, border: `4.5px solid ${accent}` }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: 14, color: 'var(--gloaming-dark)' }}>Analyse new pages.</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '1px 6px', borderRadius: 3, background: 'var(--sapling-100)', color: 'var(--sapling-extra-dark)', border: '1px solid var(--sapling-200)' }}>default</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--gloaming)', lineHeight: 1.5, marginBottom: 10 }}></div>
                <div style={{ display: 'flex', gap: 20 }}>
                  {[{ val: '9', lbl: 'Pages' }, { val: '~5 min', lbl: 'Est. time' }].map((s) =>
                  <div key={s.lbl}>
                      <div style={{ fontFamily: 'var(--font-heading-display)', fontSize: 20, color: 'var(--gloaming-dark)', lineHeight: 1 }}>{s.val}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--gloaming-pale)', marginTop: 2 }}>{s.lbl}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Option 2: all pages */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '16px 18px' }}>
              <div style={{ width: 17, height: 17, borderRadius: '50%', marginTop: 2, flexShrink: 0, border: '2px solid var(--limestone-extra-dark)', background: 'transparent' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 14, color: 'var(--gloaming-dark)', marginBottom: 4 }}>Analyse new and updated pages.</div>
                <div style={{ fontSize: 13, color: 'var(--gloaming)', lineHeight: 1.5, marginBottom: 10 }}></div>
                <div style={{ display: 'flex', gap: 20 }}>
                  {[{ val: '~68', lbl: 'Pages' }, { val: '~40 min', lbl: 'Est. time' }].map((s) =>
                  <div key={s.lbl}>
                      <div style={{ fontFamily: 'var(--font-heading-display)', fontSize: 20, color: 'var(--gloaming-dark)', lineHeight: 1 }}>{s.val}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--gloaming-pale)', marginTop: 2 }}>{s.lbl}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Email note */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--gloaming-pale)' }}>
            {AN.mail()} You’ll get an email when it’s done.
          </div>
        </div>

        <div style={{ padding: '14px 28px', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button style={{ padding: '9px 18px', borderRadius: 5, border: '1.5px solid var(--limestone-extra-dark)', background: 'transparent', fontFamily: 'var(--font-heading)', fontSize: 13, color: 'var(--gloaming-dark)', cursor: 'pointer' }}>
            Cancel
          </button>
          <AnalyseBtn accent={accent} label="Start analysis" />
        </div>
      </div>
    </div>);

}

// ── Artboard E: In-progress – pipeline view matching current product ────────

function AB_InProgress({ accent }) {
  // Showing a "check all for changes" run on 68 pages at mid-progress
  const TOTAL = 68;
  const PIPELINE = [
  { label: 'Queued', done: 68, color: 'var(--fire-400)' },
  { label: 'Fetched', done: 52, color: 'var(--sunshine-500)' },
  { label: 'Analysed', done: 32, color: 'var(--olive-500)' },
  { label: 'Completed', done: 28, color: 'var(--sapling-500)' },
  { label: 'Failed', done: 2, color: 'var(--fire-700)' }];


  // Pre-compute row statuses for table
  let nullIdx = 0;
  const rowStatuses = CAT_ROWS.map((row) => {
    if (row.analysed !== null) return 'analysed';
    const s = nullIdx < 1 ? 'done' : nullIdx < 3 ? 'running' : 'unanalysed';
    nullIdx++;
    return s;
  });

  return (
    <div style={{ background: 'var(--limestone)', fontSize: 14, fontFamily: 'var(--font-body)', minHeight: '100%' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-bar { 0%,100%{opacity:1} 50%{opacity:.65} }
        .pipeline-active { animation: pulse-bar 1.6s ease-in-out infinite; }
      ` }} />
      <TopBarEstate accent={accent} activeNav="Analysis" />

      {/* Page header */}
      <div style={{ padding: '28px 40px 0', borderBottom: '1px solid var(--limestone-extra-dark)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: 20 }}>
          <h1 style={{ fontFamily: 'var(--font-heading-display)', fontSize: 40, fontWeight: 400, color: 'var(--gloaming-dark)', margin: 0, lineHeight: 1.05 }}>Analysis</h1>
          <AnalyseBtn accent={accent} label="Running…" disabled />
        </div>
        {/* Stats bar – same as normal view */}
        <div style={{ display: 'flex', alignItems: 'stretch', borderTop: '1px solid var(--limestone-extra-dark)' }}>
          {[
          { count: '68', label: 'In catalogue', color: 'var(--gloaming-dark)' },
          { count: '9', label: 'Not yet analysed', color: 'var(--gloaming-pale)' },
          { count: '59', label: 'Analysed', color: 'var(--sapling-extra-dark)' },
          { count: '12', label: 'This month', color: 'var(--gloaming-dark)' },
          { count: '11,988', label: 'Remaining', color: 'var(--gloaming-dark)' }].
          map((s, i) =>
          <div key={s.label} style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 8, borderRight: '1px solid var(--limestone-extra-dark)', cursor: 'pointer' }}>
              <span style={{ fontFamily: 'var(--font-heading-display)', fontSize: 22, color: s.color, lineHeight: 1 }}>{s.count}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--gloaming-pale)' }}>{s.label}</span>
            </div>
          )}
          <div style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', flex: 1 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gloaming-pale)' }}>
              {AN.clock()} Next monthly check 15 Jun
            </span>
          </div>
        </div>
      </div>

      {/* Pipeline progress card */}
      <div style={{ margin: '20px 40px 0', background: 'var(--limestone-pale)', border: '1px solid var(--limestone-extra-dark)', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px 12px', borderBottom: '1px solid var(--limestone-extra-dark)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-heading)', fontSize: 14, color: 'var(--gloaming-dark)' }}>
            {AN.spinner({ color: accent })} Checking 68 pages for changes
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gloaming-pale)' }}>
            {AN.mail()} Email on completion
          </span>
        </div>
        <div style={{ padding: '16px 20px 14px' }}>
          {PIPELINE.map((stage) => {
            const pct = Math.round(stage.done / TOTAL * 100);
            const isActive = stage.done > 0 && stage.done < TOTAL;
            return (
              <div key={stage.label} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 52px', gap: 14, alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--gloaming)' }}>{stage.label}</span>
                <div style={{ height: 14, background: 'var(--limestone-extra-dark)', borderRadius: 3, overflow: 'hidden' }}>
                  <div
                    className={isActive ? 'pipeline-active' : ''}
                    style={{ height: '100%', width: `${pct}%`, background: stage.color, borderRadius: 3 }} />
                  
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gloaming-pale)', textAlign: 'right' }}>{stage.done}/{TOTAL}</span>
              </div>);

          })}
        </div>
      </div>

      {/* Catalogue table – rows reflect live status */}
      <div style={{ margin: '16px 40px 36px', background: 'var(--limestone-pale)', border: '1px solid var(--limestone-extra-dark)', borderRadius: 8, overflow: 'hidden' }}>
        <CatHead />
        {CAT_ROWS.map((row, i) =>
        <CatRow key={i} row={row} accent={accent} rowStatus={rowStatuses[i]} />
        )}
        <TableFooter shown={CAT_ROWS.length} total={68} />
      </div>
    </div>);

}