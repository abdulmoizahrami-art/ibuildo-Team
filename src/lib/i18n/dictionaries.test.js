import { describe, it, expect } from 'vitest';
import fa from './fa.js';
import en from './en.js';
import ps from './ps.js';

// Turns { a: { b: 'x' } } into { 'a.b': 'x' }
function flatten(object, prefix = '') {
  return Object.entries(object).flatMap(([key, value]) =>
    typeof value === 'object' ? flatten(value, `${prefix}${key}.`) : [[`${prefix}${key}`, value]]
  );
}

const reference = flatten(fa);

describe('translations', () => {
  for (const [name, dictionary] of Object.entries({ en, ps })) {
    it(`${name} has exactly the same keys as fa`, () => {
      expect(flatten(dictionary).map(([key]) => key)).toEqual(reference.map(([key]) => key));
    });
  }

  for (const [name, dictionary] of Object.entries({ fa, en, ps })) {
    it(`${name} has no empty text`, () => {
      const empty = flatten(dictionary).filter(([, value]) => !String(value).trim());
      expect(empty).toEqual([]);
    });
  }
});
