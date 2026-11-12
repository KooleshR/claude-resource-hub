import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import type Fuse from 'fuse.js';
import { SYNONYMS, STOP_WORDS } from '../data/synonyms';

gsap.registerPlugin(ScrollTrigger);

const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));

/* ---------------- smooth scroll: one clock (GSAP ticker drives Lenis) ---------------- */
let lenis: Lenis | null = null;
const raf = (t: number) => lenis?.raf(t * 1000);
function startLenis() {
  if (reduce() || lenis) return;
  lenis = new Lenis({ lerp: 0.12, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
}
function stopLenis() {
  if (!lenis) return;
  gsap.ticker.remove(raf);
  lenis.destroy();
  lenis = null;
}

/* ---------------- loader: first visit only ---------------- */
function runLoader(): Promise<void> {
  const root = document.documentElement;
  if (!root.classList.contains('loading')) return Promise.resolve();
  const el = $('.loader');
  const num = $('[data-loader-num]');
  const bar = $('[data-loader-bar]');
  const total = Number(el?.dataset.count ?? 0);
  try { sessionStorage.setItem('seen', '1'); } catch {}
  return new Promise((done) => {
    const state = { n: 0 };
    gsap.timeline({ onComplete: () => { root.classList.remove('loading'); done(); } })
      .to(state, { n: total, duration: 1.1, ease: 'power2.inOut', onUpdate: () => { if (num) num.textContent = String(Math.round(state.n)); } }, 0)
      .to(bar, { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, 0)
      .to(el, { clipPath: 'inset(0 0 100% 0)', duration: 0.6, ease: 'expo.inOut' }, '+=0.15');
  });
}

/* ---------------- scroll reveals ---------------- */
function reveals() {
  const items = $$('[data-reveal]');
  if (reduce()) { gsap.set(items, { opacity: 1, y: 0 }); return; }
  ScrollTrigger.batch(items, {
    start: 'top 92%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', stagger: 0.06, overwrite: true }),
  });
  // Hero lines: rise in from a mask.
  const lines = $$('[data-hero-line] > span');
  if (lines.length) gsap.from(lines, { yPercent: 110, duration: 1, ease: 'expo.out', stagger: 0.08, delay: 0.05 });
}

/* ---------------- theme ---------------- */
function theme() {
  $('[data-theme-toggle]')?.addEventListener('click', () => {
    const root = document.documentElement;
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch {}
  });
}

/* ---------------- mobile menu ---------------- */
function menu() {
  const btn = $('[data-menu]');
  const nav = $('#site-nav');
  btn?.addEventListener('click', () => {
    const open = nav?.dataset.open !== 'true';
    if (nav) nav.dataset.open = String(open);
    btn.setAttribute('aria-expanded', String(open));
  });
}

/* ---------------- copy buttons + shell tabs ---------------- */
function getShell() { try { return localStorage.getItem('shell') ?? 'powershell'; } catch { return 'powershell'; } }
function setShell(shell: string) {
  try { localStorage.setItem('shell', shell); } catch {}
  $$('[data-shell-tabs]').forEach((box) => {
    $$<HTMLButtonElement>('[data-shell]', box).forEach((b) => {
      const on = b.dataset.shell === shell;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
    });
    $$('[data-shell-panel]', box).forEach((p) => { p.hidden = p.dataset.shellPanel !== shell; });
  });
}
function code() {
  $$<HTMLButtonElement>('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
    const text = b.parentElement?.querySelector('pre')?.innerText ?? '';
    try { await navigator.clipboard.writeText(text.trim()); b.textContent = 'Copied'; b.dataset.done = 'true'; }
    catch { b.textContent = 'Select and copy'; }
    setTimeout(() => { b.textContent = 'Copy'; b.dataset.done = 'false'; }, 1600);
  }));
  if ($('[data-shell-tabs]')) setShell(getShell());
  $$('[data-shell-tabs]').forEach((box) => {
    const tabs = $$<HTMLButtonElement>('[data-shell]', box);
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => setShell(t.dataset.shell!));
      t.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
        setShell(next.dataset.shell!); next.focus();
      });
    });
  });
}

/* ---------------- session step bar ---------------- */
function session() {
  const root = $('[data-session]');
  if (!root) return;
  const steps = $$<HTMLButtonElement>('[data-step]', root);
  const fill = $('[data-session-fill]', root);
  const select = (btn: HTMLButtonElement, focus = false) => {
    const i = Number(btn.dataset.i);
    steps.forEach((s) => {
      const on = s === btn;
      s.setAttribute('aria-selected', String(on));
      s.tabIndex = on ? 0 : -1;
      s.dataset.passed = String(Number(s.dataset.i) < i);
    });
    if (fill) fill.style.transform = `scaleX(${i / (steps.length - 1)})`;
    $$('[data-panel]', root).forEach((p) => {
      const show = p.dataset.panel === btn.dataset.step;
      if (show && p.hidden) {
        p.hidden = false;
        if (!reduce()) {
          gsap.fromTo($$('.session-copy, li', p), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out', stagger: 0.04, overwrite: true });
        }
      } else if (!show) p.hidden = true;
    });
    if (focus) btn.focus();
  };
  steps.forEach((s, i) => {
    s.addEventListener('click', () => select(s));
    s.addEventListener('keydown', (e) => {
      const map: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, Home: -i, End: steps.length - 1 - i };
      if (!(e.key in map)) return;
      e.preventDefault();
      select(steps[(i + map[e.key] + steps.length) % steps.length], true);
    });
  });
  const current = steps.find((s) => s.getAttribute('aria-selected') === 'true') ?? steps[0];
  if (reduce()) { select(current); return; }
  // Signature: the session runs once when the bar scrolls into view, then stops on PreToolUse.
  ScrollTrigger.create({
    trigger: root, start: 'top 70%', once: true,
    onEnter: () => {
      const target = Number(current.dataset.i);
      let k = 0;
      const tick = () => { select(steps[k]); if (k++ < target) setTimeout(tick, 140); };
      tick();
    },
  });
}

/* ---------------- resource filters ---------------- */
function filters() {
  const form = $<HTMLFormElement>('[data-filters]');
  if (!form) return;
  const cards = $$('[data-card-list] .card');
  const count = $('[data-filter-count]');
  const empty = $('[data-filter-empty]');
  const params = new URLSearchParams(location.search);
  for (const key of ['type', 'stack', 'origin']) {
    const v = params.get(key);
    const input = v && form.querySelector<HTMLInputElement>(`input[name="${key}"][value="${v}"]`);
    if (input) input.checked = true;
  }
  const apply = (animate: boolean) => {
    const fd = new FormData(form);
    const type = String(fd.get('type') ?? ''), stack = String(fd.get('stack') ?? ''), origin = String(fd.get('origin') ?? '');
    const shown: HTMLElement[] = [];
    cards.forEach((c) => {
      const ok = (!type || c.dataset.type === type)
        && (!stack || c.dataset.stacks!.split(' ').some((s) => s === stack || s === 'all'))
        && (!origin || c.dataset.origin === origin);
      c.hidden = !ok;
      if (ok) shown.push(c);
    });
    if (count) count.textContent = `${shown.length} ${shown.length === 1 ? 'resource' : 'resources'}`;
    if (empty) empty.hidden = shown.length > 0;
    const q = new URLSearchParams();
    if (type) q.set('type', type); if (stack) q.set('stack', stack); if (origin) q.set('origin', origin);
    history.replaceState(history.state, '', `${location.pathname}${q.size ? `?${q}` : ''}`);
    if (animate && !reduce()) gsap.fromTo(shown, { opacity: 0, y: 10, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'expo.out', stagger: 0.025, overwrite: true });
    else gsap.set(shown, { opacity: 1, y: 0 });
    ScrollTrigger.refresh();
  };
  form.addEventListener('change', () => apply(true));
  form.addEventListener('reset', () => setTimeout(() => apply(true)));
  apply(false);
}

/* ---------------- drawn terminals: type the commands, then show the replies ---------------- */
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
function terminals() {
  $$('[data-term]').forEach((term) => {
    if (term.dataset.played || reduce()) return;
    term.dataset.played = '1';
    term.classList.add('pending');
    const lines = $$('.tl', term);
    const play = async () => {
      lines.forEach((l) => { l.style.visibility = 'hidden'; });
      term.classList.remove('pending');
      for (const l of lines) {
        l.style.visibility = 'visible';
        const x = $('.x', l);
        if (x && (l.classList.contains('cmd') || l.classList.contains('sh'))) {
          const full = x.textContent ?? '';
          l.classList.add('typing');
          for (let i = 1; i <= full.length; i++) { x.textContent = full.slice(0, i); await wait(14 + Math.random() * 26); }
          l.classList.remove('typing');
          await wait(380);
        } else {
          gsap.from(l, { opacity: 0, y: 4, duration: 0.3, ease: 'power2.out' });
          await wait(l.classList.contains('gap') ? 40 : 120);
        }
      }
    };
    ScrollTrigger.create({ trigger: term, start: 'top 85%', once: true, onEnter: () => { play(); } });
  });
}

/* ---------------- search (Ctrl+K and /) ---------------- */
type Doc = { id: string; title: string; type: string; typeLabel: string; summary: string; stacks: string; body: string; url: string };
let fuse: Fuse<Doc> | null = null;
let docs: Doc[] = [];
let loading: Promise<void> | null = null;
async function loadIndex(dialog: HTMLElement) {
  if (fuse) return;
  loading ??= (async () => {
    const [{ default: FuseCtor }, res] = await Promise.all([import('fuse.js'), fetch(dialog.dataset.index!)]);
    docs = await res.json();
    fuse = new FuseCtor(docs, {
      keys: [{ name: 'title', weight: 3 }, { name: 'typeLabel', weight: 1.5 }, { name: 'summary', weight: 1.5 }, { name: 'stacks', weight: 1 }, { name: 'body', weight: 0.5 }],
      threshold: 0.36, ignoreLocation: true, minMatchCharLength: 2, includeScore: true,
    });
  })();
  await loading;
}

// Search the whole query, then each meaningful word and its synonyms, and add up the scores.
// "I want to review my code for bugs" -> review, code, bugs + reviewer, diagnosing, debugging...
function smartSearch(q: string, limit = 12): Doc[] {
  const scores = new Map<Doc, number>();
  const add = (term: string, weight: number) => {
    for (const r of fuse!.search(term, { limit: 30 })) {
      scores.set(r.item, (scores.get(r.item) ?? 0) + weight * (1 - (r.score ?? 0.5)));
    }
  };
  add(q, 3);
  const words = q.toLowerCase().split(/[^a-z0-9.+#-]+/).filter((w) => w.length > 1 && !STOP_WORDS.has(w));
  if (words.length > 1 || (words.length === 1 && words[0] !== q.toLowerCase())) words.forEach((w) => add(w, 1.2));
  const extra = new Set<string>();
  for (const w of words) for (const s of SYNONYMS[w] ?? []) if (!words.includes(s)) extra.add(s);
  extra.forEach((s) => add(s, 0.7));
  return [...scores.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([d]) => d);
}

// "Ask Claude": copy a prompt with the question + this site's catalogue, then open claude.ai.
// The prompt goes on the clipboard, never in the URL.
function askPrompt(q: string) {
  const site = location.origin;
  const lines = docs.map((d) => `- ${d.title} [${d.typeLabel}] ${d.summary} (${site}${d.url})`).join('\n');
  return `I use Claude Code. Using only the resources in the catalogue below, recommend the 1-3 that best fit my need, say why, and give the first step for each. If nothing fits, say so.\n\nMy need: ${q || '(describe what you want to do)'}\n\nCatalogue (Claude Resource Hub):\n${lines}`;
}
async function askClaude(q: string, btn: HTMLElement) {
  const text = askPrompt(q);
  let ok = false;
  try { await navigator.clipboard.writeText(text); ok = true; } catch { /* clipboard blocked */ }
  const was = btn.textContent;
  btn.textContent = ok ? 'Copied. Paste it in Claude' : 'Copy failed';
  setTimeout(() => { btn.textContent = was; }, 2600);
  if (ok) window.open('https://claude.ai/new', '_blank', 'noopener');
}
const escapeHtml = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

function searchSetup() {
  const dialog = $<HTMLDialogElement>('#search');
  if (!dialog || dialog.dataset.ready) return;
  dialog.dataset.ready = '1';
  const input = $<HTMLInputElement>('#search-q', dialog)!;
  const list = $('#search-results', dialog)!;
  const counter = $('.search-count', dialog)!;
  let active = 0;
  let results: Doc[] = [];

  const render = () => {
    const q = input.value.trim();
    results = q ? smartSearch(q) : docs.filter((d) => (d as any).featured).slice(0, 8);
    active = 0;
    list.innerHTML = results.length
      ? results.map((d, i) => `<li role="option" id="sr-${i}" aria-selected="${i === 0}"><a href="${d.url}" tabindex="-1"><span class="k">${escapeHtml(d.typeLabel)}</span><span class="t">${escapeHtml(d.title)}</span><span class="s">${escapeHtml(d.summary)}</span></a></li>`).join('')
      : `<li class="empty">Nothing for “${escapeHtml(q)}”. Try a type (hook, agent) or a stack (spring, react), or <button type="button" class="ask-claude" data-ask-claude>Ask Claude ↗</button></li>`;
    counter.textContent = q ? `${results.length} found` : 'Featured';
    input.setAttribute('aria-activedescendant', results.length ? 'sr-0' : '');
  };
  const move = (d: number) => {
    if (!results.length) return;
    active = (active + d + results.length) % results.length;
    $$('li[role="option"]', list).forEach((li, i) => li.setAttribute('aria-selected', String(i === active)));
    input.setAttribute('aria-activedescendant', `sr-${active}`);
    $(`#sr-${active}`, list)?.scrollIntoView({ block: 'nearest' });
  };
  const open = async () => {
    if (dialog.open) return;
    dialog.showModal();
    lenis?.stop();
    input.value = '';
    list.innerHTML = '<li class="empty">Loading…</li>';
    await loadIndex(dialog);
    render();
  };
  const close = () => { if (dialog.open) dialog.close(); };

  dialog.addEventListener('close', () => lenis?.start());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) close(); });
  input.addEventListener('input', () => fuse && render());
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key === 'Enter' && results[active]) { e.preventDefault(); close(); navigateTo(results[active].url); }
  });
  list.addEventListener('click', (e) => { if ((e.target as Element).closest('a')) close(); });
  dialog.addEventListener('click', (e) => {
    const b = (e.target as Element).closest<HTMLElement>('[data-ask-claude]');
    if (b) askClaude(input.value.trim(), b);
  });

  document.addEventListener('keydown', (e) => {
    const t = e.target as HTMLElement;
    const typing = t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName);
    if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !typing)) { e.preventDefault(); open(); }
  });
  document.addEventListener('click', (e) => { if ((e.target as Element).closest('[data-open-search]')) open(); });
  document.addEventListener('submit', (e) => {
    const f = (e.target as Element).closest('[data-hero-search]');
    if (!f) return;
    e.preventDefault();
    const q = (f.querySelector('input') as HTMLInputElement).value;
    open().then(() => { input.value = q; render(); });
  });
}
let navigateTo = (u: string) => { location.href = u; };
import('astro:transitions/client').then((m) => { navigateTo = (u) => m.navigate(u); });

/* ---------------- lifecycle with the Astro router ---------------- */
document.addEventListener('astro:page-load', async () => {
  theme(); menu(); code(); filters(); searchSetup();
  await runLoader();
  startLenis();
  reveals();
  terminals();
  session();
});
document.addEventListener('astro:before-swap', () => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  stopLenis();
});
