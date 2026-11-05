import { describe, it, expect } from 'vitest';
import { getByPath } from './path.js';

describe('getByPath', () => {
  const data = { a: { b: { c: 'deep' } }, x: 'top' };
  it('reads nested values', () => expect(getByPath(data, 'a.b.c')).toBe('deep'));
  it('reads top-level values', () => expect(getByPath(data, 'x')).toBe('top'));
  it('returns undefined for missing paths', () => expect(getByPath(data, 'a.z.c')).toBeUndefined());
  it('handles nullish objects and empty paths gracefully', () => {
    expect(getByPath(null, 'a.b')).toBeUndefined();
    expect(getByPath(data, '')).toBe(data);
  });
});
