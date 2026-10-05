export interface Theme {
  bg: string;
  surface: string;
  ink: string;
  muted: string;
  line: string;
  accent: string;
  accentInk: string;
  dark: string;
  darkInk: string;
  radius: string;
  display: string;
  body: string;
  fontHref: string;
}

export interface Page {
  id: string;
  label: string;
  html: string;
}

export interface SiteSpec {
  title: string;
  tagline: string;
  theme: Theme;
  pages: Page[];
  cta: {label: string;page: string;};
  css?: string;
}

const BASE_CSS = `    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: var(--body); background: var(--bg); color: var(--ink);
      line-height: 1.6; -webkit-font-smoothing: antialiased;
    }
    img { display: block; max-width: 100%; }
    a { color: inherit; text-decoration: none; }
    button { font: inherit; cursor: pointer; }
    .wrap { width: 100%; max-width: 1180px; margin: 0 auto; padding: 0 28px; }

    /* Header */
    .site-header { position: sticky; top: 0; z-index: 20; background: var(--bg); border-bottom: 1px solid var(--line); }
    .site-header .wrap { display: flex; align-items: center; gap: 32px; height: 72px; }
    .brand { font-family: var(--display); font-size: 21px; font-weight: 700; letter-spacing: -0.02em; white-space: nowrap; }
    .site-nav { display: flex; gap: 6px; margin-left: auto; }
    .site-nav a { padding: 8px 14px; border-radius: 999px; font-size: 14.5px; color: var(--muted); white-space: nowrap;
      transition: color 150ms ease-out, background-color 150ms ease-out; }
    .site-nav a:hover { color: var(--ink); }
    .site-nav a.active { color: var(--ink); background: var(--surface); }
    .burger { display: none; margin-left: auto; width: 42px; height: 42px; border-radius: 12px; border: 1px solid var(--line); background: transparent; color: var(--ink); }

    /* Buttons */
    .btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 24px; border-radius: var(--radius);
      background: var(--accent); color: var(--accent-ink); font-weight: 600; font-size: 15px; border: 0; white-space: nowrap;
      transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1), opacity 160ms ease-out; }
    .btn:hover { transform: translateY(-2px); }
    .btn:active { transform: scale(0.98); }
    .btn-ghost { background: transparent; color: var(--ink); border: 1px solid var(--line); }
    .btn-sm { padding: 10px 18px; font-size: 14px; }

    /* Type */
    h1, h2, h3, h4 { font-family: var(--display); font-weight: 700; line-height: 1.08; letter-spacing: -0.03em; }
    .display { font-size: clamp(44px, 6.4vw, 88px); }
    h2 { font-size: clamp(32px, 4vw, 52px); }
    h3 { font-size: 22px; letter-spacing: -0.015em; line-height: 1.2; }
    .lead { font-size: 19px; color: var(--muted); max-width: 600px; }
    .muted { color: var(--muted); }
    .kicker { font-size: 14px; font-weight: 600; color: var(--accent); margin-bottom: 18px; }

    /* Layout */
    section.block { padding: 110px 0; }
    section.tight { padding: 70px 0; }
    .section-head { display: flex; align-items: end; justify-content: space-between; gap: 40px; margin-bottom: 52px; }
    .section-head p { max-width: 420px; }
    .grid { display: grid; gap: 24px; }
    .g2 { grid-template-columns: repeat(2, 1fr); }
    .g3 { grid-template-columns: repeat(3, 1fr); }
    .g4 { grid-template-columns: repeat(4, 1fr); }
    .split { display: grid; grid-template-columns: 1.05fr 1fr; gap: 72px; align-items: center; }
    .rule { border: 0; border-top: 1px solid var(--line); }
    .card { background: var(--surface); border-radius: calc(var(--radius) * 1.6); padding: 32px; display: flex; flex-direction: column; }
    .card .foot { margin-top: auto; padding-top: 24px; }
    .photo { border-radius: calc(var(--radius) * 1.8); overflow: hidden; }
    .photo img { width: 100%; height: 100%; object-fit: cover; }
    .dark { background: var(--dark); color: var(--dark-ink); }
    .dark .muted, .dark .lead { color: color-mix(in srgb, var(--dark-ink) 68%, transparent); }

    /* Stats */
    .stats { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--line); }
    .stats div { padding: 28px 24px 0 0; }
    .stats strong { display: block; font-family: var(--display); font-size: 44px; letter-spacing: -0.03em; line-height: 1; margin-bottom: 8px; }

    /* Lists, FAQ, tables */
    .list-row { display: grid; grid-template-columns: 160px 1fr auto; gap: 32px; padding: 28px 0; border-bottom: 1px solid var(--line); align-items: baseline; }
    details { border-bottom: 1px solid var(--line); padding: 24px 0; }
    summary { cursor: pointer; list-style: none; font-weight: 600; font-size: 18px; display: flex; justify-content: space-between; gap: 24px; }
    summary::after { content: '+'; color: var(--muted); font-weight: 400; transition: transform 200ms ease-out; }
    details[open] summary::after { transform: rotate(45deg); }
    details p { margin-top: 12px; color: var(--muted); max-width: 680px; }
    table { width: 100%; border-collapse: collapse; font-size: 15px; }
    th, td { text-align: left; padding: 16px 12px; border-bottom: 1px solid var(--line); }
    th { color: var(--muted); font-weight: 500; }

    /* Forms */
    form.form { display: grid; gap: 16px; }
    .form label { display: grid; gap: 8px; font-size: 14px; font-weight: 500; }
    .form input, .form textarea, .form select { font: inherit; font-weight: 400; padding: 15px 16px; border-radius: var(--radius);
      border: 1px solid var(--line); background: var(--bg); color: var(--ink); }
    .form input:focus, .form textarea:focus, .form select:focus { outline: 2px solid var(--accent); outline-offset: 1px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .form-success { display: none; padding: 20px; border-radius: var(--radius); background: var(--surface); font-weight: 500; }
    form.sent > *:not(.form-success) { display: none; }
    form.sent .form-success { display: block; }

    /* Footer */
    .site-footer { border-top: 1px solid var(--line); padding: 72px 0 40px; }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px; }
    .footer-grid h4 { font-family: var(--body); font-size: 13px; color: var(--muted); font-weight: 500; letter-spacing: 0; margin-bottom: 16px; }
    .footer-grid a { display: block; padding: 4px 0; transition: color 150ms ease-out; }
    .footer-grid a:hover { color: var(--accent); }
    .legal { margin-top: 64px; display: flex; justify-content: space-between; gap: 24px; font-size: 13px; color: var(--muted); }

    /* Pages */
    .page[hidden] { display: none; }
    .page.enter { animation: pageIn 260ms cubic-bezier(0.23, 1, 0.32, 1); }
    @keyframes pageIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
    @media (prefers-reduced-motion: reduce) { .page.enter { animation: none; } .btn { transition: none; } }

    @media (max-width: 900px) {
      .site-nav { display: none; position: absolute; top: 72px; left: 0; right: 0; flex-direction: column; padding: 16px 28px 24px; background: var(--bg); border-bottom: 1px solid var(--line); }
      body.menu-open .site-nav { display: flex; }
      .burger { display: inline-grid; place-items: center; }
      .header-cta { display: none; }
      .split, .g2, .g3, .g4, .footer-grid, .form-row { grid-template-columns: 1fr; }
      .split { gap: 40px; }
      .stats { grid-template-columns: 1fr 1fr; }
      .section-head { flex-direction: column; align-items: start; }
      .list-row { grid-template-columns: 1fr; gap: 6px; }
      section.block { padding: 72px 0; }
      .legal { flex-direction: column; }
    }`;

const ROUTER_JS = `  <script>
    (function () {
      var pages = Array.prototype.slice.call(document.querySelectorAll('[data-page]'));
      var links = Array.prototype.slice.call(document.querySelectorAll('[data-link]'));
      function show(id) {
        pages.forEach(function (page) {
          var on = page.getAttribute('data-page') === id;
          page.hidden = !on;
          if (on) { page.classList.remove('enter'); void page.offsetWidth; page.classList.add('enter'); }
        });
        links.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('data-link') === id);
        });
        document.body.classList.remove('menu-open');
        window.scrollTo(0, 0);
      }
      document.addEventListener('click', function (event) {
        var link = event.target.closest('[data-link]');
        if (!link) return;
        event.preventDefault();
        show(link.getAttribute('data-link'));
      });
      var burger = document.querySelector('.burger');
      if (burger) burger.addEventListener('click', function () {
        document.body.classList.toggle('menu-open');
      });
      document.querySelectorAll('form.form').forEach(function (form) {
        form.addEventListener('submit', function (event) {
          event.preventDefault();
          form.classList.add('sent');
        });
      });
      if (pages.length) show(pages[0].getAttribute('data-page'));
    })();
  </script>`;

export function renderSite(spec: SiteSpec): string {
  const { title, tagline, theme, pages, cta, css = '' } = spec;
  const nav = pages.
  map((page) => `        <a href="#${page.id}" data-link="${page.id}">${page.label}</a>`).
  join('\n');
  const footerLinks = pages.
  map((page) => `          <a href="#${page.id}" data-link="${page.id}">${page.label}</a>`).
  join('\n');
  const body = pages.
  map((page) => `    <section class="page" data-page="${page.id}">\n${page.html}\n    </section>`).
  join('\n\n');

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — ${tagline}</title>
  <meta name="description" content="${tagline}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="${theme.fontHref}" rel="stylesheet" />
  <style>
    :root {
      --bg: ${theme.bg}; --surface: ${theme.surface}; --ink: ${theme.ink}; --muted: ${theme.muted};
      --line: ${theme.line}; --accent: ${theme.accent}; --accent-ink: ${theme.accentInk};
      --dark: ${theme.dark}; --dark-ink: ${theme.darkInk}; --radius: ${theme.radius};
      --display: ${theme.display}; --body: ${theme.body};
    }
${BASE_CSS}
${css}
  </style>
</head>
<body>
  <header class="site-header">
    <div class="wrap">
      <a href="#${pages[0].id}" data-link="${pages[0].id}" class="brand">${title}</a>
      <nav class="site-nav" aria-label="Navigation principale">
${nav}
      </nav>
      <a href="#${cta.page}" data-link="${cta.page}" class="btn btn-sm header-cta">${cta.label}</a>
      <button class="burger" aria-label="Ouvrir le menu">&#9776;</button>
    </div>
  </header>

  <main>
${body}
  </main>

  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <div class="brand">${title}</div>
          <p class="muted" style="margin-top:12px;max-width:340px">${tagline}</p>
        </div>
        <div>
          <h4>Pages</h4>
${footerLinks}
        </div>
        <div>
          <h4>Suivre</h4>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:bonjour@example.com">bonjour@example.com</a>
        </div>
      </div>
      <div class="legal">
        <span>© 2026 ${title}. Tous droits réservés.</span>
        <span>Créé avec DeepSite</span>
      </div>
    </div>
  </footer>
${ROUTER_JS}
</body>
</html>
`;
}