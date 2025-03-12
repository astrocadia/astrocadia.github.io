import { describe, it, expect } from 'vitest';
import { z, ZodError } from 'zod';
import { attachDuplicateStringRefinement } from './zod';

describe('attachDuplicateStringRefinement', () => {
  it('should not allow duplicate string value', () => {
    const zodString = attachDuplicateStringRefinement(z.string(), [
      'foo',
      'bar',
    ]);
    expect(() => zodString.parse('foo')).toThrow();
  });

  it('should allow unique values', () => {
    const zodString = attachDuplicateStringRefinement(z.string(), [
      'foo',
      'bar',
    ]);
    expect(() => zodString.parse('baz')).not.toThrow();
  });

  it('should not allow duplicate string value case-insensitive', () => {
    const zodString = attachDuplicateStringRefinement(z.string(), [
      'foo',
      'bar',
    ]);
    expect(() => zodString.parse('FOO')).toThrow();
  });

  it('should allow empty haystack', () => {
    const zodString = attachDuplicateStringRefinement(z.string(), []);
    expect(() => zodString.parse('foo')).not.toThrow();
  });

  it('should allow empty value', () => {
    const zodString = attachDuplicateStringRefinement(z.string(), ['foo']);
    expect(() => zodString.parse('')).not.toThrow();
  });

  it('should not allow number value', () => {
    const zodString = attachDuplicateStringRefinement(z.string(), ['foo']);
    expect(() => zodString.parse(42)).toThrow();
  });

  it('should not allow undefined value', () => {
    const zodString = attachDuplicateStringRefinement(z.string(), ['foo']);
    expect(() => zodString.parse(undefined)).toThrow();
  });

  it('should not allow null value', () => {
    const zodString = attachDuplicateStringRefinement(z.string(), ['foo']);
    expect(() => zodString.parse(null)).toThrow();
  });

  it('should allow custom message', () => {
    const message = 'Custom message';
    const zodString = attachDuplicateStringRefinement(
      z.string(),
      ['foo'],
      message
    );
    try {
      zodString.parse('foo');
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.issues[0].message).toBe(message);
      }
    }
  });
});
