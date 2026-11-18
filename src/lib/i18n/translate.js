import fa from './fa.js';
import en from './en.js';
import ps from './ps.js';
import { getByPath } from '../utils/path.js';

export const DICTIONARIES = { fa, en, ps };

/** Translate a dotted key. Unknown languages fall back to Persian, then the key. */
export function translate(lang, key) {
  const code = lang === 'en' || lang === 'ps' ? lang : 'fa';
  return getByPath(DICTIONARIES[code], key) ?? getByPath(DICTIONARIES.fa, key) ?? key;
}
