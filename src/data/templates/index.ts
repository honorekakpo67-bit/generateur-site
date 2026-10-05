import type { SiteKind } from '../../types/generator';
import { landing } from './landing';
import { portfolio } from './portfolio';
import { shop } from './shop';
import { event } from './event';

const TEMPLATES: Record<SiteKind, (title: string) => string> = {
  landing,
  portfolio,
  shop,
  event
};

export function buildSite(kind: SiteKind, title: string): string {
  return TEMPLATES[kind](title);
}