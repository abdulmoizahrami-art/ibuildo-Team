import fa from '$lib/i18n/fa.js';
import en from '$lib/i18n/en.js';
import ps from '$lib/i18n/ps.js';
import { getByPath } from '$lib/utils/path.js';

export const LANGS = [
  { code: 'fa', label: 'فارسی', dir: 'rtl' },
  { code: 'en', label: 'EN', dir: 'ltr' },
  { code: 'ps', label: 'پښتو', dir: 'rtl' }
];
const THEMES = ['system', 'light', 'dark'];
const DICTIONARIES = { fa, en, ps };
const normalizeLang = (value) => (LANGS.some((lang) => lang.code === value) ? value : 'fa');
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
  lang: load('lang', Object.keys(DICTIONARIES), 'fa'),
  theme: load('theme', THEMES, 'system')
});

/** Translate a dotted key (e.g. 'hero.title') in the current language. Falls back to Persian. */
export function t(key) {
  const lang = normalizeLang(settings.lang);
  return getByPath(DICTIONARIES[lang], key) ?? getByPath(DICTIONARIES.fa, key) ?? key;
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
