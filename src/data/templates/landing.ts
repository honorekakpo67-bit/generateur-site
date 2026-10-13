import { images } from './images';
import { renderSite, type Theme } from './shell';

interface UploadedImage {
  id: string;
  name: string;
  dataUrl: string;
  type: 'hero' | 'gallery';
}

const theme: Theme = {
  bg: '#FBFBF8',
  surface: '#F1F2EC',
  ink: '#111511',
  muted: '#5D645C',
  line: '#E2E4DC',
  accent: '#2F6F2A',
  accentInk: '#FFFFFF',
  dark: '#0F1A10',
  darkInk: '#F2F5EE',
  radius: '12px',
  display: "'Plus Jakarta Sans', sans-serif",
  body: "'Plus Jakarta Sans', sans-serif",
  fontHref: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'
};

const css = `    .hero { padding: 88px 0 40px; }
    .hero .split { grid-template-columns: 1fr 1.1fr; }
    .hero-actions { display: flex; gap: 12px; margin-top: 36px; flex-wrap: wrap; }
    .hero .photo { aspect-ratio: 4 / 3; }
    .logos { display: flex; justify-content: space-between; gap: 32px; flex-wrap: wrap; padding: 44px 0; color: var(--muted); font-weight: 700; font-size: 20px; letter-spacing: -0.02em; opacity: 0.75; }
    .feature-main { grid-row: span 2; background: var(--dark); color: var(--dark-ink); }
    .feature-main .big { font-size: 72px; font-weight: 800; letter-spacing: -0.04em; line-height: 1; margin: 28px 0 12px; color: #B9E37A; }
    .quote { font-family: var(--display); font-size: clamp(26px, 3vw, 38px); line-height: 1.25; letter-spacing: -0.02em; max-width: 900px; }
    .person { display: flex; align-items: center; gap: 14px; margin-top: 32px; }
    .avatar { width: 48px; height: 48px; border-radius: 999px; background: var(--accent); color: var(--accent-ink); display: grid; place-items: center; font-weight: 700; }
    .cta-band { border-radius: 28px; padding: 80px 64px; display: flex; justify-content: space-between; align-items: center; gap: 40px; flex-wrap: wrap; }
    .cta-band .btn { background: #B9E37A; color: #0F1A10; }
    .row-feature { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; padding: 64px 0; border-bottom: 1px solid var(--line); }
    .mock { background: var(--surface); border-radius: 22px; padding: 28px; display: grid; gap: 12px; }
    .mock .bar { height: 14px; border-radius: 99px; background: var(--line); }
    .mock .bar.on { background: var(--accent); }
    .mock .task { display: flex; align-items: center; gap: 12px; padding: 14px 16px; border-radius: 12px; background: var(--bg); font-size: 14px; }
    .mock .dot { width: 16px; height: 16px; border-radius: 6px; border: 2px solid var(--accent); }
    .mock .dot.done { background: var(--accent); }
    .price { font-family: var(--display); font-size: 56px; font-weight: 800; letter-spacing: -0.04em; margin: 20px 0 4px; }
    .plan.featured { background: var(--dark); color: var(--dark-ink); }
    .plan.featured .btn { background: #B9E37A; color: #0F1A10; }
    .plan ul { list-style: none; display: grid; gap: 10px; margin-top: 24px; font-size: 15px; }
    .plan li::before { content: '—'; color: var(--accent); margin-right: 10px; }
    .plan.featured li::before { color: #B9E37A; }
    .yes { color: var(--accent); font-weight: 700; }
    .result-card { background: var(--surface); border-radius: 16px; padding: 32px; text-align: center; border: 1px solid var(--line); }
    .result-card .number { font-family: var(--display); font-size: 56px; font-weight: 800; color: var(--accent); line-height: 1; margin-bottom: 8px; }
    .result-card .label { color: var(--muted); font-size: 16px; }
    .integration { display: flex; align-items: center; gap: 16px; padding: 20px; background: var(--surface); border-radius: 12px; border: 1px solid var(--line); transition: border-color 150ms ease; }
    .integration:hover { border-color: var(--accent); }
    .integration img { width: 40px; height: 40px; border-radius: 8px; background: var(--bg); }
    .security-item { display: flex; gap: 16px; padding: 24px 0; border-bottom: 1px solid var(--line); }
    .security-item:last-child { border-bottom: none; }
    .security-icon { width: 48px; height: 48px; border-radius: 12px; background: var(--accent); color: var(--accent-ink); display: grid; place-items: center; flex-shrink: 0; }
    .roi-calculator { background: var(--surface); border-radius: 16px; padding: 32px; border: 1px solid var(--line); }
    .roi-input { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
    .roi-input label { flex: 1; min-width: 180px; display: flex; flex-direction: column; gap: 6px; font-size: 14px; }
    .roi-input input { padding: 12px 16px; border-radius: 8px; border: 1px solid var(--line); background: var(--bg); font-family: var(--display); font-size: 24px; }
    .roi-result { background: var(--dark); color: var(--dark-ink); border-radius: 12px; padding: 24px; text-align: center; margin-top: 24px; }
    .roi-result .big { font-family: var(--display); font-size: 64px; font-weight: 800; color: #B9E37A; }
    @media (max-width: 900px) { .hero .split, .row-feature { grid-template-columns: 1fr; gap: 36px; } .cta-band { padding: 48px 28px; } .feature-main { grid-row: auto; } }`;

export function landing(title: string, uploadedImages: UploadedImage[] = [], whatsappNumber: string = ''): string {
  const heroImage = uploadedImages.find((img) => img.type === 'hero')?.dataUrl || images.landingHero;
  const galleryImages = uploadedImages.filter((img) => img.type === 'gallery').map((img) => img.dataUrl);
  
  return renderSite({
    title,
    tagline: "L'espace de travail calme pour les équipes qui livrent.",
    theme,
    css,
    cta: { label: 'Essai gratuit', page: 'contact' },
    pages: [
    {
      id: 'accueil',
      label: 'Accueil',
      html: `      <div class="hero"><div class="wrap split">
        <div>
          <p class="kicker">Nouveau · Planification par priorité</p>
          <h1 class="display">Moins de réunions. Plus de travail livré.</h1>
          <p class="lead" style="margin-top:24px">${title} rassemble les tâches, les priorités et l'avancement de votre équipe dans un seul endroit, sans le bruit.</p>
          <div class="hero-actions">
            <a href="#contact" data-link="contact" class="btn">Commencer gratuitement →</a>
            <a href="#fonctionnalites" data-link="fonctionnalites" class="btn btn-ghost">Voir comment ça marche</a>
          </div>
        </div>
        <div class="photo"><img src="${heroImage}" alt="Tableau de bord ${title} sur un ordinateur portable" /></div>
      </div></div>
      <div class="wrap"><div class="logos"><span>Northwind</span><span>Lumen</span><span>Atlas&Co</span><span>Kinetic</span><span>Foundry</span></div></div>

      ${galleryImages.length > 0 ? `
      <section class="block"><div class="wrap">
        <div class="section-head"><h2>Galerie</h2><p class="muted">Quelques images de votre projet.</p></div>
        <div class="grid g4" style="gap:16px">
          ${galleryImages.map((img, i) => `<div class="photo" style="aspect-ratio:4/3"><img src="${img}" alt="${title} - Image ${i + 1}" /></div>`).join('')}
        </div>
      </div></section>
      ` : ''}

      <section class="block"><div class="wrap">
        <div class="section-head"><h2>Conçu pour<br />la concentration.</h2><p class="muted">Trois idées simples qui changent la façon dont votre équipe travaille au quotidien.</p></div>
        <div class="grid g2">
          <div class="card feature-main dark">
            <h3>Une seule priorité visible</h3>
            <div class="big">−42%</div>
            <p class="muted">de temps passé en réunions de suivi, mesuré sur 1 200 équipes en 2025.</p>
            <div class="foot"><a href="#fonctionnalites" data-link="fonctionnalites" style="color:#B9E37A;font-weight:600">Découvrir →</a></div>
          </div>
          <div class="card"><h3>Avancement automatique</h3><p class="muted" style="margin-top:10px">Le statut se met à jour à mesure que le travail avance. Fini les tableurs à remplir le vendredi.</p></div>
          <div class="card"><h3>Notifications groupées</h3><p class="muted" style="margin-top:10px">Un résumé deux fois par jour, au lieu de quarante interruptions.</p></div>
        </div>
      </div></section>

      <section class="block" style="padding-top:0"><div class="wrap">
        <p class="quote">« En trois semaines, nos stand-ups sont passés de 30 à 8 minutes. Tout le monde sait ce qui compte, sans avoir à le demander. »</p>
        <div class="person"><div class="avatar">CL</div><div><strong>Camille Laurent</strong><div class="muted" style="font-size:14px">Directrice produit, Lumen</div></div></div>
      </div></section>

      <section class="tight"><div class="wrap">
        <div class="cta-band dark"><h2 style="max-width:560px">Prêt à travailler plus calmement ?</h2><a href="#tarifs" data-link="tarifs" class="btn">Voir les tarifs</a></div>
      </div></section>`
    },
    {
      id: 'fonctionnalites',
      label: 'Fonctionnalités',
      html: `      <section class="block" style="padding-bottom:30px"><div class="wrap">
        <h1 class="display" style="max-width:900px">Tout ce qu'il faut. Rien de superflu.</h1>
        <p class="lead" style="margin-top:24px">Chaque fonctionnalité a été ajoutée parce qu'une équipe en avait vraiment besoin.</p>
      </div></section>
      <div class="wrap">
        <div class="row-feature">
          <div><h2>Planifier</h2><p class="lead" style="margin-top:18px">Glissez vos tâches dans l'ordre. La première est la priorité du jour, pour tout le monde.</p></div>
          <div class="mock">
            <div class="task"><span class="dot done"></span>Valider la maquette d'onboarding</div>
            <div class="task"><span class="dot"></span>Rédiger la note de version 2.4</div>
            <div class="task"><span class="dot"></span>Préparer la démo client de jeudi</div>
          </div>
        </div>
        <div class="row-feature">
          <div class="mock">
            <div class="bar on" style="width:82%"></div><div class="bar on" style="width:64%"></div><div class="bar" style="width:40%"></div><div class="bar" style="width:24%"></div>
          </div>
          <div><h2>Suivre</h2><p class="lead" style="margin-top:18px">L'avancement se calcule tout seul à partir du travail réel, projet par projet.</p></div>
        </div>
        <div class="row-feature" style="border:0">
          <div><h2>Se concentrer</h2><p class="lead" style="margin-top:18px">Mode focus, résumés groupés, et un statut « ne pas déranger » respecté par toute l'équipe.</p></div>
          <div class="mock"><div class="task"><span class="dot done"></span>Mode focus actif · 1 h 30 restantes</div><div class="task"><span class="dot"></span>Prochain résumé à 16 h 00</div></div>
        </div>
      </div>
      <section class="block"><div class="wrap">
        <h2 style="margin-bottom:32px">Comparé aux outils classiques</h2>
        <table>
          <thead><tr><th></th><th>${title}</th><th>Outils classiques</th></tr></thead>
          <tbody>
            <tr><td>Mise en route</td><td class="yes">5 minutes</td><td>Plusieurs jours</td></tr>
            <tr><td>Statut automatique</td><td class="yes">Oui</td><td>Manuel</td></tr>
            <tr><td>Notifications groupées</td><td class="yes">Oui</td><td>Non</td></tr>
            <tr><td>Prix pour 10 personnes</td><td class="yes">0 €</td><td>120 € / mois</td></tr>
          </tbody>
        </table>
      </div></section>`
    },
    {
      id: 'resultats',
      label: 'Résultats',
      html: `      <section class="block"><div class="wrap">
        <div class="section-head"><h1 class="display">Des résultats mesurables.</h1><p class="lead">Ce que nos clients obtiennent en moyenne après 3 mois d'utilisation.</p></div>
        <div class="stats" style="border-top:none;margin-bottom:64px">
          <div class="result-card"><div class="number">−42%</div><div class="label">Réunions de suivi</div></div>
          <div class="result-card"><div class="number">+38%</div><div class="label">Tâches livrées à temps</div></div>
          <div class="result-card"><div class="number">−60%</div><div class="label">Interruptions quotidiennes</div></div>
          <div class="result-card"><div class="number">4,8/5</div><div class="label">Satisfaction équipe</div></div>
        </div>
        <div class="grid g2">
          <div class="card"><h3>Lumen — Fintech, 120 pers.</h3><p class="muted" style="margin-top:12px">« On a réduit nos réunions hebdo de 5h à 45min. L'équipe respire. »</p><p style="margin-top:16px;font-weight:600;color:var(--accent)">−82% temps en réunions</p></div>
          <div class="card"><h3>Atlas — Design system, 80 pers.</h3><p class="muted" style="margin-top:12px">« Le design system est enfin adopté par tout le monde, pas juste les designers. »</p><p style="margin-top:16px;font-weight:600;color:var(--accent)">+200% adoption composants</p></div>
          <div class="card"><h3>Kinetic — Agence, 45 pers.</h3><p class="muted" style="margin-top:12px">« Les clients voient l'avancement en temps réel. Fini les emails "où en êtes-vous ?". »</p><p style="margin-top:16px;font-weight:600;color:var(--accent)">−90% demandes statut</p></div>
          <div class="card"><h3>Foundry — SaaS, 200 pers.</h3><p class="muted" style="margin-top:12px">« On a livré la v2.0 deux semaines avant la date. Première fois en 4 ans. »</p><p style="margin-top:16px;font-weight:600;color:var(--accent)">2 semaines d'avance</p></div>
        </div>
      </div></section>`
    },
    {
      id: 'integrations',
      label: 'Intégrations',
      html: `      <section class="block"><div class="wrap">
        <div class="section-head"><h1 class="display">Connecté à votre stack.</h1><p class="lead">${title} s'intègre là où votre équipe travaille déjà. Pas de migration, juste de la synchronisation.</p></div>
        <div class="grid g3" style="row-gap:16px">
          <div class="integration"><img src="https://cdn.simpleicons.org/github/24292E/FFFFFF" alt="GitHub" /><strong>GitHub</strong><span class="muted">Issues, PRs, Projects sync bidirectionnel</span></div>
          <div class="integration"><img src="https://cdn.simpleicons.org/gitlab/FC6D26/FFFFFF" alt="GitLab" /><strong>GitLab</strong><span class="muted">Merge requests, épics, CI/CD</span></div>
          <div class="integration"><img src="https://cdn.simpleicons.org/slack/4A154B/FFFFFF" alt="Slack" /><strong>Slack</strong><span class="muted">Notifications groupées, résumés quotidiens</span></div>
          <div class="integration"><img src="https://cdn.simpleicons.org/linear/5E6AD2/FFFFFF" alt="Linear" /><strong>Linear</strong><span class="muted">Projets, cycles, roadmaps synchronisés</span></div>
          <div class="integration"><img src="https://cdn.simpleicons.org/notion/000000/FFFFFF" alt="Notion" /><strong>Notion</strong><span class="muted">Pages, bases de données, docs liés</span></div>
          <div class="integration"><img src="https://cdn.simpleicons.org/figma/F24E1E/FFFFFF" alt="Figma" /><strong>Figma</strong><span class="muted">Designs, composants, commentaires</span></div>
          <div class="integration"><img src="https://cdn.simpleicons.org/jira/0052CC/FFFFFF" alt="Jira" /><strong>Jira</strong><span class="muted">Tickets, sprints, épics (bientôt)</span></div>
          <div class="integration"><img src="https://cdn.simpleicons.org/asana/FF6B35/FFFFFF" alt="Asana" /><strong>Asana</strong><span class="muted">Tâches, projets, portfolios (bientôt)</span></div>
          <div class="integration"><img src="https://cdn.simpleicons.org/zapier/F58220/FFFFFF" alt="Zapier" /><strong>Zapier / Make</strong><span class="muted">500+ apps via webhooks</span></div>
        </div>
        <div class="wrap" style="margin-top:64px;text-align:center">
          <a href="#contact" data-link="contact" class="btn btn-ghost">Demander une intégration</a>
        </div>
      </div></section>`
    },
    {
      id: 'securite',
      label: 'Sécurité',
      html: `      <section class="block"><div class="wrap">
        <div class="section-head"><h1 class="display">Sécurité de niveau entreprise.</h1><p class="lead">Vos données sont votre actif le plus précieux. On les protège comme les nôtres.</p></div>
        <div class="grid g2">
          <div class="security-item"><div class="security-icon">🔒</div><div><h3>Chiffrement total</h3><p class="muted">AES-256 au repos, TLS 1.3 en transit. Clés gérées par vous (BYOK) sur plan Entreprise.</p></div></div>
          <div class="security-item"><div class="security-icon">🛡️</div><div><h3>ISO 27001 & SOC 2</h3><p class="muted">Hébergé en Europe (Frankfurt/Paris), audits annuels, conformité RGPD native.</p></div></div>
          <div class="security-item"><div class="security-icon">👥</div><div><h3>SSO & SCIM</h3><p class="muted">SAML, OIDC, Okta, Entra ID, Google Workspace. Provisioning automatique.</p></div></div>
          <div class="security-item"><div class="security-icon">📍</div><div><h3>Résidence des données</h3><p class="muted">Choix de la région (EU, US). Pas de transfert hors juridiction sans accord.</p></div></div>
          <div class="security-item"><div class="security-icon">🔍</div><div><h3>Audit trail complet</h3><p class="muted">Journal immuable de toutes les actions. Export SIEM (Splunk, Datadog, Elastic).</p></div></div>
          <div class="security-item"><div class="security-icon">⏱️</div><div><h3>Rétention configurable</h3><p class="muted">De 30 jours à 7 ans. Suppression définitive certifiée à la demande.</p></div></div>
        </div>
        <div class="wrap" style="margin-top:64px;text-align:center">
          <a href="#contact" data-link="contact" class="btn btn-ghost">Demander le rapport SOC 2</a>
        </div>
      </div></section>`
    },
    {
      id: 'roi',
      label: 'Calculateur ROI',
      html: `      <section class="block"><div class="wrap" style="max-width:720px">
        <div class="section-head"><h1 class="display">Combien ${title} vous fait économiser ?</h1><p class="lead">Entrez vos chiffres. On fait le calcul.</p></div>
        <div class="roi-calculator">
          <div class="roi-input">
            <label>Équipe<input type="number" value="25" min="1" max="1000" id="team-size" /></label>
            <label>Coût horaire moyen (€)<input type="number" value="55" min="10" max="500" id="hourly-cost" /></label>
            <label>Réunions/semaine par personne<input type="number" value="8" min="1" max="40" id="meetings-week" /></label>
          </div>
          <button class="btn" style="width:100%" onclick="calculateROI()">Calculer</button>
          <div id="roi-result" class="roi-result" style="display:none">
            <div class="big" id="roi-saving">0 €</div>
            <p class="muted" style="margin-top:8px;color:color-mix(in srgb, var(--dark-ink) 68%, transparent)">Économisé par mois vs outils classiques</p>
            <p class="muted" style="margin-top:16px;font-size:14px">Basé sur −42% réunions, −60% interruptions, productivité +15%</p>
          </div>
        </div>
        <script>
          function calculateROI() {
            const team = parseInt(document.getElementById('team-size').value) || 25;
            const hourly = parseInt(document.getElementById('hourly-cost').value) || 55;
            const meetings = parseInt(document.getElementById('meetings-week').value) || 8;
            const hoursSaved = team * meetings * 0.42 * 4;
            const monthlySaving = hoursSaved * hourly;
            const el = document.getElementById('roi-result');
            const val = document.getElementById('roi-saving');
            val.textContent = monthlySaving.toLocaleString('fr-FR') + ' €';
            el.style.display = 'block';
          }
        </script>
      </div></section>`
    },
    {
      id: 'tarifs',
      label: 'Tarifs',
      html: `      <section class="block"><div class="wrap">
        <div class="section-head"><h1 class="display">Des tarifs simples.</h1><p class="lead">Gratuit pour les petites équipes. Sans engagement pour tout le monde.</p></div>
        <div class="grid g3">
          <div class="card plan"><h3>Équipe</h3><div class="price">0 €</div><p class="muted">Jusqu'à 10 personnes</p>
            <ul><li>Projets illimités</li><li>Statut automatique</li><li>Applications mobiles</li></ul>
            <div class="foot"><a href="#contact" data-link="contact" class="btn btn-ghost">Commencer</a></div></div>
          <div class="card plan featured dark"><h3>Croissance</h3><div class="price">8 €</div><p class="muted">par personne / mois</p>
            <ul><li>Tout le plan Équipe</li><li>Mode focus avancé</li><li>Rapports hebdomadaires</li><li>Support prioritaire</li></ul>
            <div class="foot"><a href="#contact" data-link="contact" class="btn">Essai gratuit 30 jours</a></div></div>
          <div class="card plan"><h3>Entreprise</h3><div class="price">Sur devis</div><p class="muted">À partir de 100 personnes</p>
            <ul><li>SSO & SCIM</li><li>Hébergement en Europe</li><li>Accompagnement dédié</li></ul>
            <div class="foot"><a href="#contact" data-link="contact" class="btn btn-ghost">Nous contacter</a></div></div>
        </div>
      </div></section>
      <section class="block" style="padding-top:0"><div class="wrap" style="max-width:860px">
        <h2 style="margin-bottom:24px">Questions fréquentes</h2>
        <details open><summary>Le plan gratuit est-il vraiment gratuit ?</summary><p>Oui, sans carte bancaire et sans limite de durée, jusqu'à 10 personnes.</p></details>
        <details><summary>Puis-je importer mes tâches existantes ?</summary><p>Import en un clic depuis Trello, Asana, Notion et les fichiers CSV.</p></details>
        <details><summary>Où sont hébergées mes données ?</summary><p>En Europe, chez un hébergeur certifié ISO 27001, chiffrées au repos et en transit.</p></details>
      </div></section>`
    },
    {
      id: 'apropos',
      label: 'À propos',
      html: `      <section class="block"><div class="wrap split">
        <div><h1 class="display">Une petite équipe, une grande conviction.</h1>
          <p class="lead" style="margin-top:24px">Nous avons créé ${title} après des années passées à gérer plus d'outils que de projets. Notre conviction : un bon outil se fait oublier.</p></div>
        <div class="photo" style="aspect-ratio:3/2"><img src="${images.team}" alt="L'équipe ${title} au travail" /></div>
      </div></section>
      <section class="tight"><div class="wrap">
        <div class="stats"><div><strong>2021</strong><span class="muted">Année de création</span></div><div><strong>18</strong><span class="muted">Personnes dans l'équipe</span></div><div><strong>4 200</strong><span class="muted">Équipes clientes</span></div><div><strong>4,9/5</strong><span class="muted">Note moyenne</span></div></div>
      </div></section>
      <section class="block"><div class="wrap">
        <h2 style="margin-bottom:40px">Nos principes</h2>
        <div class="list-row"><strong>Calme</strong><span class="muted">Chaque notification doit mériter votre attention. Sinon, elle attend le résumé.</span><span></span></div>
        <div class="list-row"><strong>Simple</strong><span class="muted">Si une fonctionnalité demande un tutoriel, c'est qu'elle n'est pas terminée.</span><span></span></div>
        <div class="list-row"><strong>Honnête</strong><span class="muted">Des prix publics, pas de frais cachés, et vos données restent les vôtres.</span><span></span></div>
      </div></section>`
    },
    {
      id: 'contact',
      label: 'Contact',
      html: `      <section class="block"><div class="wrap split" style="align-items:start">
        <div><h1 class="display">Parlons de votre équipe.</h1>
          <p class="lead" style="margin-top:24px">Réponse en moins de 24 h ouvrées. Ou démarrez directement, c'est gratuit.</p>
          <div style="margin-top:40px;display:grid;gap:18px">
            <div><strong>E-mail</strong><div class="muted">bonjour@example.com</div></div>
            <div><strong>Bureau</strong><div class="muted">12 rue des Arts, 69002 Lyon</div></div>
          </div></div>
        <form class="form card">
          <div class="form-row"><label>Nom<input type="text" placeholder="Camille Laurent" required /></label><label>E-mail<input type="email" placeholder="camille@entreprise.fr" required /></label></div>
          <label>Taille de l'équipe<select><option>1 – 10</option><option>11 – 50</option><option>51 – 200</option><option>200 +</option></select></label>
          <label>Message<textarea rows="5" placeholder="Parlez-nous de vos projets"></textarea></label>
          <button class="btn" type="submit">Envoyer le message</button>
          <div class="form-success">Merci ! Votre message est bien parti, nous revenons vers vous très vite.</div>
        </form>
      </div></section>`
    }]
  });
}