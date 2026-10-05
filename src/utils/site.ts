import type { SiteKind } from '../types/generator';

const KEYWORDS: Record<SiteKind, string[]> = {
  portfolio: ['portfolio', 'designer', 'photograph', 'freelance', 'cv', 'resume', 'artist'],
  shop: ['shop', 'store', 'boutique', 'product', 'coffee', 'ecommerce', 'e-commerce', 'price list', 'menu'],
  event: ['event', 'conference', 'meetup', 'festival', 'webinar', 'ticket', 'summit', 'workshop'],
  landing: ['landing', 'saas', 'startup', 'app', 'hero', 'waitlist']
};

export function detectKind(prompt: string): SiteKind {
  const value = prompt.toLowerCase();
  const order: SiteKind[] = ['portfolio', 'shop', 'event', 'landing'];
  for (const kind of order) {
    if (KEYWORDS[kind].some((word) => value.includes(word))) return kind;
  }
  return 'landing';
}

const STOP_WORDS = new Set([
'create', 'build', 'make', 'a', 'an', 'the', 'with', 'and', 'for', 'of', 'my', 'page', 'site',
'website', 'modern', 'simple', 'minimal', 'me', 'please', 'that', 'has', 'about', 'in', 'to']
);

const DEFAULT_BRANDS: Record<SiteKind, string> = {
  landing: 'Flowdesk',
  portfolio: 'Inês Moreira',
  shop: 'Ardoise Café',
  event: 'Craft Summit'
};

function titleCase(words: string[]): string {
  return words.map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

/** Brand name for the generated site: the subject after "for …" when present, else a polished default. */
export function deriveTitle(prompt: string, kind: SiteKind): string {
  if (kind === 'portfolio') return DEFAULT_BRANDS.portfolio;
  const subject = prompt.match(/\b(?:for|pour)\s+(?:a|an|the|my|un|une|mon|ma)?\s*([^,.]+)/i)?.[1] ?? '';
  const words = subject.
  split(/\s+(?:with|avec|and|et)\s+/i)[0].
  replace(/[^a-zA-ZÀ-ÿ0-9\s-]/g, ' ').
  split(/\s+/).
  filter((word) => word.length > 2 && !STOP_WORDS.has(word.toLowerCase())).
  slice(0, 2);
  return words.length ? titleCase(words) : DEFAULT_BRANDS[kind];
}

export function slugify(value: string): string {
  const slug = value.
  toLowerCase().
  normalize('NFD').
  replace(/[\u0300-\u036f]/g, '').
  replace(/[^a-z0-9]+/g, '-').
  replace(/^-+|-+$/g, '').
  slice(0, 28);
  return slug || 'untitled-site';
}