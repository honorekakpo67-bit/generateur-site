import LZString from 'lz-string';

const HASH_KEY = 'site=';

function getBaseUrl(): string {
  const envBase = import.meta.env.VITE_SHARE_BASE_URL;
  if (envBase) return envBase.replace(/\/$/, '');
  return window.location.origin;
}

export function encodeSite(html: string): string {
  return LZString.compressToEncodedURIComponent(html);
}

export function decodeSite(payload: string): string | null {
  try {
    return LZString.decompressFromEncodedURIComponent(payload) || null;
  } catch {
    return null;
  }
}

/** A link that really resolves: the whole site travels inside the URL fragment. */
export function buildShareUrl(html: string): string {
  const baseUrl = getBaseUrl();
  const pathname = window.location.pathname;
  return `${baseUrl}${pathname}#${HASH_KEY}${encodeSite(html)}`;
}

export function readSharedSite(): string | null {
  const hash = window.location.hash.replace(/^#/, '');
  if (!hash.startsWith(HASH_KEY)) return null;
  return decodeSite(hash.slice(HASH_KEY.length));
}

export function shortLabel(url: string): string {
  const cleaned = url.replace(/^https?:\/\//, '');
  return cleaned.length > 52 ? `${cleaned.slice(0, 49)}…` : cleaned;
}