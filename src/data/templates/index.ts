import type { SiteKind } from '../../types/generator';
import { landing } from './landing';
import { portfolio } from './portfolio';
import { shop } from './shop';
import { event } from './event';

interface UploadedImage {
  id: string;
  name: string;
  dataUrl: string;
  type: 'hero' | 'gallery';
}

const TEMPLATES: Record<SiteKind, (title: string, images: UploadedImage[], whatsappNumber: string) => string> = {
  landing,
  portfolio,
  shop,
  event
};

export function buildSite(kind: SiteKind, title: string, images: UploadedImage[] = [], whatsappNumber: string = ''): string {
  return TEMPLATES[kind](title, images, whatsappNumber);
}