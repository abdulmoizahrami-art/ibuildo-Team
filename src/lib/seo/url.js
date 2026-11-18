/** Crawlable language URLs. Persian is the default at `/`. */
export const LANG_META = {
  fa: { htmlLang: 'fa', dir: 'rtl', locale: 'fa_IR' },
  en: { htmlLang: 'en', dir: 'ltr', locale: 'en_US' },
  ps: { htmlLang: 'ps', dir: 'rtl', locale: 'ps_AF' }
};

const LANGS = new Set(['fa', 'en', 'ps']);

export function languagePath(lang) {
  if (lang === 'en') return '/en/';
  if (lang === 'ps') return '/ps/';
  return '/';
}

export function readLangParam(search) {
  const value = new URLSearchParams(search).get('lang')?.toLowerCase();
  return LANGS.has(value) ? value : null;
}

/**
 * Language from the pathname (`/en/`, `/ps/`) or a legacy `?lang=` query.
 * Returns null when the URL does not name a language.
 */
export function readLangFromLocation(pathname = '', search = '') {
  const path =
    String(pathname)
      .replace(/\/index\.html$/, '')
      .replace(/\/+$/, '') || '/';
  if (path === '/en') return 'en';
  if (path === '/ps') return 'ps';
  return readLangParam(search);
}

export function absoluteUrl(origin, path) {
  if (!origin) return path;
  const base = origin.endsWith('/') ? origin : `${origin}/`;
  return new URL(path, base).href;
}

/** Production origin from VITE_SITE_URL, otherwise the live host (never localhost). */
export function resolveOrigin() {
  const configured =
    typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL
      ? String(import.meta.env.VITE_SITE_URL).replace(/\/+$/, '')
      : '';
  if (configured) return configured;
  if (typeof window === 'undefined') return '';
  const host = window.location.hostname;
  if (!host || host === 'localhost' || host === '127.0.0.1') return '';
  return window.location.origin;
}

/** Point the address bar at the crawlable URL for this language, keeping the hash. */
export function writeLangPath(lang) {
  if (typeof window === 'undefined') return;
  const next = `${languagePath(lang)}${window.location.hash}`;
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (current !== next) history.replaceState(history.state, '', next);
}
