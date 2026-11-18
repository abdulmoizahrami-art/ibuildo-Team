import { DICTIONARIES, translate } from '$lib/i18n/translate.js';
import { readLangFromLocation } from '$lib/seo/url.js';

export const LANGS = [
  { code: 'fa', label: 'فارسی', dir: 'rtl' },
  { code: 'en', label: 'EN', dir: 'ltr' },
  { code: 'ps', label: 'پښتو', dir: 'rtl' }
];
const THEMES = ['system', 'light', 'dark'];
const normalizeLang = (value) => (LANGS.some((lang) => lang.code === value) ? value : 'fa');

function initialLang() {
  const stored = load('lang', Object.keys(DICTIONARIES), 'fa');
  if (typeof window === 'undefined') return stored;
  const fromLocation = readLangFromLocation(window.location.pathname, window.location.search);
  if (!fromLocation) return stored;
  save('lang', fromLocation);
  return fromLocation;
}
const normalizeTheme = (value) => (THEMES.includes(value) ? value : 'system');

function load(key, allowed, fallback) {
  try {
    const value = localStorage.getItem(key);
    return allowed.includes(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage can be blocked (private mode): the setting just won't persist */
  }
}

// $state makes this object reactive: every component that reads
// settings.lang re-renders automatically when it changes.
export const settings = $state({
  lang: initialLang(),
  theme: load('theme', THEMES, 'system')
});

/** Translate a dotted key (e.g. 'hero.title') in the current language. Falls back to Persian. */
export function t(key) {
  return translate(normalizeLang(settings.lang), key);
}

export function setLang(code) {
  if (!LANGS.some((lang) => lang.code === code)) return;
  settings.lang = code;
  save('lang', code);
}

/** system -> light -> dark -> system */
export function cycleTheme() {
  const current = normalizeTheme(settings.theme);
  settings.theme = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
  save('theme', settings.theme);
}
