import { images } from './images';
import { renderSite, type Theme } from './shell';

const theme: Theme = {
  bg: '#F6F1E9',
  surface: '#EDE5D8',
  ink: '#25201B',
  muted: '#6E6458',
  line: '#DDD3C4',
  accent: '#A8461F',
  accentInk: '#FFF8F0',
  dark: '#25201B',
  darkInk: '#F6F1E9',
  radius: '6px',
  display: "'Fraunces', Georgia, serif",
  body: "'Inter', sans-serif",
  fontHref: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap'
};

const css = `    h1, h2, h3 { font-weight: 400; letter-spacing: -0.02em; }
    .display { font-size: clamp(46px, 7vw, 104px); line-height: 1; }
    .display em { font-style: italic; color: var(--accent); }
    .intro { padding: 100px 0 64px; }
    .hero-photo { aspect-ratio: 21 / 9; }
    .work-row { display: grid; grid-template-columns: 70px 1fr 1fr 120px; gap: 32px; padding: 32px 0; border-bottom: 1px solid var(--line); align-items: baseline; transition: color 150ms ease-out; }
    .work-row:hover { color: var(--accent); }
    .work-row h3 { font-size: 32px; }
    .tile { display: flex; flex-direction: column; }
    .tile .art { aspect-ratio: 4 / 3; border-radius: 6px; display: grid; place-items: center; font-family: var(--display); font-size: 46px; font-style: italic; margin-bottom: 18px; transition: transform 220ms cubic-bezier(0.23, 1, 0.32, 1); }
    .tile:hover .art { transform: scale(0.985); }
    .tile .meta { display: flex; justify-content: space-between; gap: 16px; color: var(--muted); font-size: 14px; margin-top: 6px; }
    .step { padding: 28px 0; border-top: 1px solid var(--line); display: grid; grid-template-columns: 200px 1fr; gap: 32px; }
    .step h3 { font-size: 26px; }
    .result { font-family: var(--display); font-size: 64px; line-height: 1; color: var(--accent); }
    .timeline div { display: grid; grid-template-columns: 140px 1fr; gap: 24px; padding: 20px 0; border-bottom: 1px solid var(--line); }
    .clients { display: flex; flex-wrap: wrap; gap: 14px 40px; font-family: var(--display); font-size: 30px; color: var(--muted); }
    .mail { font-family: var(--display); font-size: clamp(34px, 5.5vw, 76px); color: var(--accent); border-bottom: 2px solid var(--accent); }
    .testimonial { background: var(--surface); border-radius: 12px; padding: 32px; border: 1px solid var(--line); }
    .testimonial .quote { font-family: var(--display); font-size: clamp(22px, 2.5vw, 32px); line-height: 1.3; margin-bottom: 20px; }
    .testimonial .author { display: flex; align-items: center; gap: 14px; }
    .testimonial .avatar { width: 48px; height: 48px; border-radius: 999px; background: var(--accent); color: var(--accent-ink); display: grid; place-items: center; font-weight: 700; font-family: var(--display); }
    .process-step { display: grid; grid-template-columns: 80px 1fr; gap: 32px; padding: 40px 0; border-bottom: 1px solid var(--line); align-items: start; }
    .process-step:last-child { border-bottom: none; }
    .process-num { font-family: var(--display); font-size: 64px; font-weight: 700; color: var(--accent); opacity: 0.3; line-height: 1; }
    .faq-item { border-bottom: 1px solid var(--line); padding: 24px 0; }
    .faq-item:last-child { border-bottom: none; }
    .faq-item summary { cursor: pointer; list-style: none; font-weight: 600; font-size: 18px; display: flex; justify-content: space-between; gap: 24px; }
    .faq-item summary::after { content: '+'; color: var(--muted); font-weight: 400; transition: transform 200ms ease-out; }
    .faq-item[open] summary::after { transform: rotate(45deg); }
    .faq-item p { margin-top: 12px; color: var(--muted); max-width: 680px; }
    @media (max-width: 900px) { .work-row { grid-template-columns: 1fr; gap: 4px; } .step, .timeline div, .process-step { grid-template-columns: 1fr; gap: 6px; } .hero-photo { aspect-ratio: 4 / 3; } }`;

export function portfolio(title: string): string {
  return renderSite({
    title,
    tagline: 'Design produit et systèmes — interfaces qui se font oublier.',
    theme,
    css,
    cta: { label: 'Me contacter', page: 'contact' },
    pages: [
    {
      id: 'accueil',
      label: 'Accueil',
      html: `      <div class="intro"><div class="wrap">
        <h1 class="display">Je dessine des produits <em>calmes</em>, utiles, et faciles à aimer.</h1>
        <p class="lead" style="margin-top:32px">Designer produit indépendante à Lisbonne. Dix ans à concevoir des applications bancaires, des outils de données et des design systems.</p>
      </div></div>
      <div class="wrap"><div class="photo hero-photo"><img src="${images.portfolioHero}" alt="Bureau de travail avec croquis et maquettes" /></div></div>
      <section class="block"><div class="wrap">
        <div class="section-head"><h2>Projets choisis</h2><a href="#projets" data-link="projets" class="btn btn-ghost">Tous les projets</a></div>
        <a href="#etude" data-link="etude" class="work-row"><span class="muted">2025</span><h3>Ledger</h3><span class="muted">Refonte de l'application bancaire mobile</span><span class="muted">Fintech</span></a>
        <a href="#etude" data-link="etude" class="work-row"><span class="muted">2024</span><h3>Atlas</h3><span class="muted">Design system adopté par six équipes</span><span class="muted">Systèmes</span></a>
        <a href="#etude" data-link="etude" class="work-row"><span class="muted">2023</span><h3>Foundry</h3><span class="muted">Requêtes de données sans code</span><span class="muted">B2B</span></a>
      </div></section>
      <section class="tight dark"><div class="wrap split">
        <h2>« Elle transforme un brief flou en un produit évident. »</h2>
        <p class="lead">Jonas Weber — VP Produit, Ledger. Collaboration de 14 mois sur la refonte complète de l'expérience mobile.</p>
      </div></section>`
    },
    {
      id: 'projets',
      label: 'Projets',
      html: `      <section class="block"><div class="wrap">
        <h1 class="display" style="margin-bottom:64px">Projets</h1>
        <div class="grid g3" style="row-gap:56px">
          <a href="#etude" data-link="etude" class="tile"><div class="art" style="background:#D9C6AE">Ledger</div><h3>Ledger</h3><div class="meta"><span>Application bancaire</span><span>2025</span></div></a>
          <a href="#etude" data-link="etude" class="tile"><div class="art" style="background:#25201B;color:#F6F1E9">Atlas</div><h3>Atlas</h3><div class="meta"><span>Design system</span><span>2024</span></div></a>
          <a href="#etude" data-link="etude" class="tile"><div class="art" style="background:#C9734E;color:#FFF8F0">Foundry</div><h3>Foundry</h3><div class="meta"><span>Outil de données</span><span>2023</span></div></a>
          <a href="#etude" data-link="etude" class="tile"><div class="art" style="background:#B7BFA4">Rowan</div><h3>Rowan</h3><div class="meta"><span>Suivi de santé</span><span>2023</span></div></a>
          <a href="#etude" data-link="etude" class="tile"><div class="art" style="background:#E8DCC9">Maré</div><h3>Maré</h3><div class="meta"><span>Réservation de voyages</span><span>2022</span></div></a>
          <a href="#etude" data-link="etude" class="tile"><div class="art" style="background:#5B4A3C;color:#F6F1E9">Oficina</div><h3>Oficina</h3><div class="meta"><span>Identité de studio</span><span>2021</span></div></a>
        </div>
      </div></section>`
    },
    {
      id: 'etude',
      label: 'Étude de cas',
      html: `      <section class="block"><div class="wrap">
        <p class="kicker">Ledger · 2025 · 14 mois</p>
        <h1 class="display" style="max-width:1000px">Rendre la banque mobile <em>lisible</em> à nouveau.</h1>
        <div class="stats" style="margin-top:64px"><div><strong class="result">+38%</strong><span class="muted">d'utilisateurs actifs</span></div><div><strong class="result">−54%</strong><span class="muted">d'appels au support</span></div><div><strong class="result">4,8</strong><span class="muted">note App Store</span></div><div><strong class="result">2,1 M</strong><span class="muted">clients concernés</span></div></div>
      </div></section>
      <div class="wrap"><div class="photo" style="aspect-ratio:16/8"><img src="${images.portfolioHero}" alt="Maquettes du projet Ledger" style="object-position:center 70%" /></div></div>
      <section class="block"><div class="wrap">
        <div class="step"><h3>Le problème</h3><p class="lead">L'application comptait 140 écrans et trois navigations concurrentes. Les clients appelaient le support pour trouver leur RIB.</p></div>
        <div class="step"><h3>L'approche</h3><p class="lead">Trente entretiens, un audit complet, puis une seule question : que vient faire un client ici, neuf fois sur dix ?</p></div>
        <div class="step"><h3>La solution</h3><p class="lead">Un accueil centré sur le solde et les trois actions clés, une recherche universelle, et 60 écrans au lieu de 140.</p></div>
      </div></section>`
    },
    {
      id: 'processus',
      label: 'Processus',
      html: `      <section class="block"><div class="wrap">
        <h1 class="display" style="margin-bottom:64px">Comment on travaille ensemble.</h1>
        <p class="lead" style="max-width:600px">Pas de théâtraux. Un processus clair, itératif, et sans surprise.</p>
      </div></section>
      <div class="wrap">
        <div class="process-step">
          <div class="process-num">01</div>
          <div><h3>Découverte & Audit</h3><p class="lead" style="margin-top:12px">Entretiens parties prenantes, audit UX/UI existant, analyse données, définition objectifs mesurables. 2–3 semaines.</p></div>
        </div>
        <div class="process-step">
          <div class="process-num">02</div>
          <div><h3>Stratégie & Architecture</h3><p class="lead" style="margin-top:12px">Cartographie parcours, architecture information, principes design, design system foundations. Validation stakeholders. 2–3 semaines.</p></div>
        </div>
        <div class="process-step">
          <div class="process-num">03</div>
          <div><h3>Conception Itérative</h3><p class="lead" style="margin-top:12px">Wireframes → maquettes → prototypes haute fidélité. Tests utilisateurs hebdo. Livraison par incréments validés. 4–8 semaines.</p></div>
        </div>
        <div class="process-step">
          <div class="process-num">04</div>
          <div><h3>Design System & Spécifications</h3><p class="lead" style="margin-top:12px">Composants documentés, tokens, guidelines, specs développeur (Figma/Storybook). Handoff fluide, zéro ambiguïté. 2–3 semaines.</p></div>
        </div>
        <div class="process-step">
          <div class="process-num">05</div>
          <div><h3>Suivi Post-Lancement</h3><p class="lead" style="margin-top:12px">Métriques d'adoption, feedback utilisateurs, itérations v1.1. Disponible 4 semaines après mise en production.</p></div>
        </div>
      </div>
      <section class="tight dark"><div class="wrap split">
        <h2>« Le processus était invisible. On a juste vu le produit s'améliorer chaque semaine. »</h2>
        <p class="lead">Sarah Chen — CTO, Rowan Health</p>
      </div></section>`
    },
    {
      id: 'temoignages',
      label: 'Témoignages',
      html: `      <section class="block"><div class="wrap">
        <h1 class="display" style="margin-bottom:64px">Ce qu'ils en disent.</h1>
        <p class="lead" style="max-width:600px">Pas de filtres. Juste le retour de gens avec qui j'ai livré.</p>
      </div></section>
      <div class="wrap">
        <div class="grid g3" style="row-gap:32px">
          <div class="testimonial">
            <p class="quote">« Inês a réduit notre design system de 200 à 47 composants. Les devs l'ont adopté en deux sprints. »</p>
            <div class="author"><div class="avatar">TJ</div><div><strong>Thomas Jung</strong><br /><span class="muted">Engineering Lead, Atlas</span></div></div>
          </div>
          <div class="testimonial">
            <p class="quote">« Elle a compris notre régulateur mieux que notre legal. L'app bancaire a passé l'audit du premier coup. »</p>
            <div class="author"><div class="avatar">MK</div><div><strong>Marie Kowalski</strong><br /><span class="muted">Head of Compliance, Ledger</span></div></div>
          </div>
          <div class="testimonial">
            <p class="quote">« Première designer qui code vraiment. Pas de "throw over the wall". Elle a débloqué l'équipe technique. »</p>
            <div class="author"><div class="avatar">RP</div><div><strong>Ravi Patel</strong><br /><span class="muted">VP Engineering, Foundry</span></div></div>
          </div>
          <div class="testimonial">
            <p class="quote">« On a lancé la v2 en 4 mois au lieu de 9. Elle a aligné produit, design, tech sans réunions interminables. »</p>
            <div class="author"><div class="avatar">SC</div><div><strong>Sarah Chen</strong><br /><span class="muted">CTO, Rowan Health</span></div></div>
          </div>
          <div class="testimonial">
            <p class="quote">« Son audit UX a révélé qu'on résolvait le mauvais problème. Pivot produit, +200% conversion. »</p>
            <div class="author"><div class="avatar">LD</div><div><strong>Léa Dumont</strong><br /><span class="muted">Fondatrice, Studio Ardoise</span></div></div>
          </div>
          <div class="testimonial">
            <p class="quote">« Travailler avec Inês, c'est avoir un co-fondateur design. Elle challenge, propose, livre. Rare. »</p>
            <div class="author"><div class="avatar">JW</div><div><strong>Jonas Weber</strong><br /><span class="muted">VP Product, Ledger</span></div></div>
          </div>
        </div>
      </div>`
    },
    {
      id: 'faq',
      label: 'FAQ',
      html: `      <section class="block"><div class="wrap" style="max-width:800px">
        <h1 class="display" style="margin-bottom:48px">Questions fréquentes.</h1>
        <details class="faq-item" open>
          <summary>Quels types de projets prenez-vous ?</summary>
          <p>Produits B2B/SaaS complexes (fintech, santé, data tools), design systems d'entreprise, refontes d'applications existantes. Pas de sites vitrines, e-commerce pur, ou apps grand public simples.</p>
        </details>
        <details class="faq-item">
          <summary>Quel est votre tarif ?</summary>
          <p>Projets : 15–40 k€ selon scope (4–12 semaines). Design systems : 25–60 k€. Conseil stratégique : 2 500 €/jour. Devis détaillé après call découverte (gratuit).</p>
        </details>
        <details class="faq-item">
          <summary>Travaillez-vous en équipe ou solo ?</summary>
          <p>Solo sur la conception (recherche, strategy, UI, prototypes). Je collabore avec vos devs pour le handoff. Pour des gros design systems, je peux coordonner 1–2 designers juniors sous ma direction.</p>
        </details>
        <details class="faq-item">
          <summary>Quels outils utilisez-vous ?</summary>
          <p>Figma (design, prototypes, design system), Notion (specs, docs), Linear/Jira (tracking), GitHub (versioning composants), React/Storybook (handoff dev). Je m'adapte à votre stack.</p>
        </details>
        <details class="faq-item">
          <summary>Quel est le délai de démarrage ?</summary>
          <p>Prochaine dispo : mars 2026 (2 slots). Call découverte cette semaine → contrat la semaine d'après → kickoff semaine suivante.</p>
        </details>
        <details class="faq-item">
          <summary>Garantissez-vous des résultats ?</summary>
          <p>Je garantis la livraison des livrables convenus (specs, prototypes, design system). Les métriques business (conversion, adoption, NPS) dépendent de facteurs hors design (marché, produit, exécution). On définit des KPIs ensemble au kickoff.</p>
        </details>
      </div></section>`
    },
    {
      id: 'apropos',
      label: 'À propos',
      html: `      <section class="block"><div class="wrap split" style="align-items:start">
        <div><h1 class="display">Bonjour, je suis Inês.</h1>
          <p class="lead" style="margin-top:28px">Je travaille au croisement du produit, du design et du code. J'aime les problèmes complexes qui méritent des réponses simples.</p></div>
        <div class="timeline">
          <div><span class="muted">2022 — auj.</span><span><strong>Indépendante</strong><br /><span class="muted">Fintech, santé, outils B2B</span></span></div>
          <div><span class="muted">2018 — 2022</span><span><strong>Lead designer, Atlas</strong><br /><span class="muted">Design system et plateforme</span></span></div>
          <div><span class="muted">2015 — 2018</span><span><strong>Designer produit, Maré</strong><br /><span class="muted">Réservation mobile</span></span></div>
        </div>
      </div></section>
      <section class="block" style="padding-top:0"><div class="wrap">
        <h2 style="margin-bottom:32px">Ils m'ont fait confiance</h2>
        <div class="clients"><span>Ledger</span><span>Atlas</span><span>Foundry</span><span>Rowan Health</span><span>Maré</span><span>Banco Norte</span></div>
      </div></section>`
    },
    {
      id: 'contact',
      label: 'Contact',
      html: `      <section class="block"><div class="wrap">
        <h1 class="display" style="max-width:900px">Un projet en tête ?</h1>
        <p class="lead" style="margin:28px 0 48px">Disponible à partir de mars 2026 pour deux nouveaux projets.</p>
        <a class="mail" href="mailto:bonjour@example.com">bonjour@example.com</a>
        <form class="form" style="max-width:640px;margin-top:80px">
          <div class="form-row"><label>Nom<input type="text" required /></label><label>E-mail<input type="email" required /></label></div>
          <label>Budget<select><option>Moins de 10 k€</option><option>10 – 30 k€</option><option>Plus de 30 k€</option></select></label>
          <label>Votre projet<textarea rows="5"></textarea></label>
          <div><button class="btn" type="submit">Envoyer</button></div>
          <div class="form-success">Merci, je vous réponds sous 48 h.</div>
        </form>
      </div></section>`
    }]
  });
}