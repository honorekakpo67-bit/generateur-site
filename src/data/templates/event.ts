import { images } from './images';
import { renderSite, type Theme } from './shell';

const theme: Theme = {
  bg: '#0B0D12',
  surface: '#151925',
  ink: '#F1F3F7',
  muted: '#9AA2B4',
  line: '#232838',
  accent: '#5B83FF',
  accentInk: '#FFFFFF',
  dark: '#FFB547',
  darkInk: '#14100A',
  radius: '10px',
  display: "'Archivo', sans-serif",
  body: "'Inter', sans-serif",
  fontHref: 'https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800;900&family=Inter:wght@400;500;600&display=swap'
};

const css = `    h1, h2 { font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em; }
    .display { font-size: clamp(52px, 9vw, 136px); line-height: 0.92; }
    .hero { padding: 72px 0 0; }
    .facts { display: flex; flex-wrap: wrap; gap: 12px 40px; margin: 34px 0 40px; font-size: 18px; }
    .facts strong { color: var(--dark); }
    .hero .photo { aspect-ratio: 21 / 8; margin-top: 56px; }
    .count { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--line); border-radius: 16px; overflow: hidden; margin-top: 56px; }
    .count div { background: var(--surface); padding: 28px; }
    .count strong { font-family: var(--display); font-size: 52px; font-weight: 800; display: block; line-height: 1; }
    .speaker { display: flex; flex-direction: column; }
    .speaker .face { aspect-ratio: 1; border-radius: 16px; display: grid; place-items: center; font-family: var(--display); font-size: 56px; font-weight: 900; margin-bottom: 16px; }
    .speaker p { color: var(--muted); font-size: 14.5px; }
    .slot { display: grid; grid-template-columns: 120px 1fr 200px; gap: 32px; padding: 28px 0; border-bottom: 1px solid var(--line); align-items: baseline; }
    .slot .time { font-family: var(--display); font-weight: 700; font-size: 22px; }
    .slot .room { color: var(--muted); font-size: 14px; text-align: right; }
    .slot.break { color: var(--muted); }
    .tag { display: inline-block; padding: 3px 10px; border-radius: 999px; background: var(--surface); font-size: 12.5px; color: var(--muted); margin-left: 10px; vertical-align: middle; }
    .ticket .price { font-family: var(--display); font-size: 64px; font-weight: 900; margin: 14px 0; }
    .ticket ul { list-style: none; display: grid; gap: 10px; color: var(--muted); }
    .ticket.featured { background: var(--dark); color: var(--dark-ink); }
    .ticket.featured ul { color: rgba(20, 16, 10, 0.75); }
    .ticket.featured .btn { background: #14100A; color: #FFB547; }
    .sold { color: var(--dark); font-weight: 600; font-size: 14px; }
    .band { background: var(--dark); color: var(--dark-ink); }
    .band .btn { background: #14100A; color: #FFB547; }
    .video-card { background: var(--surface); border-radius: 16px; overflow: hidden; border: 1px solid var(--line); aspect-ratio: 16/9; position: relative; }
    .video-card .thumb { width: 100%; height: 100%; object-fit: cover; }
    .video-card .play { position: absolute; inset: 0; display: grid; place-items: center; background: rgba(11,13,18,0.6); opacity: 0; transition: opacity 200ms ease; }
    .video-card:hover .play { opacity: 1; }
    .video-card .play svg { width: 72px; height: 72px; color: var(--dark); filter: drop-shadow(0 4px 24px rgba(0,0,0,0.4)); }
    .partner { display: flex; align-items: center; gap: 24px; padding: 24px; background: var(--surface); border-radius: 12px; border: 1px solid var(--line); }
    .partner img { height: 48px; opacity: 0.7; transition: opacity 200ms ease; }
    .partner:hover img { opacity: 1; }
    .community-stat { text-align: center; padding: 32px 24px; background: var(--surface); border-radius: 16px; border: 1px solid var(--line); }
    .community-stat .num { font-family: var(--display); font-size: 64px; font-weight: 800; color: var(--dark); line-height: 1; margin-bottom: 8px; }
    @media (max-width: 900px) { .slot { grid-template-columns: 1fr; gap: 4px; } .slot .room { text-align: left; } .count { grid-template-columns: 1fr 1fr; } .hero .photo { aspect-ratio: 4 / 3; } }`;

const speakers = [
{ initials: 'MH', name: 'Mira Halloran', role: 'Head of Design, Ledger', bg: '#5B83FF' },
{ initials: 'TR', name: 'Tobias Reyner', role: 'Design Systems, Atlas', bg: '#FFB547', ink: '#14100A' },
{ initials: 'NB', name: 'Nour Bensalem', role: 'Principal Designer, Foundry', bg: '#2B3352' },
{ initials: 'IK', name: 'Iris Kwan', role: 'VP Product, Rowan Health', bg: '#E5484D' },
{ initials: 'LD', name: 'Léa Dumont', role: 'Fondatrice, Studio Ardoise', bg: '#1F7A5C' },
{ initials: 'SA', name: 'Samuel Adeyemi', role: 'Design Engineer, Kinetic', bg: '#F1F3F7', ink: '#0B0D12' },
{ initials: 'HM', name: 'Hana Mori', role: 'Directrice artistique, Lumen', bg: '#8B5CF6' },
{ initials: 'PG', name: 'Pablo García', role: 'Chercheur UX, Maré', bg: '#3A3F4F' }];


function speakerCard(s: (typeof speakers)[number]): string {
  return `          <div class="speaker"><div class="face" style="background:${s.bg};color:${s.ink ?? '#FFFFFF'}">${s.initials}</div><h3>${s.name}</h3><p>${s.role}</p></div>`;
}

export function event(title: string): string {
  return renderSite({
    title,
    tagline: 'Une journée, huit conférences sur le métier du design. Amsterdam, 24 avril 2026.',
    theme,
    css,
    cta: { label: 'Billets', page: 'billets' },
    pages: [
    {
      id: 'accueil',
      label: 'Accueil',
      html: `      <div class="hero"><div class="wrap">
        <h1 class="display">Un jour.<br />Huit talks.<br /><span style="color:var(--dark)">Zéro fluff.</span></h1>
        <div class="facts"><span><strong>24 avril 2026</strong></span><span>De Duif, Amsterdam</span><span>300 places</span></div>
        <div style="display:flex;gap:12px;flex-wrap:wrap"><a href="#billets" data-link="billets" class="btn">Réserver — 89 €</a><a href="#programme" data-link="programme" class="btn btn-ghost">Voir le programme</a></div>
        <div class="photo"><img src="${images.eventHero}" alt="Conférencier sur scène devant le public" /></div>
        <div class="count"><div><strong>8</strong><span class="muted">conférences</span></div><div><strong>300</strong><span class="muted">participants</span></div><div><strong>1</strong><span class="muted">piste unique</span></div><div><strong>72%</strong><span class="muted">des places vendues</span></div></div>
      </div></div>
      <section class="block"><div class="wrap">
        <div class="section-head"><h2>Intervenants</h2><a href="#intervenants" data-link="intervenants" class="btn btn-ghost">Tous les intervenants</a></div>
        <div class="grid g4">
${speakers.slice(0, 4).map(speakerCard).join('\n')}
        </div>
      </div></section>
      <section class="block band"><div class="wrap split">
        <h2>Les tarifs early bird se terminent le 1er mars.</h2>
        <div><p style="font-size:19px">Il reste 84 places. Les enregistrements sont inclus avec chaque billet.</p><a href="#billets" data-link="billets" class="btn" style="margin-top:28px">Prendre ma place</a></div>
      </div></section>`
    },
    {
      id: 'programme',
      label: 'Programme',
      html: `      <section class="block"><div class="wrap">
        <h1 class="display" style="margin-bottom:56px">Programme</h1>
        <div class="slot break"><span class="time">09:00</span><span>Accueil, badges et café</span><span class="room">Foyer</span></div>
        <div class="slot"><span class="time">09:45</span><div><h3>Concevoir pour la confiance</h3><p class="muted">Mira Halloran · Ledger</p></div><span class="room">Grande salle</span></div>
        <div class="slot"><span class="time">10:30</span><div><h3>Le vrai coût d'un composant</h3><p class="muted">Tobias Reyner · Atlas</p></div><span class="room">Grande salle</span></div>
        <div class="slot"><span class="time">11:15</span><div><h3>Des interfaces qui enseignent <span class="tag">Atelier</span></h3><p class="muted">Nour Bensalem · Foundry</p></div><span class="room">Grande salle</span></div>
        <div class="slot break"><span class="time">12:30</span><span>Déjeuner</span><span class="room">Jardin</span></div>
        <div class="slot"><span class="time">14:00</span><div><h3>Le design dans un secteur réglementé</h3><p class="muted">Iris Kwan · Rowan Health</p></div><span class="room">Grande salle</span></div>
        <div class="slot"><span class="time">15:00</span><div><h3>Petit studio, grandes marques</h3><p class="muted">Léa Dumont · Studio Ardoise</p></div><span class="room">Grande salle</span></div>
        <div class="slot"><span class="time">16:15</span><div><h3>Prototyper dans le navigateur <span class="tag">Démo live</span></h3><p class="muted">Samuel Adeyemi · Kinetic</p></div><span class="room">Grande salle</span></div>
        <div class="slot break"><span class="time">18:00</span><span>Afterparty</span><span class="room">Toit-terrasse</span></div>
      </div></section>`
    },
    {
      id: 'intervenants',
      label: 'Intervenants',
      html: `      <section class="block"><div class="wrap">
        <div class="section-head"><h1 class="display">Intervenants</h1><p class="lead">Des praticiens, pas des conférenciers professionnels. Chacun montre du vrai travail.</p></div>
        <div class="grid g4" style="row-gap:44px">
${speakers.map(speakerCard).join('\n')}
        </div>
      </div></section>`
    },
    {
      id: 'videos',
      label: 'Vidéos 2025',
      html: `      <section class="block"><div class="wrap">
        <div class="section-head"><h1 class="display">L'édition 2025 en vidéo.</h1><p class="lead">8 talks complets, gratuits, pour vous donner un avant-goût de l'expérience Design Day.</p></div>
        <div class="grid g4" style="row-gap:24px">
          <div class="video-card"><img class="thumb" src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" alt="Mira Halloran - Concevoir pour la confiance" /><div class="play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div></div>
          <div class="video-card"><img class="thumb" src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" alt="Tobias Reyner - Le vrai coût d'un composant" /><div class="play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div></div>
          <div class="video-card"><img class="thumb" src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" alt="Nour Bensalem - Des interfaces qui enseignent" /><div class="play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div></div>
          <div class="video-card"><img class="thumb" src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" alt="Iris Kwan - Design dans un secteur réglementé" /><div class="play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div></div>
        </div>
        <div class="wrap" style="margin-top:48px;text-align:center">
          <a href="https://youtube.com/@designday" target="_blank" rel="noreferrer" class="btn btn-ghost">Voir la chaîne complète →</a>
        </div>
      </div></section>`
    },
    {
      id: 'communaute',
      label: 'Communauté',
      html: `      <section class="block"><div class="wrap">
        <div class="section-head"><h1 class="display">Plus qu'une conf.<br />Une communauté.</h1><p class="lead">Design Day, c'est 300 personnes le jour J. Et 2 000+ designers qui restent connectés toute l'année.</p></div>
        <div class="stats" style="border-top:none;margin-bottom:64px">
          <div class="community-stat"><div class="num">2 400+</div><div class="muted">Membres Slack/Discord</div></div>
          <div class="community-stat"><div class="num">47</div><div class="muted">Pays représentés</div></div>
          <div class="community-stat"><div class="num">12</div><div class="muted">Meetups locaux/an</div></div>
          <div class="community-stat"><div class="num">94%</div><div class="muted">Taux de recommandation</div></div>
        </div>
        <div class="grid g2" style="row-gap:32px">
          <div class="card" style="background:var(--surface);border:1px solid var(--line)">
            <h3>Slack Design Day</h3><p class="muted" style="margin-top:12px">Channels par sujet : #design-systems, #career, #tools, #jobs, #random. Modéré, bienveillant, zero spam.</p>
            <a href="https://slack.designday.io" target="_blank" rel="noreferrer" class="btn" style="margin-top:24px">Rejoindre</a>
          </div>
          <div class="card" style="background:var(--surface);border:1px solid var(--line)">
            <h3>Newsletter « The Daily Pixel »</h3><p class="muted" style="margin-top:12px">Une idée, un lien, une citation. Tous les matins. 5 min de lecture. 18 000+ abonnés.</p>
            <a href="#contact" data-link="contact" class="btn" style="margin-top:24px">S'abonner</a>
          </div>
          <div class="card" style="background:var(--surface);border:1px solid var(--line)">
            <h3>Meetups locaux</h3><p class="muted" style="margin-top:12px">Paris, Lyon, Amsterdam, Berlin, Londres, NYC, SF, Montréal, Tokyo, São Paulo. Organisés par des bénévoles de la communauté.</p>
            <a href="#contact" data-link="contact" class="btn" style="margin-top:24px">En organiser un</a>
          </div>
          <div class="card" style="background:var(--surface);border:1px solid var(--line)">
            <h3>Job Board</h3><p class="muted" style="margin-top:12px">Offres triées sur le volet : senior, lead, staff, principal. Pas de juniors, pas de stages. Entreprises vérifiées.</p>
            <a href="https://jobs.designday.io" target="_blank" rel="noreferrer" class="btn" style="margin-top:24px">Voir les offres</a>
          </div>
        </div>
      </div></section>`
    },
    {
      id: 'partenaires',
      label: 'Partenaires',
      html: `      <section class="block"><div class="wrap">
        <div class="section-head"><h1 class="display">Ils rendent Design Day possible.</h1><p class="lead">Pas de sponsors « logo sur slide ». Des partenaires qui partagent nos valeurs et investissent dans la communauté design.</p></div>
        <div class="grid g3" style="row-gap:24px">
          <div class="partner"><img src="https://cdn.simpleicons.org/figma/F24E1E/FFFFFF" alt="Figma" /><div><strong>Figma</strong><br /><span class="muted">Partenaire titre — Outils, communauté, FigJam pour ateliers</span></div></div>
          <div class="partner"><img src="https://cdn.simpleicons.org/linear/5E6AD2/FFFFFF" alt="Linear" /><div><strong>Linear</strong><br /><span class="muted">Billets équipe — Gestion de projet pour designers</span></div></div>
          <div class="partner"><img src="https://cdn.simpleicons.org/notion/000000/FFFFFF" alt="Notion" /><div><strong>Notion</strong><br /><span class="muted">Documentation — Wiki, specs, templates design system</span></div></div>
          <div class="partner"><img src="https://cdn.simpleicons.org/github/24292E/FFFFFF" alt="GitHub" /><div><strong>GitHub</strong><br /><span class="muted">Afterparty — Copilot, Codespaces, sponsoring open source</span></div></div>
          <div class="partner"><img src="https://cdn.simpleicons.org/vercel/000000/FFFFFF" alt="Vercel" /><div><strong>Vercel</strong><br /><span class="muted">Streaming — Déploiement, edge, analytics temps réel</span></div></div>
          <div class="partner"><img src="https://cdn.simpleicons.org/sentry/362D59/FFFFFF" alt="Sentry" /><div><strong>Sentry</strong><br /><span class="muted">Monitoring — Erreurs, performance, session replay</span></div></div>
        </div>
        <div class="wrap" style="margin-top:64px;text-align:center">
          <a href="#contact" data-link="contact" class="btn btn-ghost">Devenir partenaire 2026</a>
        </div>
      </div></section>`
    },
    {
      id: 'billets',
      label: 'Billets',
      html: `      <section class="block"><div class="wrap">
        <div class="section-head"><h1 class="display">Billets</h1><p class="lead">Déjeuner, enregistrements et afterparty inclus.</p></div>
        <div class="grid g3">
          <div class="card ticket"><h3>Étudiant</h3><div class="price">39 €</div><ul><li>Accès à toutes les conférences</li><li>Déjeuner inclus</li><li>Justificatif requis</li></ul><div class="foot"><span class="sold">Plus que 12 places</span></div></div>
          <div class="card ticket featured"><h3>Early bird</h3><div class="price">89 €</div><ul><li>Accès complet</li><li>Enregistrements à vie</li><li>Afterparty</li></ul><div class="foot"><a href="#infos" data-link="infos" class="btn">Réserver</a></div></div>
          <div class="card ticket"><h3>Équipe · 5 places</h3><div class="price">390 €</div><ul><li>Tout le billet early bird</li><li>Facture unique</li><li>Places réservées</li></ul><div class="foot"><a href="#infos" data-link="infos" class="btn btn-ghost">Réserver</a></div></div>
        </div>
      </div></section>`
    },
    {
      id: 'infos',
      label: 'Infos pratiques',
      html: `      <section class="block"><div class="wrap split" style="align-items:start">
        <div><h1 class="display" style="font-size:clamp(44px,6vw,88px)">Infos pratiques</h1>
          <p class="lead" style="margin-top:24px">De Duif, Prinsengracht 756, Amsterdam. À 10 minutes à pied de la gare centrale.</p>
          <details open><summary>Le lieu est-il accessible ?</summary><p>Oui, entièrement accessible en fauteuil, avec boucle magnétique en salle.</p></details>
          <details><summary>Les talks sont-ils en anglais ?</summary><p>Oui, avec sous-titres en direct en anglais et en néerlandais.</p></details>
          <details><summary>Puis-je me faire rembourser ?</summary><p>Remboursement intégral jusqu'au 1er avril, puis transfert de billet gratuit.</p></details></div>
        <form class="form card">
          <h3 style="margin-bottom:6px">Réserver ma place</h3>
          <div class="form-row"><label>Prénom<input type="text" required /></label><label>Nom<input type="text" required /></label></div>
          <label>E-mail<input type="email" required /></label>
          <label>Billet<select><option>Early bird — 89 €</option><option>Étudiant — 39 €</option><option>Équipe — 390 €</option></select></label>
          <button class="btn" type="submit">Confirmer la réservation</button>
          <div class="form-success">C'est réservé ! Votre billet arrive par e-mail.</div>
        </form>
      </div></section>`
    }]
  });
}