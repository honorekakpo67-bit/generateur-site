import { images } from './images';
import { renderSite, type Theme } from './shell';

const theme: Theme = {
  bg: '#F5EFE6',
  surface: '#EBE2D4',
  ink: '#241710',
  muted: '#715E4F',
  line: '#DCCFBD',
  accent: '#8A4320',
  accentInk: '#FFF7EE',
  dark: '#1E140D',
  darkInk: '#F5EFE6',
  radius: '999px',
  display: "'DM Serif Display', Georgia, serif",
  body: "'DM Sans', sans-serif",
  fontHref: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&display=swap'
};

const css = `    h1, h2, h3 { font-weight: 400; letter-spacing: -0.01em; }
    .card { border-radius: 20px; }
    .photo { border-radius: 24px; }
    .hero { position: relative; min-height: 640px; display: flex; align-items: end; color: #F5EFE6; }
    .hero img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
    .hero::after { content: ''; position: absolute; inset: 0; background: rgba(20, 12, 7, 0.55); }
    .hero .wrap { position: relative; z-index: 1; padding-bottom: 80px; }
    .hero .lead { color: rgba(245, 239, 230, 0.85); }
    .hero .btn-ghost { color: #F5EFE6; border-color: rgba(245, 239, 230, 0.4); }
    .bag { display: flex; flex-direction: column; }
    .bag .label { aspect-ratio: 4 / 5; border-radius: 20px; padding: 28px; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 18px; transition: transform 220ms cubic-bezier(0.23, 1, 0.32, 1); }
    .bag:hover .label { transform: translateY(-4px); }
    .bag .label .origin { font-family: var(--display); font-size: 40px; line-height: 1; }
    .bag .label small { font-size: 13px; opacity: 0.8; }
    .bag .row { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: auto; padding-top: 14px; }
    .bag .notes { color: var(--muted); font-size: 14.5px; margin-top: 4px; }
    .chips { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 40px; }
    .chip { padding: 9px 18px; border-radius: 999px; border: 1px solid var(--line); font-size: 14px; background: transparent; color: var(--ink); transition: background-color 150ms ease-out, color 150ms ease-out; }
    .chip.on { background: var(--ink); color: var(--bg); border-color: var(--ink); }
    .process { counter-reset: s; }
    .process div { padding: 32px 0; border-top: 1px solid rgba(245,239,230,0.18); display: grid; grid-template-columns: 80px 1fr 1.4fr; gap: 32px; }
    .process div::before { counter-increment: s; content: counter(s, decimal-leading-zero); font-family: var(--display); font-size: 28px; color: #D9925E; }
    .sub .price { font-family: var(--display); font-size: 54px; margin: 14px 0 2px; }
    .sub.featured { background: var(--accent); color: var(--accent-ink); }
    .sub.featured .muted { color: rgba(255, 247, 238, 0.8); }
    .sub.featured .btn { background: var(--accent-ink); color: var(--accent); }
    .hours div { display: flex; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid var(--line); }
    .guide-card { background: var(--surface); border-radius: 16px; padding: 28px; border: 1px solid var(--line); text-align: center; }
    .guide-card .icon { width: 64px; height: 64px; border-radius: 16px; background: var(--accent); color: var(--accent-ink); display: inline-grid; place-items: center; font-size: 28px; margin-bottom: 16px; }
    .loyalty-tier { background: var(--surface); border-radius: 16px; padding: 32px; border: 1px solid var(--line); position: relative; }
    .loyalty-tier.featured { border-color: var(--accent); background: linear-gradient(180deg, var(--accent) 0%, var(--surface) 60%); }
    .loyalty-tier .badge { position: absolute; top: -12px; right: 24px; background: var(--accent); color: var(--accent-ink); padding: 4px 16px; border-radius: 999px; font-size: 12px; font-weight: 600; }
    .eco-stat { text-align: center; padding: 24px; }
    .eco-stat .num { font-family: var(--display); font-size: 64px; font-weight: 700; color: var(--accent); line-height: 1; }
    @media (max-width: 900px) { .process div { grid-template-columns: 1fr; gap: 8px; } .hero { min-height: 540px; } }`;

const bags = [
{ origin: 'Kenya', name: 'Kirinyaga AA', notes: 'Cassis, sucre de canne, hibiscus', price: '18,00 €', bg: '#8A4320', ink: '#FFF7EE', process: 'Lavé' },
{ origin: 'Colombie', name: 'Huila Reserva', notes: 'Cacao, pomme rouge, caramel', price: '16,50 €', bg: '#2F3B2A', ink: '#F5EFE6', process: 'Lavé' },
{ origin: 'Éthiopie', name: 'Yirgacheffe', notes: 'Jasmin, bergamote, pêche', price: '19,00 €', bg: '#E2B66B', ink: '#241710', process: 'Naturel' },
{ origin: 'Brésil', name: 'Cerrado Doce', notes: 'Noisette, chocolat au lait', price: '14,00 €', bg: '#3E2618', ink: '#F5EFE6', process: 'Pulpé' },
{ origin: 'Guatemala', name: 'Huehuetenango', notes: 'Prune, amande, miel', price: '17,00 €', bg: '#B9A282', ink: '#241710', process: 'Lavé' },
{ origin: 'Rwanda', name: 'Nyamasheke', notes: 'Cerise, thé noir, orange', price: '18,50 €', bg: '#6B2E2A', ink: '#F5EFE6', process: 'Lavé' }];


function bagCard(bag: (typeof bags)[number]): string {
  return `          <article class="bag">
            <div class="label" style="background:${bag.bg};color:${bag.ink}"><small>${bag.process} · 250 g</small><span class="origin">${bag.origin}</span></div>
            <h3>${bag.name}</h3><p class="notes">${bag.notes}</p>
            <div class="row"><strong>${bag.price}</strong><button class="btn btn-sm" type="button">Ajouter</button></div>
          </article>`;
}

export function shop(title: string): string {
  return renderSite({
    title,
    tagline: 'Cafés de spécialité torréfiés chaque mardi, expédiés sous 48 h.',
    theme,
    css,
    cta: { label: 'Boutique', page: 'boutique' },
    pages: [
    {
      id: 'accueil',
      label: 'Accueil',
      html: `      <div class="hero"><img src="${images.shopHero}" alt="Sachets de café et matériel de dégustation" /><div class="wrap">
        <h1 class="display" style="max-width:820px">Torréfié le mardi. Dans votre tasse le jeudi.</h1>
        <p class="lead" style="margin-top:22px">Des lots uniques achetés en direct aux producteurs, torréfiés en petites quantités.</p>
        <div style="display:flex;gap:12px;margin-top:34px;flex-wrap:wrap"><a href="#boutique" data-link="boutique" class="btn">Découvrir les cafés</a><a href="#abonnement" data-link="abonnement" class="btn btn-ghost">S'abonner</a></div>
      </div></div>
      <section class="block"><div class="wrap">
        <div class="section-head"><h2>Les torréfactions<br />de la semaine</h2><a href="#boutique" data-link="boutique" class="btn btn-ghost">Tout voir</a></div>
        <div class="grid g3">
${bags.slice(0, 3).map(bagCard).join('\n')}
        </div>
      </div></section>
      <section class="block dark"><div class="wrap split">
        <h2>Nous publions ce que nous payons.</h2>
        <div><p class="lead">En moyenne 2,9 fois le cours mondial. Chaque sachet indique le prix payé au producteur, la ferme et la date de torréfaction.</p>
          <a href="#histoire" data-link="histoire" class="btn" style="margin-top:28px">Notre démarche</a></div>
      </div></section>`
    },
    {
      id: 'boutique',
      label: 'Boutique',
      html: `      <section class="block"><div class="wrap">
        <h1 class="display" style="margin-bottom:32px">Boutique</h1>
        <div class="chips"><button class="chip on" type="button">Tous</button><button class="chip" type="button">Afrique</button><button class="chip" type="button">Amérique latine</button><button class="chip" type="button">Espresso</button><button class="chip" type="button">Filtre</button></div>
        <div class="grid g3" style="row-gap:48px">
${bags.map(bagCard).join('\n')}
        </div>
      </div></section>`
    },
    {
      id: 'abonnement',
      label: 'Abonnement',
      html: `      <section class="block"><div class="wrap">
        <div class="section-head"><h1 class="display">Le bon café, sans y penser.</h1><p class="lead">Livraison toutes les 2 ou 4 semaines. Pause ou arrêt en un clic.</p></div>
        <div class="grid g3">
          <div class="card sub"><h3>Découverte</h3><div class="price">15 €</div><p class="muted">1 sachet de 250 g</p><p style="margin-top:18px">Une origine différente à chaque envoi, choisie par nos torréfacteurs.</p><div class="foot"><a href="#contact" data-link="contact" class="btn btn-ghost">Choisir</a></div></div>
          <div class="card sub featured"><h3>Duo</h3><div class="price">27 €</div><p class="muted">2 sachets de 250 g</p><p style="margin-top:18px">Un espresso et un filtre, pour comparer et apprendre.</p><div class="foot"><a href="#contact" data-link="contact" class="btn">Choisir</a></div></div>
          <div class="card sub"><h3>Bureau</h3><div class="price">62 €</div><p class="muted">1 kg en grains</p><p style="margin-top:18px">Pour les équipes et les petits cafés, avec conseils d'extraction.</p><div class="foot"><a href="#contact" data-link="contact" class="btn btn-ghost">Choisir</a></div></div>
        </div>
      </div></section>`
    },
    {
      id: 'guide',
      label: 'Guide café',
      html: `      <section class="block"><div class="wrap">
        <div class="section-head"><h1 class="display">Trouvez votre café idéal.</h1><p class="lead">Répondez à 3 questions. On vous recommande le lot parfait pour votre goût et votre matériel.</p></div>
        <div class="grid g3" style="row-gap:24px">
          <div class="guide-card"><div class="icon">☕</div><h3>Vous aimez le fruité & floral</h3><p class="muted" style="margin-top:8px">Essayez l'<strong>Éthiopie Yirgacheffe</strong> (naturel) ou le <strong>Kenya Kirinyaga</strong> (lavé). Notes de baies, agrumes, thé.</p></div>
          <div class="guide-card"><div class="icon">🍫</div><h3>Vous aimez le chocolaté & noisette</h3><p class="muted" style="margin-top:8px">Direction le <strong>Brésil Cerrado</strong> ou la <strong>Colombie Huila</strong>. Corps rond, notes cacao, caramel, fruits secs.</p></div>
          <div class="guide-card"><div class="icon">🍷</div><h3>Vous aimez le complexe & vineux</h3><p class="muted" style="margin-top:8px">Le <strong>Rwanda Nyamasheke</strong> ou le <strong>Guatemala Huehue</strong>. Acidité vive, notes fruits rouges, vin rouge.</p></div>
        </div>
        <div class="wrap" style="margin-top:64px;max-width:720px">
          <h2 style="margin-bottom:32px">Selon votre matériel</h2>
          <div class="grid g2" style="row-gap:24px">
            <div class="guide-card"><div class="icon">⚡</div><h3>Machine espresso</h3><p class="muted" style="margin-top:8px">Privilégiez les cafés <strong>lavés</strong> (Kenya, Colombie, Guatemala). Plus constants, meilleure crema.</p></div>
            <div class="guide-card"><div class="icon">🫖</div><h3>Filtre (V60, Chemex, AeroPress)</h3><p class="muted" style="margin-top:8px">Les <strong>naturels</strong> brillent (Éthiopie, Rwanda). Plus d'aromatiques, complexité en tasse.</p></div>
            <div class="guide-card"><div class="icon">🏠</div><h3>Cafetière italienne (Moka)</h3><p class="muted" style="margin-top:8px"><strong>Brésil, Colombie</strong>. Corps épais, peu d'acidité. Évitez les naturels trop fermentés.</p></div>
            <div class="guide-card"><div class="icon">❄️</div><h3>Cold brew</h3><p class="muted" style="margin-top:8px">Tous fonctionnent. <strong>Naturels</strong> pour fruité intense, <strong>lavés</strong> pour clarté. Infusion 18h à froid.</p></div>
          </div>
        </div>
        <div class="wrap" style="margin-top:64px;text-align:center">
          <a href="#contact" data-link="contact" class="btn btn-ghost">Besoin d'un conseil personnalisé ?</a>
        </div>
      </div></section>`
    },
    {
      id: 'fidelite',
      label: 'Fidélité',
      html: `      <section class="block"><div class="wrap">
        <div class="section-head"><h1 class="display">Programme <em>Grain de Café</em>.</h1><p class="lead">Chaque tasse compte. Des avantages qui grandissent avec vous.</p></div>
        <div class="grid g3" style="row-gap:24px">
          <div class="loyalty-tier">
            <h3>Explorateur</h3><p class="muted" style="margin-top:8px">Dès votre 1<sup>re</sup> commande</p>
            <ul style="margin-top:20px;list-style:none;display:grid;gap:10px;font-size:15px">
              <li>• 5% de réduction permanente</li>
              <li>• Accès aux lots limités (48h avant tout le monde)</li>
              <li>• Newsletter « Carnet de torréfaction »</li>
            </ul>
          </div>
          <div class="loyalty-tier featured">
            <span class="badge">Le plus choisi</span>
            <h3>Connaisseur</h3><p class="muted" style="margin-top:8px">3 commandes / an</p>
            <ul style="margin-top:20px;list-style:none;display:grid;gap:10px;font-size:15px">
              <li>• 10% de réduction permanente</li>
              <li>• Livraison offerte (France & EU)</li>
              <li>• 1 sachet offert à votre anniversaire</li>
              <li>• Invitation dégustation privée (annuelle)</li>
            </ul>
          </div>
          <div class="loyalty-tier">
            <h3>Ambassadeur</h3><p class="muted" style="margin-top:8px">8 commandes / an</p>
            <ul style="margin-top:20px;list-style:none;display:grid;gap:10px;font-size:15px">
              <li>• 15% de réduction permanente</li>
              <li>• Création de votre blend signature</li>
              <li>• Visite atelier + déjeuner torréfacteur</li>
              <li>• Cadeaux exclusifs (mug, balance, carnet)</li>
            </ul>
          </div>
        </div>
        <div class="wrap" style="margin-top:48px;text-align:center">
          <p class="lead">L'inscription est automatique à votre premier achat. Suivez votre progression dans votre espace client.</p>
          <a href="#boutique" data-link="boutique" class="btn" style="margin-top:24px">Commencer ma collection</a>
        </div>
      </div></section>`
    },
    {
      id: 'eco',
      label: 'Éco-responsable',
      html: `      <section class="block"><div class="wrap">
        <div class="section-head"><h1 class="display">Bon café, bonne conscience.</h1><p class="lead">De la ferme à votre tasse, on mesure et réduit notre impact à chaque étape.</p></div>
        <div class="stats" style="border-top:none">
          <div class="eco-stat"><div class="num">2,9×</div><div class="muted">Prix payé au producteur<br>vs cours mondial</div></div>
          <div class="eco-stat"><div class="num">100%</div><div class="muted">Emballages<br>compostables ou recyclables</div></div>
          <div class="eco-stat"><div class="num">−42%</div><div class="muted">Émissions CO₂/kg<br>vs torréfaction industrielle</div></div>
          <div class="eco-stat"><div class="num">12</div><div class="muted">Producteurs partenaires<br>contrats pluriannuels</div></div>
        </div>
        <section class="block" style="padding-top:0"><div class="wrap">
          <h2 style="margin-bottom:40px">Nos engagements concrets</h2>
          <div class="process">
            <div><h3>Achat direct & prix juste</h3><p class="muted">Pas d'intermédiaires. Contrats 3–5 ans avec prix plancher. Les producteurs investissent dans la qualité, pas la survie.</p></div>
            <div><h3>Torréfaction économe</h3><p class="muted">Tambour 15 kg au gaz, isolation renforcée, récupération chaleur. 0,8 kg CO₂/kg café vs 1,4 kg moyenne industrie.</p></div>
            <div><h3>Emballage circulaire</h3><p class="muted">Sachets kraft + PLA (compostable industriel). Étiquettes papier ensemencé (fleurs mellifères). Programme reprise sachets vides en boutique.</p></div>
            <div><h3>Logistique propre</h3><p class="muted">Expédition Colissimo/Colis Privé (flotte verte). Regroupement commandes par zone. Offset carbone résiduel via reforestation Kenya (certifié Gold Standard).</p></div>
            <div><h3>Transparence totale</h3><p class="muted">Chaque lot : nom producteur, ferme, variété, altitude, process, prix payé, date torréfaction. Publié sur chaque sachet et en ligne.</p></div>
          </div>
        </div></section>
        <section class="block dark"><div class="wrap" style="text-align:center">
          <h2>Vous voulez aller plus loin ?</h2>
          <p class="lead" style="margin:24px 0 32px;max-width:600px;margin-left:auto;margin-right:auto">Rejoignez le programme « Café pour la forêt » : 1 € par abonnement = 1 arbre planté chez nos producteurs Kenya/Rwanda.</p>
          <a href="#abonnement" data-link="abonnement" class="btn">S'abonner & planter</a>
        </div></section>`
    },
    {
      id: 'histoire',
      label: 'Notre histoire',
      html: `      <section class="block"><div class="wrap split">
        <div><h1 class="display">Douze ans, un seul torréfacteur.</h1>
          <p class="lead" style="margin-top:24px">${title} est né dans un ancien atelier de reliure. Nous torréfions toujours sur le même tambour de 15 kg, à la main.</p></div>
        <div class="photo" style="aspect-ratio:3/2"><img src="${images.team}" alt="L'équipe de ${title}" /></div>
      </div></section>
      <section class="block dark"><div class="wrap">
        <h2 style="margin-bottom:40px">De la ferme à la tasse</h2>
        <div class="process">
          <div><h3>Sélection</h3><p class="muted">Nous goûtons plus de 300 échantillons par an pour en garder une douzaine.</p></div>
          <div><h3>Achat direct</h3><p class="muted">Contrats pluriannuels avec les producteurs, prix publiés.</p></div>
          <div><h3>Torréfaction</h3><p class="muted">Profils légers pour révéler le terroir, chaque mardi matin.</p></div>
          <div><h3>Expédition</h3><p class="muted">Emballage compostable, envoi sous 48 h après torréfaction.</p></div>
        </div>
      </div></section>`
    },
    {
      id: 'contact',
      label: 'Contact',
      html: `      <section class="block"><div class="wrap split" style="align-items:start">
        <div><h1 class="display">Passez nous voir.</h1>
          <p class="lead" style="margin:24px 0 36px">Dégustation gratuite chaque samedi à 11 h.</p>
          <p><strong>18 rue de la Roquette, 75011 Paris</strong></p>
          <div class="hours" style="margin-top:24px"><div><span>Mardi – vendredi</span><span class="muted">8 h – 18 h</span></div><div><span>Samedi</span><span class="muted">9 h – 19 h</span></div><div><span>Dimanche – lundi</span><span class="muted">Fermé</span></div></div></div>
        <form class="form card">
          <div class="form-row"><label>Nom<input type="text" required /></label><label>E-mail<input type="email" required /></label></div>
          <label>Sujet<select><option>Commande</option><option>Abonnement</option><option>Professionnels</option></select></label>
          <label>Message<textarea rows="5"></textarea></label>
          <button class="btn" type="submit">Envoyer</button>
          <div class="form-success">Merci ! Nous vous répondons dans la journée.</div>
        </form>
      </div></section>`
    }]
  });
}