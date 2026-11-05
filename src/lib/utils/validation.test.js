import { describe, it, expect } from 'vitest';
import { isEmail, isPhone, validateProject, hasErrors } from './validation.js';

describe('isEmail', () => {
  it('accepts a normal email', () => expect(isEmail('ali@example.com')).toBe(true));
  it('rejects text without @ or domain', () => {
    expect(isEmail('ali')).toBe(false);
    expect(isEmail('ali@example')).toBe(false);
  });
  it('handles nullish or non-string values safely', () => {
    expect(isEmail(null)).toBe(false);
    expect(isEmail(undefined)).toBe(false);
  });
});

describe('isPhone', () => {
  it('accepts numbers with spaces and +', () => expect(isPhone('+93 700 123 456')).toBe(true));
  it('rejects short numbers', () => {
    expect(isPhone('12345')).toBe(false);
    expect(isPhone(null)).toBe(false);
  });
});

describe('validateProject', () => {
  const valid = { name: 'Ali', email: 'ali@example.com', phone: '', subject: '', message: 'Hi' };

  it('passes when only the required fields are filled', () => {
    expect(hasErrors(validateProject(valid))).toBe(false);
  });
  it('flags every empty required field', () => {
    const errors = validateProject({ name: ' ', email: '', phone: '', subject: '', message: '' });
    expect(errors).toEqual({ name: true, email: true, phone: false, message: true });
  });
  it('flags a phone that is filled but too short', () => {
    expect(validateProject({ ...valid, phone: '123' }).phone).toBe(true);
  });
  it('accepts missing fields without crashing', () => {
    expect(validateProject()).toEqual({ name: true, email: true, phone: false, message: true });
  });
});
